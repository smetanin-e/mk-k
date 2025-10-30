import { CartridgeStatus } from '@prisma/client';
import z from 'zod';

export const registerCartridgeSchema = z.object({
  label: z.string().regex(/^МК\d{3}$/, { message: 'Формат номера: МК000' }), //МК кириллицей
  modelId: z.number().min(1, { message: 'Необходимо выбрать модель из списка' }),
  status: z.enum(CartridgeStatus, { message: 'Необходимо выбрать состояние картриджа' }),
});

export type RegisterCartridgeFormType = z.infer<typeof registerCartridgeSchema>;
