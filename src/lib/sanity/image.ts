import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = imageUrlBuilder(sanityClient);
type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function urlForWithDimensions(
  source: SanityImageSource,
  width: number,
  quality: number = 85
): string {
  return builder
    .image(source)
    .width(width)
    .quality(quality)
    .format("webp")
    .url();
}
