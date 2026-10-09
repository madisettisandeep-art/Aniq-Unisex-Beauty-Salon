import { Appointment, SalonService } from './types/booking';

export const SALON_WHATSAPP_NUMBER = '919912417109';

/**
 * Builds the official WhatsApp click-to-chat URL with safe URI encoding.
 */
export function buildWhatsAppUrl(message: string, phone: string = SALON_WHATSAPP_NUMBER): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

/**
 * Generates the mandatory Step 9 booking confirmation message.
 */
export function generateBookingConfirmationWhatsAppUrl(appointment: Appointment): string {
  const servicesList = appointment.services.map(s => `${s.name} (₹${s.price})`).join(', ');
  const masterText = appointment.masterName && appointment.masterName !== 'no-preference' 
    ? appointment.masterName 
    : 'No preference (Assign available master)';

  const message = 
`Hello ANIQ Salon, I would like to book an appointment.

Booking reference: ${appointment.bookingReference}
Customer: ${appointment.customerName}
Services: ${servicesList}
Preferred master: ${masterText}
Date: ${appointment.appointmentDate}
Time: ${appointment.appointmentTime}
Estimated total: ₹${appointment.totalPrice.toLocaleString('en-IN')}

Please confirm availability and my appointment. Thank you.`;

  return buildWhatsAppUrl(message);
}

/**
 * Contextual WhatsApp templates
 */
export const WhatsAppTemplates = {
  generalInquiry: () => {
    return buildWhatsAppUrl(
      `Hello ANIQ Salon, I would like to enquire about your services, timings and salon location in West Marredpally.`
    );
  },

  serviceInquiry: (service: SalonService) => {
    return buildWhatsAppUrl(
      `Hello ANIQ Salon, I would like to know more about "${service.name}" (${service.priceDisplay}). Could you share available timings and preparation details?`
    );
  },

  tattooConsultation: () => {
    return buildWhatsAppUrl(
      `Hello ANIQ Tattoo Studio, I would like to book a custom tattoo design consultation at your West Marredpally studio. Please let me know the available master slots.`
    );
  },

  rescheduleRequest: (bookingRef: string, customerName: string, requestedDate?: string, requestedTime?: string) => {
    return buildWhatsAppUrl(
`Hello ANIQ Salon, I would like to request rescheduling for my appointment.

Booking reference: ${bookingRef}
Customer: ${customerName}
${requestedDate ? `Requested New Date: ${requestedDate}\n` : ''}${requestedTime ? `Requested New Time: ${requestedTime}\n` : ''}
Please let me know if this slot is available. Thank you.`
    );
  },

  cancellationRequest: (bookingRef: string, customerName: string, reason?: string) => {
    return buildWhatsAppUrl(
`Hello ANIQ Salon, I would like to cancel my upcoming appointment.

Booking reference: ${bookingRef}
Customer: ${customerName}
${reason ? `Reason: ${reason}\n` : ''}
Kindly update my booking status. Thank you.`
    );
  }
};

