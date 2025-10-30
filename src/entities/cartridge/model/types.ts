import { Cartridge } from '@prisma/client';

export type CartridgeDTO = Cartridge & { model: { model: string; id: number } };
