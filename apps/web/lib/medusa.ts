import Medusa from '@medusajs/js-sdk';

export const medusa = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
  debug: process.env.NODE_ENV === 'development',
});

const CART_ID_COOKIE = 'nm_cart_id';

export function getCartIdFromCookies(cookieHeader: string | undefined): string | undefined {
  if (!cookieHeader) return undefined;
  const match = cookieHeader.match(new RegExp(`${CART_ID_COOKIE}=([^;]+)`));
  return match?.[1];
}

export { CART_ID_COOKIE };
