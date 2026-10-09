import { NextResponse } from 'next/server';
import { salonDb } from '@/lib/db';

export async function GET() {
  try {
    const masters = salonDb.getMasters();
    return NextResponse.json({
      success: true,
      masters
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch masters' },
      { status: 500 }
    );
  }
}

