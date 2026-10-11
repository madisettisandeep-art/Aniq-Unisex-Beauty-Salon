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

    // Batch indexed lookup + server-side query cache (zero N+1 queries)
    const candidateSlots = salonDb.getAvailableSlots(date, masterId, duration);

    return NextResponse.json(
      {
        success: true,
        date,
        masterId,
        duration,
        slots: candidateSlots,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=15, stale-while-revalidate=60',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to calculate slots' },
      { status: 500 }
    );
  }
}
