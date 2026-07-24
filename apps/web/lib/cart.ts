'use server';

import { cookies } from 'next/headers';
import { medusa, CART_ID_COOKIE } from './medusa';

export async function getOrCreateCart() {
  const cookieStore = await cookies();
  const existingId = cookieStore.get(CART_ID_COOKIE)?.value;

  if (existingId) {
    try {
      const { cart } = await medusa.store.cart.retrieve(existingId);
      return cart;
    } catch {
      // cart no longer exists on the backend — fall through and create a new one
    }
  }

  try {
    const { cart } = await medusa.store.cart.create({});
    cookieStore.set(CART_ID_COOKIE, cart.id, { httpOnly: true, sameSite: 'lax' });
    return cart;
  } catch {
    return null;
  }
}

export async function getCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_ID_COOKIE)?.value;
  if (!cartId) return null;

  try {
    const { cart } = await medusa.store.cart.retrieve(cartId);
    return cart;
  } catch {
    return null;
  }
}

export async function addToCart(variantId: string, quantity = 1) {
  const cart = await getOrCreateCart();
  if (!cart) return null;

  try {
    const { cart: updated } = await medusa.store.cart.createLineItem(cart.id, {
      variant_id: variantId,
      quantity,
    });
    return updated;
  } catch {
    return null;
  }
}
