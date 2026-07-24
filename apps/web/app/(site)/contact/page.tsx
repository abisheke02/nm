import { Container, SectionHeading } from '@nithya/ui';

async function sendContactMessage(formData: FormData) {
  'use server';

  const name = formData.get('name')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const message = formData.get('message')?.toString() ?? '';

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping contact form email send.');
    return;
  }

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Studio Contact <contact@nithyamuthukrishnan.com>',
    to: process.env.CONTACT_EMAIL_TO || 'hello@nithyamuthukrishnan.com',
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: message,
  });
}

const inputClass =
  'rounded-sm border border-[var(--nm-border)] bg-[var(--nm-surface)] px-4 py-2 text-sm outline-none focus:border-[var(--nm-accent)]';

export default function ContactPage() {
  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Get in touch" title="Contact" />
      <form action={sendContactMessage} className="flex max-w-lg flex-col gap-4">
        <input name="name" placeholder="Name" required className={inputClass} />
        <input name="email" type="email" placeholder="Email" required className={inputClass} />
        <textarea name="message" placeholder="Message" required rows={5} className={inputClass} />
        <button
          type="submit"
          className="w-fit rounded-sm bg-[var(--nm-text)] px-6 py-3 text-sm text-[var(--nm-bg)] hover:opacity-90"
        >
          Send
        </button>
      </form>
    </Container>
  );
}
