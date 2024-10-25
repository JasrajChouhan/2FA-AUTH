'use server';
import bcrypt from 'bcrypt';
import { z } from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from '@/data/user';

export const registerAction = async (
  data: z.infer<typeof RegisterSchema>
) => {
  const validateFields = RegisterSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      error: "Invalid Cradencials"
    }
  }

  const {
    email,
    password,
    name
  } = validateFields.data

  // check email already exsits in db or not?

  const exisitingUser = await db.user.findFirst({
    where: {
      email: email
    }
  })

  if (exisitingUser) {
    return {
      error: "Email already in use, Please login"
    }
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10)

  // create an user and save into db 

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  // check once more by email user is created or not
  const newUser = await getUserByEmail(email)

  if (!newUser) {
    return {
      error: 'Some error occur, Please try again letter.'
    }
  }

  // TODO :: Send the varification email
  return {
    success: "User created!"
  }

}