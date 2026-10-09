import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Secure administrative validation
    if (username === 'admin' && password === 'AniqSalon@2026') {
      const token = `aniq_sec_${Buffer.from(`admin:${Date.now()}`).toString('base64')}`;

      const response = NextResponse.json({
        success: true,
        user: { username: 'admin', role: 'administrator' }
      });

      response.cookies.set({
        name: 'aniq_admin_session',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Invalid administrator credentials' },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

