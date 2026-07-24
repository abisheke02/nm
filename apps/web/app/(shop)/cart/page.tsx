import Link from 'next/link';
import { Container, SectionHeading, LinkButton } from '@nithya/ui';
import { getCart } from '@/lib/cart';

export default async function CartPage() {
  const cart = await getCart();
  const items = cart?.items ?? [];

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Shop" title="Your Cart" />
      {items.length === 0 ? (
        <div>
          <p className="mb-4 text-[var(--nm-text-muted)]">Your cart is empty.</p>
          <Link href="/shop" className="underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col divide-y divide-[var(--nm-border)]">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between py-4">
                <span>
                  {item.title} &times; {item.quantity}
                </span>
                <span>{((item.unit_price ?? 0) * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-[var(--nm-border)] pt-4 font-semibold">
            <span>Subtotal</span>
            <span>{(cart?.subtotal ?? 0).toFixed(2)}</span>
          </div>
          <LinkButton href="/checkout" className="w-fit">
            Proceed to checkout
          </LinkButton>
        </div>
      )}
    </Container>
  );
}
