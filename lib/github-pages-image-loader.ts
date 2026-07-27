type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

export default function githubPagesImageLoader({
  src,
}: ImageLoaderProps): string {
  if (/^(?:[a-z]+:|\/\/)/i.test(src)) {
    return src;
  }

  const repository = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const basePath = repository ? `/${repository}` : "";

  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}
