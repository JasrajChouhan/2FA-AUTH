'use server';
import bcryptjs from 'bcryptjs';
import { z } from "zod";

import { generateVerifiactionToken } from '@/data/tokens';
import { getUserByEmail } from '@/data/user';
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";

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

  const exisitingUser = await getUserByEmail(email)

  if (exisitingUser) {
    return {
      error: "Email already in use, Please login"
    }
  }

  // hash the password
  const hashedPassword = await bcryptjs.hash(password, 10)

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

  const verficationToken = await generateVerifiactionToken(email)
  console.log(verficationToken.token)
  return {
    success: "Confirmation email is sent"
  }

}