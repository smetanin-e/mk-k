import z from 'zod';

export const createBatchSchema = z.object({
  date: z.string().min(10, { message: 'Некоректная дата' }),
  notes: z.string().nullable(),
  responsible: z.string().min(5, { message: 'Нужно ввести ответственного' }),
});

export type CreateBatchFormType = z.infer<typeof createBatchSchema>;
