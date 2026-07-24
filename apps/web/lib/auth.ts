'use server';

import { cookies } from 'next/headers';
import { medusa } from './medusa';

const AUTH_COOKIE = 'nm_medusa_jwt';

export async function login(email: string, password: string) {
  try {
    const token = await medusa.auth.login('customer', 'emailpass', { email, password });
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token as string, { httpOnly: true, sameSite: 'lax' });
    return true;
  } catch {
    return false;
  }
}

export async function register(email: string, password: string, firstName: string, lastName: string) {
  try {
    const token = await medusa.auth.register('customer', 'emailpass', { email, password });
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE, token as string, { httpOnly: true, sameSite: 'lax' });

    await medusa.store.customer.create(
      { email, first_name: firstName, last_name: lastName },
      {},
      { Authorization: `Bearer ${token}` }
    );
    return true;
  } catch {
    return false;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
}

export async function getCurrentCustomer() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;

  try {
    const { customer } = await medusa.store.customer.retrieve({}, { Authorization: `Bearer ${token}` });
    return customer;
  } catch {
    return null;
  }
}
