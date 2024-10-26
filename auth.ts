import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from "next-auth"


import authConfig from "@/auth.config"
import { db } from "@/lib/db"

import { getUserById } from '@/data/user'
import { UserRole } from '@prisma/client'

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {

    async signIn({ user, account }) {
      // Allow OAUTH without email verficiation 
      if (account?.provider !== 'credentials') return true;

      const exisitingUser = await getUserById(user.id as string)
      console.log("exisitingUser", exisitingUser)
      if (!exisitingUser?.email) return false;

      // TODO :: 2FA 
      return true;
    },

    async session({ token, session }) {
      console.log("SESSION :: ", session)
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const userId = token.sub;
      const exisitingUser = await getUserById(userId)
      if (!exisitingUser) return token;

      token.role = exisitingUser.role

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt"
  },
  ...authConfig
})
