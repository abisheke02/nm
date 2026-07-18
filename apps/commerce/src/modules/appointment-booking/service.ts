import { MedusaService } from '@medusajs/framework/utils';
import Appointment from './models/appointment';

class AppointmentBookingModuleService extends MedusaService({
  Appointment,
}) {}

export default AppointmentBookingModuleService;
