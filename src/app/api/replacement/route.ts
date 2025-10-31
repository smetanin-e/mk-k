import { replacementRepository } from '@/entities/replacement/repository/replacementRepository';
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
    const { searchParams } = new URL(req.url);

    const search = searchParams.get('search')?.trim() || '';
    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;

    const remlacements = await replacementRepository.getFilteredRemlacements(search, take, skip);
    return NextResponse.json(remlacements);
  } catch (error) {
    console.error('[API_REPLACEMENT_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
