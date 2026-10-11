import { NextResponse } from 'next/server';
import { salonDb } from '@/lib/db';

export async function GET() {
  const poolStats = salonDb.getPoolStats();
  return NextResponse.json(
    {
      status: 'healthy',
      service: 'aniq-unisex-beauty-salon',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.round(process.uptime()),
      databasePool: poolStats,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}

