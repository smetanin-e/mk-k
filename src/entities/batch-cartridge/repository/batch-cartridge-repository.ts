import { prisma } from '@/shared/lib/prisma-client';

export const batchCartridgeRepository = {
  async deleteAllByBatchId(batchId: string) {
    return prisma.serviceBatchCartridge.deleteMany({
      where: { serviceBatchId: batchId },
    });
  },
};
