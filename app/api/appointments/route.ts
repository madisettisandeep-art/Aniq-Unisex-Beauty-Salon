import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { salonDb } from '@/lib/db';
import { generateBookingConfirmationWhatsAppUrl } from '@/lib/whatsapp';

const createBookingSchema = z.object({
  customerType: z.enum(['men', 'women', 'kids', 'tattoo']),
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(80),
  customerPhone: z.string().min(10, 'Valid 10-digit phone number is required').max(15),
  customerEmail: z.string().email().optional().or(z.literal('')),
  specialInstructions: z.string().max(500).optional(),
  serviceIds: z.array(z.string()).min(1, 'Please select at least one service'),
  masterId: z.string().default('no-preference'),
  appointmentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Valid date YYYY-MM-DD required'),
  appointmentTime: z.string().regex(/^\d{2}:\d{2}$/, 'Valid time HH:mm required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createBookingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, errors: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const result = salonDb.createAppointment(validated.data);
    if ('error' in result) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 409 }
      );
    }

    const whatsAppUrl = generateBookingConfirmationWhatsAppUrl(result.appointment);

    return NextResponse.json({
      success: true,
      appointment: result.appointment,
      whatsAppUrl
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Server error creating appointment' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');

    if (!ref) {
      return NextResponse.json(
        { success: false, error: 'Booking reference is required' },
        { status: 400 }
      );
    }

    const appointment = salonDb.getAppointmentByReference(ref);
    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found. Please verify the reference code.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to lookup appointment' },
      { status: 500 }
    );
  }
}

