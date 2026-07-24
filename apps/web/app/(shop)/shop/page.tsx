import Link from 'next/link';
import { Container, SectionHeading } from '@nithya/ui';
import { listProducts } from '@/lib/shop';

export default async function ShopPage() {
  const products = await listProducts();

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Shop" title="All Products" />
      {products.length === 0 ? (
        <p className="text-[var(--nm-text-muted)]">
          No products yet — add products in the Medusa admin, or start the commerce backend if it isn't running.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.handle}`}
              className="rounded-md border border-[var(--nm-border)] bg-[var(--nm-surface)] p-4 hover:bg-[var(--nm-surface-2)]"
            >
              <h3 className="font-semibold">{product.title}</h3>
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}
