import { prisma } from '@/shared/lib/prisma-client';
import { BatchForService } from '../model/types';
import { BatchStatus } from '@prisma/client';

export const batchRepository = {
  async createBatch(data: BatchForService) {
    return prisma.serviceBatch.create({
      data: {
        date: data.date,
        notes: data.notes,
        responsible: data.responsible,
        cartridgesInBatch: {
          create: data.cartridges.map((cartridgeId) => ({
            cartridge: { connect: { id: cartridgeId } },
          })),
        },
      },
      include: { cartridgesInBatch: true },
    });
  },

  async getFilterByStatuses(statuses: BatchStatus[] | null, take?: number, skip?: number) {
    return prisma.serviceBatch.findMany({
      where: statuses && statuses.length > 0 ? { status: { in: statuses } } : {},
      select: {
        id: true,
        date: true,
        responsible: true,
        status: true,
        partialReturnDate: true,
        notes: true,
        cartridgesInBatch: {
          select: {
            serviceBatchId: true,
            returned: true,
            returnDate: true,
            returnResponsible: true,
            returnNotes: true,
            cartridge: {
              select: { id: true, label: true, numericLabel: true, model: true, status: true },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  },
};
