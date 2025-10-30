import { cartridgeRepository } from '@/entities/cartridge/repository/cartridge-repository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (token !== process.env.INTERNAL_API_TOKEN && token !== process.env.NEXT_PUBLIC_API_READ_KEY) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  try {
    const cartridges = await cartridgeRepository.getCartridges();
    return NextResponse.json(cartridges);
  } catch (error) {
    console.error('[API_CARTRIDGE_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
