import { loginSchema } from '@/features/auth';
import { passwordSchema } from '@/shared/lib/validation';
import z from 'zod';

export const createUserSchema = z
  .object({
    ...loginSchema.shape,
    surname: z.string().min(1, { message: 'Заполните фамилию' }),
    firstName: z.string().min(2, { message: 'Заполните имя' }),
    role: z
      .enum(['USER', 'ADMIN'] as const)
      .optional()
      .refine((val) => !!val, { message: 'Укажите роль' }),
    lastName: z.string().min(2, { message: 'Заполните отчество' }),
    confirmPassword: passwordSchema,
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    },
  );

export type CreateUserType = z.infer<typeof createUserSchema>;
