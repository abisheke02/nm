import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm tracking-wide transition-colors';
const variants = {
  primary: 'bg-[var(--nm-text)] text-[var(--nm-bg)] hover:opacity-90',
  outline: 'border border-[var(--nm-border)] text-[var(--nm-text)] hover:bg-[var(--nm-surface-2)]',
};

type Variant = keyof typeof variants;

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

export function LinkButton({
  variant = 'primary',
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
