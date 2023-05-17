
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google'
// import Provider from '@/components/Provider';

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
