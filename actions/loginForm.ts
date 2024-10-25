'use server';

import * as z from 'zod';
import { LoginSchema } from "@/schemas";


export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(data);

  if(!validateFields.success) {
    return {
      error : "Invalid Cradencials"
    }
  }else {
    return {
      success : "Email sent"
    }
  }
}