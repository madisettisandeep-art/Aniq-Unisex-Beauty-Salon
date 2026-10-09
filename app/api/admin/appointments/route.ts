import { NextRequest, NextResponse } from 'next/server';
import { salonDb } from '@/lib/db';
import { BookingStatus } from '@/lib/types/booking';

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('aniq_admin_session');
    if (!session?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const appointments = salonDb.getAppointments();
    const auditLogs = salonDb.getAuditLogs();

    return NextResponse.json({
      success: true,
      appointments,
      auditLogs
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = request.cookies.get('aniq_admin_session');
    if (!session?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { reference, action, status, notes, cancellationReason, newDate, newTime } = await request.json();

    if (!reference) {
      return NextResponse.json({ success: false, error: 'Booking reference required' }, { status: 400 });
    }

    if (action === 'reschedule') {
      if (!newDate || !newTime) {
        return NextResponse.json({ success: false, error: 'New date and time required' }, { status: 400 });
      }
      const res = salonDb.rescheduleAppointment(reference, newDate, newTime);
      if ('error' in res) {
        return NextResponse.json({ success: false, error: res.error }, { status: 409 });
      }
      return NextResponse.json({ success: true, appointment: res.appointment });
    }

    // Standard status update
    if (status) {
      const validStatuses: BookingStatus[] = [
        'PENDING_CONFIRMATION', 'CONFIRMED', 'REJECTED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'
      ];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ success: false, error: 'Invalid booking status' }, { status: 400 });
      }

      const updated = salonDb.updateAppointmentStatus(reference, status, notes, cancellationReason);
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, appointment: updated });
    }

    return NextResponse.json({ success: false, error: 'No valid action provided' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

