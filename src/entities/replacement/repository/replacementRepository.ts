import { prisma } from '@/shared/lib/prisma-client';

export const replacementRepository = {
  async getFilteredRemlacements(search: string, take?: number, skip?: number) {
    return prisma.replacement.findMany({
      where: search
        ? {
            OR: [
              { installedCartridgeLabel: { contains: search, mode: 'insensitive' } },
              { removedCartridgeLabel: { contains: search, mode: 'insensitive' } },
              { departament: { name: { contains: search, mode: 'insensitive' } } },
            ],
          }
        : {},
      include: {
        departament: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  },
};
