import { batchRepository } from '@/entities/batch/repository/batch-repository';
import { BatchStatus } from '@prisma/client';
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
    const take = searchParams.get('take') ? parseInt(searchParams.get('take')!, 10) : undefined;
    const skip = searchParams.get('skip') ? parseInt(searchParams.get('skip')!, 10) : undefined;
    const statuses = searchParams.getAll('status') as BatchStatus[];

    const batchesRaw = await batchRepository.getFilterByStatuses(statuses, take, skip);

    const batches = batchesRaw.map((batch) => ({
      id: batch.id,
      date: batch.date,
      responsible: batch.responsible,
      notes: batch.notes,
      status: batch.status,
      partialReturnDate: batch.partialReturnDate,
      cartridges: batch.cartridgesInBatch
        .map((cb) => ({
          ...cb.cartridge,
          returned: cb.returned,
          returnDate: cb.returnDate,
          returnResponsible: cb.returnResponsible,
          returnNotes: cb.returnNotes,
        }))
        .sort((a, b) => a.numericLabel - b.numericLabel),
    }));

    return NextResponse.json(batches);
  } catch (error) {
    console.error('[API_BATCH_GET]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
