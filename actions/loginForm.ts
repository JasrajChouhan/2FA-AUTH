'use server';
import { AuthError } from "next-auth";
import * as z from 'zod';

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";


export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid Cradencials"
    }
  }

  const {
    email,
    password
  } = validateFields.data;

  try {
    await signIn("credentials", {
      email, password, redirectTo: DEFAULT_LOGIN_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!"
          }
        default:
          return {
            error: "Something went wrong!"
          }
      }
    }
    throw error;
  }
}