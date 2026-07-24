import { redirect } from 'next/navigation';
import { Container, SectionHeading, Button } from '@nithya/ui';
import { getCurrentCustomer, login, register, logout } from '@/lib/auth';

const inputClass =
  'rounded-sm border border-[var(--nm-border)] bg-[var(--nm-surface)] px-4 py-2 text-sm outline-none focus:border-[var(--nm-accent)]';

export default async function AccountPage() {
  const customer = await getCurrentCustomer();

  if (customer) {
    async function signOut() {
      'use server';
      await logout();
      redirect('/account');
    }

    return (
      <Container className="py-16">
        <SectionHeading eyebrow="Account" title={`Welcome, ${customer.first_name ?? customer.email}`} />
        <p className="mb-6 text-[var(--nm-text-muted)]">{customer.email}</p>
        <form action={signOut}>
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      </Container>
    );
  }

  async function signIn(formData: FormData) {
    'use server';
    const ok = await login(formData.get('email')!.toString(), formData.get('password')!.toString());
    if (ok) redirect('/account');
  }

  async function signUp(formData: FormData) {
    'use server';
    const ok = await register(
      formData.get('reg_email')!.toString(),
      formData.get('reg_password')!.toString(),
      formData.get('first_name')?.toString() ?? '',
      formData.get('last_name')?.toString() ?? ''
    );
    if (ok) redirect('/account');
  }

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Account" title="Sign in or create an account" />
      <div className="grid gap-10 sm:grid-cols-2">
        <form action={signIn} className="flex flex-col gap-4">
          <h3 className="font-semibold">Sign in</h3>
          <input name="email" type="email" placeholder="Email" required className={inputClass} />
          <input name="password" type="password" placeholder="Password" required className={inputClass} />
          <Button type="submit" className="w-fit">
            Sign in
          </Button>
        </form>
        <form action={signUp} className="flex flex-col gap-4">
          <h3 className="font-semibold">Create account</h3>
          <div className="grid grid-cols-2 gap-4">
            <input name="first_name" placeholder="First name" className={inputClass} />
            <input name="last_name" placeholder="Last name" className={inputClass} />
          </div>
          <input name="reg_email" type="email" placeholder="Email" required className={inputClass} />
          <input name="reg_password" type="password" placeholder="Password" required className={inputClass} />
          <Button type="submit" variant="outline" className="w-fit">
            Create account
          </Button>
        </form>
      </div>
    </Container>
  );
}
