import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: Image) {
  return imageBuilder.image(source);
}

/**
 * Sanity isn't connected to a real project yet (placeholder-project-id), so
 * reads fail until NEXT_PUBLIC_SANITY_PROJECT_ID is set to a real project.
 * Every caller treats an empty/undefined result as "no content yet" rather
 * than crashing the page.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return null;
  }
}
