'use server';
import { RegisterSchema } from "@/schemas";
import { z } from "zod";

export const registerAction = async (
  data: z.infer<typeof RegisterSchema>
) => {
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid Cradencials"
    }
  } else {
    return {
      success: "Email sent"
    }
  }
}