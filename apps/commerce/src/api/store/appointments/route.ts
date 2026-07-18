import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { APPOINTMENT_BOOKING_MODULE } from '../../../modules/appointment-booking';
import AppointmentBookingModuleService from '../../../modules/appointment-booking/service';

type CreateAppointmentBody = {
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  requested_at: string;
  duration_minutes?: number;
  notes?: string;
};

export async function POST(req: MedusaRequest<CreateAppointmentBody>, res: MedusaResponse) {
  const appointmentBookingService: AppointmentBookingModuleService = req.scope.resolve(
    APPOINTMENT_BOOKING_MODULE
  );

  const body = req.validatedBody ?? req.body;

  const appointment = await appointmentBookingService.createAppointments({
    customer_id: req.auth_context?.actor_id ?? 'guest',
    customer_name: body.customer_name,
    customer_email: body.customer_email,
    customer_phone: body.customer_phone ?? null,
    requested_at: new Date(body.requested_at),
    duration_minutes: body.duration_minutes ?? 60,
    notes: body.notes ?? null,
  });

  res.json({ appointment });
}
