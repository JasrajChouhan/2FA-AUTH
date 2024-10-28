"use server";

import bcryptjs from 'bcryptjs';
import { z } from "zod";

import { getForgotPasswordTokenByToken } from "@/data/forgotPassswordToken";
import { getUserByEmail } from "@/data/user";
import { db } from '@/lib/db';
import { NewPasswordSchema } from "@/schemas";

export const setNewPassword = async (data: z.infer<typeof NewPasswordSchema>, token: string) => {
  try {

    if (!token) {
      return { error: "Token not found!" };
    }

    // Validate input fields using Zod schema
    const validationResult = NewPasswordSchema.safeParse(data);
    if (!validationResult.success) {
      return { error: "Invalid fields provided." };
    }

    const { newPassword, confirmPassword } = validationResult.data;

    // Check if new password matches the confirmation password
    if (newPassword !== confirmPassword) {
      return { error: "Passwords do not match." };
    }

    // Fetch forgot password token from the database
    const forgotPasswordToken = await getForgotPasswordTokenByToken(token);
    if (!forgotPasswordToken) {
      return { error: "Token not found or expired." };
    }

    // Check if the token is expired
    if (new Date(forgotPasswordToken.exipres) < new Date()) {
      return { error: "Token has expired." };
    }

    // Fetch the user by email associated with the token
    const user = await getUserByEmail(forgotPasswordToken.email);
    if (!user) {
      return { error: "User not found." };
    }

    // Ensure the new password is different from the old password
    const isPasswordSame = await bcryptjs.compare(newPassword, user.password as string);
    if (isPasswordSame) {
      return { error: "New password must be different from the old password." };
    }


    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update user's password in the database
    await db.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    // Remove the used forgot password token
    await db.forgotPasswordToken.delete({
      where: { id: forgotPasswordToken.id }
    });

    return { success: "Password reset successfully." };

  } catch (error) {
    console.error("Error resetting password:", error);
    return { error: "Internal server error. Please try again later." };
  }
};
