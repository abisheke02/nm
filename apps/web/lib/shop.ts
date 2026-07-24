import { medusa } from './medusa';

export type StoreProduct = {
  id: string;
  title: string;
  handle: string | null;
  thumbnail: string | null;
  variants: { id: string; title: string }[];
};

/**
 * The commerce backend may not be running locally yet, so every call here
 * resolves to a safe empty/undefined result instead of throwing — pages
 * render an empty state rather than crashing when Medusa is offline.
 */
export async function listProducts(): Promise<StoreProduct[]> {
  try {
    const { products } = await medusa.store.product.list({ limit: 20 });
    return products as unknown as StoreProduct[];
  } catch {
    return [];
  }
}

export async function getProductByHandle(handle: string): Promise<StoreProduct | null> {
  try {
    const { products } = await medusa.store.product.list({ handle, limit: 1 });
    return (products[0] as unknown as StoreProduct) ?? null;
  } catch {
    return null;
  }
}
