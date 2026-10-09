import { NextRequest, NextResponse } from 'next/server';
import { salonDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('aniq_admin_session');
    if (!session?.value) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const settings = salonDb.getSettings();
    const services = salonDb.getServices();
    const masters = salonDb.getMasters();

    return NextResponse.json({
      success: true,
      settings,
      services,
      masters
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch settings' },
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

    const body = await request.json();
    const { target, data } = body;

    if (target === 'settings') {
      const updated = salonDb.updateSettings(data);
      return NextResponse.json({ success: true, settings: updated });
    }

    if (target === 'service') {
      const { serviceId, updates } = data;
      const updated = salonDb.updateService(serviceId, updates);
      return NextResponse.json({ success: true, service: updated });
    }

    if (target === 'master') {
      const { masterId, updates } = data;
      const updated = salonDb.updateMaster(masterId, updates);
      return NextResponse.json({ success: true, master: updated });
    }

    return NextResponse.json({ success: false, error: 'Invalid target' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update settings' },
      { status: 500 }
    );
  }
}

