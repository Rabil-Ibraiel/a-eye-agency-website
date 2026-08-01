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

  const basePath = (
    process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? ""
  ).replace(/\/+$/, "");

  return `${basePath}${src.startsWith("/") ? src : `/${src}`}`;
}
