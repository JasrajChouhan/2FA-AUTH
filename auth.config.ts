import bcryptjs from 'bcryptjs'
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

import { getUserByEmail } from "@/data/user"
import { LoginSchema } from "@/schemas"


const authOptions: NextAuthConfig = {
  providers: [
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
