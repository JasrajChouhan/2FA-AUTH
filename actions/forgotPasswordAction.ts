"use server";

import { getUserByEmail } from "@/data/user";
import { ForgotPasswordSchema } from "@/schemas";
import { z } from "zod";

export const forgotPassword = async (data: z.infer<typeof ForgotPasswordSchema>) => {

  const { email } = data;
  const validateFilelds = ForgotPasswordSchema.safeParse(data);

  if (!validateFilelds.success) {
    return {
      error: "Invalid Email!"
    }
  }
  try {
    // First check email is aviable in db or not 
    const user = await getUserByEmail(email)
    if (!user) {
      return {
        error: "Your email not link with any account."
      }
    }

    // generat the token and send the email(with token )

    return {
      success: "Email sent successfully"
    }
  } catch (error) {
    console.log(error)
    return;
  }
}