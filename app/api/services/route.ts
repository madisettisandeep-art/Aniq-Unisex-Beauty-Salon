import { NextResponse } from 'next/server';
import { salonDb } from '@/lib/db';
import { SERVICE_CATEGORIES } from '@/lib/data/service-catalog';

export async function GET() {
  try {
    const services = salonDb.getServices();
    return NextResponse.json(
      {
        success: true,
        categories: SERVICE_CATEGORIES,
        services,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
