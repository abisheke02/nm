import { redirect } from 'next/navigation';
import { Container, SectionHeading, Button } from '@nithya/ui';
import { getCart } from '@/lib/cart';
import { medusa, CART_ID_COOKIE } from '@/lib/medusa';

const inputClass =
  'rounded-sm border border-[var(--nm-border)] bg-[var(--nm-surface)] px-4 py-2 text-sm outline-none focus:border-[var(--nm-accent)]';

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || (cart.items ?? []).length === 0) {
    redirect('/cart');
  }

  async function saveAddressAndPlaceOrder(formData: FormData) {
    'use server';
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const cartId = cookieStore.get(CART_ID_COOKIE)?.value;
    if (!cartId) return;

    await medusa.store.cart.update(cartId, {
      email: formData.get('email')?.toString(),
      shipping_address: {
        first_name: formData.get('first_name')?.toString() ?? '',
        last_name: formData.get('last_name')?.toString() ?? '',
        address_1: formData.get('address_1')?.toString() ?? '',
        city: formData.get('city')?.toString() ?? '',
        postal_code: formData.get('postal_code')?.toString() ?? '',
        country_code: formData.get('country_code')?.toString() ?? '',
      },
    });

    // Requires a payment provider (e.g. Stripe) configured on the region in
    // Medusa admin — falls back to keeping the cart open if none is set up.
    try {
      await medusa.store.cart.complete(cartId);
      redirect('/account');
    } catch {
      redirect('/checkout?error=payment');
    }
  }

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Shop" title="Checkout" />
      <form action={saveAddressAndPlaceOrder} className="flex max-w-lg flex-col gap-4">
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
        <div className="grid grid-cols-2 gap-4">
          <input name="first_name" placeholder="First name" required className={inputClass} />
          <input name="last_name" placeholder="Last name" required className={inputClass} />
        </div>
        <input name="address_1" placeholder="Address" required className={inputClass} />
        <div className="grid grid-cols-3 gap-4">
          <input name="city" placeholder="City" required className={inputClass} />
          <input name="postal_code" placeholder="Postal code" required className={inputClass} />
          <input name="country_code" placeholder="Country code (e.g. us)" required className={inputClass} />
        </div>
        <Button type="submit" className="w-fit">
          Place order
        </Button>
      </form>
    </Container>
  );
}
