import { model } from '@medusajs/framework/utils';

const Appointment = model.define('appointment', {
  id: model.id().primaryKey(),
  customer_id: model.text(),
  customer_name: model.text(),
  customer_email: model.text(),
  customer_phone: model.text().nullable(),
  requested_at: model.dateTime(),
  duration_minutes: model.number().default(60),
  notes: model.text().nullable(),
  status: model.enum(['requested', 'confirmed', 'cancelled', 'completed']).default('requested'),
});

export default Appointment;
