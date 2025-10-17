import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/shared/lib';
import { verifyPassword } from '@/shared/lib/auth/passwordHasher';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: '',
      clientSecret: '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'login', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const values = {
          login: credentials.login,
          password: credentials.password,
        };
        const findUser = await prisma.user.findUnique({
          where: { login: values.login },
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await verifyPassword(
          values.password,
          findUser.password,
          findUser.salt!,
        );
        if (!isPasswordValid) {
          return null;
        }

        if (!findUser.status) {
          return null;
        }

        return {
          id: String(findUser.id),
          login: findUser.login,
          role: findUser.role,
          //TODO Добавить нужные поля
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  //TODO 20:48:36 archakov
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
