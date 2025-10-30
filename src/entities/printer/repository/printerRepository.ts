import { prisma } from '@/shared/lib/prisma-client';
import { PrinterDTO } from '../model/types';

export const printerRepository = {
  async getPrinters(): Promise<PrinterDTO[]> {
    return prisma.printer.findMany({
      include: { models: true },
    });
  },
};
