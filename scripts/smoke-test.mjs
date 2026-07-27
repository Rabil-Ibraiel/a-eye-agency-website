import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const port = Number(process.env.SMOKE_PORT || 3100);
const baseUrl = `http://127.0.0.1:${port}`;
const routePaths = [
  "/",
  "/work",
  "/work/open-distance",
  "/work/room-for-sound",
  "/work/stay-with-the-light",
  "/services",
  "/services/creative-direction-content-strategy",
  "/services/ai-content-production",
  "/services/motion-design-post-production",
  "/services/brand-visual-design",
  "/about",
  "/contact",
  "/privacy",
  "/brand-lab",
];

let serverOutput = "";
const server = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
  env: {
    ...process.env,
    NODE_ENV: "production",
    INQUIRY_WEBHOOK_URL: "",
    NEXT_PUBLIC_CONTACT_EMAIL: "",
  },
  stdio: ["ignore", "pipe", "pipe"],
});

for (const stream of [server.stdout, server.stderr]) {
  stream.setEncoding("utf8");
  stream.on("data", (chunk) => {
    serverOutput = `${serverOutput}${chunk}`.slice(-8_000);
  });
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Production server exited early.\n${serverOutput}`);
    }
    try {
      const response = await fetch(baseUrl, { redirect: "manual" });
      if (response.ok) return;
    } catch {
      // The production server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Production server did not become ready.\n${serverOutput}`);
}

async function checkPage(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  const html = await response.text();
  assert.equal(response.status, 200, `${path} should return 200`);
  assert.match(html, /<main\b/, `${path} should include the main landmark`);
  assert.match(html, /<h1\b/, `${path} should include exactly one primary heading`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path} should include one h1`);
  assert.match(html, /<title>[^<]+<\/title>/, `${path} should include a title`);
  return html;
}

try {
  await waitForServer();

  for (const path of routePaths) {
    const html = await checkPage(path);
    if (path === "/brand-lab") {
      assert.match(html, /noindex/i, "Brand lab should be excluded from search indexing");
    }
  }

  const notFound = await fetch(`${baseUrl}/this-route-does-not-exist`);
  assert.equal(notFound.status, 404, "Unknown routes should return 404");
  assert.match(await notFound.text(), /<h1\b/, "The not-found page should include an h1");

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  assert.match(robots, /Disallow: \/brand-lab/);
  assert.match(robots, /Disallow: \/api\//);

  const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
  assert.doesNotMatch(sitemap, /brand-lab/);
  assert.match(sitemap, /work\/open-distance/);
  assert.match(sitemap, /services\/brand-visual-design/);

  const inquiry = await fetch(`${baseUrl}/api/inquiry`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Smoke Test",
      email: "smoke@example.com",
      company: "",
      projectType: "campaign",
      budget: "15k-30k",
      timeline: "2-3-months",
      message: "A deliberately valid automated smoke-test inquiry message.",
      consent: true,
      honeypot: "",
    }),
  });
  const inquiryBody = await inquiry.json();
  assert.equal(inquiry.status, 503, "Unconfigured delivery should return 503");
  assert.equal(inquiryBody.code, "transport_not_configured");

  console.log(`Smoke test passed: ${routePaths.length} pages, SEO endpoints, 404, and inquiry failure contract.`);
} catch (error) {
  console.error(error);
  if (serverOutput) console.error(serverOutput);
  process.exitCode = 1;
} finally {
  if (server.exitCode === null) server.kill();
}
