import { prisma } from '@/shared/lib/prisma-client';
import { CartridgeDTO } from '../model/types';
import { RegisterCartridgeFormType } from '@/features/cartridge/model/schemas/register-сartrige-schema';

export const cartridgeRepository = {
  async getCartridges(): Promise<CartridgeDTO[]> {
    return prisma.cartridge.findMany({
      include: {
        model: { select: { model: true, id: true } },
      },
      orderBy: {
        numericLabel: 'desc',
      },
    });
  },

  async findByLabel(label: string) {
    return prisma.cartridge.findFirst({
      where: { label },
    });
  },

  async create(formData: RegisterCartridgeFormType) {
    return prisma.cartridge.create({
      data: {
        label: formData.label,
        modelId: formData.modelId,
        numericLabel: parseInt(formData.label.replace(/\D/g, ''), 10),
        status: formData.status,
      },
    });
  },
};
