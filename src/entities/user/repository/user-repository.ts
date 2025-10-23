import { prisma } from '@/shared/lib/prisma-client';
import { AuthUser } from '../model/types';

export const userRepository = {
  async findUserByLogin(login: string) {
    return prisma.user.findUnique({ where: { login } });
  },

  async findUserById(userId: number): Promise<AuthUser | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        login: true,
        role: true,
        surname: true,
        firstName: true,
        lastName: true,
        status: true,
      },
    });

    if (!user) return null;
    return user;
  },

  async getUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        login: true,
        surname: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true,
      },
      orderBy: { surname: 'asc' },
    });
  },
};
