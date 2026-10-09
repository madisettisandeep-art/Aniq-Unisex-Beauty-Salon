import { NextRequest, NextResponse } from 'next/server';
import { salonDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const masterId = searchParams.get('masterId') || 'no-preference';
    const duration = parseInt(searchParams.get('duration') || '30', 10);

    if (!date) {
      return NextResponse.json({ success: false, error: 'Date is required' }, { status: 400 });
    }

    // Check operating hours
    const settings = salonDb.getSettings();
    const [openH, openM] = settings.operatingHours.openTime.split(':').map(Number);
    const [closeH, closeM] = settings.operatingHours.closeTime.split(':').map(Number);

    const openMin = openH * 60 + openM;
    const closeMin = closeH * 60 + closeM;

    // Check if requested date is today to filter out past slots
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const isToday = date === todayStr;
    const currentMin = now.getHours() * 60 + now.getMinutes() + (settings.minNoticeHours * 60);

    const candidateSlots: string[] = [];
    const interval = 30; // 30-minute slot intervals

    for (let m = openMin; m + duration <= closeMin; m += interval) {
      if (isToday && m < currentMin) {
        continue; // Skip past slots and slots within notice period
      }

      const h = Math.floor(m / 60);
      const min = m % 60;
      const timeStr = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;

      // Check conflict
      const hasConflict = salonDb.hasConflict(masterId, date, timeStr, duration);
      if (!hasConflict) {
        candidateSlots.push(timeStr);
      }
    }

    return NextResponse.json({
      success: true,
      date,
      masterId,
      duration,
      slots: candidateSlots
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate slots' },
      { status: 500 }
    );
  }
}

