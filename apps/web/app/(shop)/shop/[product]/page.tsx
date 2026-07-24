import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { Container, SectionHeading, Button } from '@nithya/ui';
import { getProductByHandle } from '@/lib/shop';
import { addToCart } from '@/lib/cart';

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
  const { product: handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) notFound();

  const variant = product.variants?.[0];

  async function addAndGoToCart() {
    'use server';
    if (variant) await addToCart(variant.id);
    redirect('/cart');
  }

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Shop" title={product.title} />
      {variant ? (
        <form action={addAndGoToCart}>
          <Button type="submit">Add to cart</Button>
        </form>
      ) : (
        <p className="text-[var(--nm-text-muted)]">This product has no purchasable variants yet.</p>
      )}
    </Container>
  );
}
