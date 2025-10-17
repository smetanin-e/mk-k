import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/shared/lib';
import { verifyPassword } from '@/shared/lib/auth/passwordHasher';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        login: { label: 'login', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        debugger;
        console.log('credentials', credentials);
        if (!credentials) {
          return null;
        }
        const values = {
          login: credentials.login,
          password: credentials.password,
        };
        console.log('values', values);
        const findUser = await prisma.user.findUnique({
          where: { login: values.login },
        });

        console.log('findUser', findUser);

        if (!findUser) {
          console.log('❌ User not found');
          return null;
        }

        const isPasswordValid = await verifyPassword(
          values.password,
          findUser.password,
          findUser.salt!,
        );
        console.log('isPasswordValid', isPasswordValid);
        if (!isPasswordValid) {
          return null;
        }

        if (!findUser.status) {
          return null;
        }

        return {
          id: findUser.id,
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
  callbacks: {
    async signIn({ account }) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error [SIGNIN]', error);
        return false;
      }
    },
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: { login: token.login },
      });
      console.log('findUser', findUser);

      if (findUser) {
        token.id = String(findUser.id);
        token.login = findUser.login;
        token.role = findUser.role;
        //TODO Добавить нужные поля
      }
      return token;
    },

    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
