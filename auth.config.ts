import bcryptjs from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"
import { getEnv } from '@/env'


console.log({
  GOOGLE_CLIENT_ID: getEnv("AUTH_GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("AUTH_GOOGLE_CLIENT_SECRET"),
  GITHUB_CLIENT_ID: getEnv("AUTH_GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: getEnv("AUTH_GITHUB_CLIENT_SECRET"),
})

const authOptions: NextAuthConfig = {
  providers: [
    Google({
      clientId: getEnv("AUTH_GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("AUTH_GOOGLE_CLIENT_SECRET"),
      authorization: {
        params: { scope: "openid email profile" },
      },
    }),
    Github({
      clientId: getEnv("AUTH_GITHUB_CLIENT_ID"),
      clientSecret: getEnv("AUTH_GITHUB_CLIENT_SECRET"),
      authorization: {
        params: { scope: "read:user user:email" },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate the fields
        const validateFileds = LoginSchema.safeParse(credentials)

        if (!validateFileds.success) {
          // Optionally return error.message here for better debugging
          return null;
        }

        const { email, password } = validateFileds.data;

        // Check user by email
        const user = await getUserByEmail(email)
        if (!user || !user.password) {
          return null;
        }

        // Compare the password
        const isPasswordMatched = await bcryptjs.compare(password, user.password)
        if (isPasswordMatched) return user;

        return null;
      }
    })
  ],
}

export default authOptions
