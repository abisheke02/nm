'use client';

const links = [
  { href: '/about', label: 'About' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/collections', label: 'Collections' },
  { href: '/textile-innovation', label: 'Textile Innovation' },
  { href: '/ai-fashion-lab', label: 'AI Fashion Lab' },
  { href: '/research', label: 'Research' },
  { href: '/journal', label: 'Journal' },
  { href: '/media', label: 'Media' },
  { href: '/awards', label: 'Awards' },
  { href: '/contact', label: 'Contact' },
];

export function Nav({
  LinkComponent,
  cartCount = 0,
}: {
  LinkComponent: React.ElementType;
  cartCount?: number;
}) {
  return (
    <header className="border-b border-[var(--nm-border)] bg-[var(--nm-bg)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
        <LinkComponent href="/" className="font-serif text-lg italic" style={{ fontFamily: 'var(--nm-font-serif)' }}>
          Nithya MuthuKrishnan
        </LinkComponent>
        <nav className="hidden gap-6 text-sm lg:flex">
          {links.map((link) => (
            <LinkComponent key={link.href} href={link.href} className="text-[var(--nm-text-muted)] hover:text-[var(--nm-text)]">
              {link.label}
            </LinkComponent>
          ))}
        </nav>
        <LinkComponent href="/shop" className="text-sm font-medium text-[var(--nm-shop)]">
          Shop{cartCount > 0 ? ` (${cartCount})` : ''}
        </LinkComponent>
      </div>
    </header>
  );
}
