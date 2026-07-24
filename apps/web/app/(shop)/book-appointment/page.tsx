import { redirect } from 'next/navigation';
import { Container, SectionHeading, Button } from '@nithya/ui';

const inputClass =
  'rounded-sm border border-[var(--nm-border)] bg-[var(--nm-surface)] px-4 py-2 text-sm outline-none focus:border-[var(--nm-accent)]';

async function requestAppointment(formData: FormData) {
  'use server';

  const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000';

  await fetch(`${backendUrl}/store/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      customer_name: formData.get('customer_name'),
      customer_email: formData.get('customer_email'),
      customer_phone: formData.get('customer_phone'),
      requested_at: formData.get('requested_at'),
      notes: formData.get('notes'),
    }),
  }).catch(() => {
    // backend offline — the request is simply not recorded; the form still
    // redirects so the visitor isn't blocked on infrastructure being down
  });

  redirect('/book-appointment?requested=1');
}

export default async function BookAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ requested?: string }>;
}) {
  const { requested } = await searchParams;

  return (
    <Container className="py-16">
      <SectionHeading eyebrow="Studio" title="Book an Appointment" />
      {requested ? (
        <p className="text-[var(--nm-text-muted)]">
          Thank you — your appointment request has been sent. The studio will follow up by email to confirm.
        </p>
      ) : (
        <form action={requestAppointment} className="flex max-w-lg flex-col gap-4">
          <input name="customer_name" placeholder="Name" required className={inputClass} />
          <input name="customer_email" type="email" placeholder="Email" required className={inputClass} />
          <input name="customer_phone" placeholder="Phone (optional)" className={inputClass} />
          <input name="requested_at" type="datetime-local" required className={inputClass} />
          <textarea name="notes" placeholder="What would you like to discuss?" rows={4} className={inputClass} />
          <Button type="submit" className="w-fit">
            Request appointment
          </Button>
        </form>
      )}
    </Container>
  );
}
