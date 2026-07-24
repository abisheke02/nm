export function Footer({ LinkComponent }: { LinkComponent: React.ElementType }) {
  return (
    <footer className="border-t border-[var(--nm-border)] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 font-mono text-xs text-[var(--nm-text-muted)] sm:flex-row sm:justify-between sm:px-8">
        <span>&copy; {new Date().getFullYear()} Nithya MuthuKrishnan</span>
        <div className="flex gap-4">
          <LinkComponent href="/book-appointment">Book an appointment</LinkComponent>
          <LinkComponent href="/contact">Contact</LinkComponent>
        </div>
      </div>
    </footer>
  );
}
