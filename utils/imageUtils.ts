import type { StaticImageData } from 'next/image';

/**
 * Converts an image (StaticImageData or string) to a string URL for use in img src attributes
 * @param image - The image which can be StaticImageData, string, or any
 * @returns A string URL that can be used in img src
 */
export function getImageUrl(image: string | StaticImageData | any): string {
  if (typeof image === 'string') {
    return image;
  }
  
  // Handle StaticImageData from Next.js
  if (image && typeof image === 'object' && 'src' in image) {
    return image.src;
  }
  
  // Fallback: try to get the default export or the value itself
  if (image && typeof image === 'object' && 'default' in image) {
    return typeof image.default === 'string' ? image.default : image.default?.src || String(image);
  }
  
  // Last resort: convert to string
  return String(image);
}
