import { Module } from '@medusajs/framework/utils';
import AppointmentBookingModuleService from './service';

export const APPOINTMENT_BOOKING_MODULE = 'appointmentBooking';

export default Module(APPOINTMENT_BOOKING_MODULE, {
  service: AppointmentBookingModuleService,
});
