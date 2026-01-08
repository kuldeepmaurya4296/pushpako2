import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/lib/db/connectDB';
import Investor from '@/lib/models/Investor';
import jwt from 'jsonwebtoken';

const GoogleProviderFn = GoogleProvider.default || GoogleProvider;

export const authOptions = {
  providers: [
    GoogleProviderFn({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        // Check if user exists
        let existingUser = await Investor.findOne({ email: user.email });

        if (existingUser) {
          // Update if not already Google auth
          if (existingUser.authProvider !== 'google') {
            existingUser.authProvider = 'google';
            existingUser.googleId = user.id;
            await existingUser.save();
          }
        } else {
          // Create new user
          const newUser = new Investor({
            name: user.name,
            email: user.email,
            googleId: user.id,
            authProvider: 'google',
            role: 'investor', // Default role
            status: 'active',
          });
          await newUser.save();
          existingUser = newUser;
        }

        // Add user info to token
        user.id = existingUser._id;
        user.role = existingUser.role;

        return true;
      } catch (error) {
        console.error('Google sign-in error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;

      // Also set the JWT cookie for compatibility with existing middleware
      const jwtToken = jwt.sign(
        { id: token.id, email: session.user.email, role: token.role },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '7d' }
      );

      // Note: Cookies are set in the response, but here we can prepare the token
      session.jwt = jwtToken;

      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = (NextAuth.default || NextAuth)(authOptions);

export { handler as GET, handler as POST };