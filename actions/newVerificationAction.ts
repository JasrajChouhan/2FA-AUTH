"use server"

import { getUserByEmail } from "@/data/user";
import { getVerifiactionTokenByToken } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const newEmailVerification = async (token: string) => {

  const verificationToken = await getVerifiactionTokenByToken(token)

  if (!verificationToken) {
    return { error: "Invalid or expired token" };
  }

  const email = verificationToken.email as string;
  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User not found for provided email." };
  }


  if (!user) {
    return {
      error: "Wrong Credencials"
    }
  }

  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      email: email,
      emailVerified: new Date()
    }
  })

  await db.verficationToken.delete({
    where: {
      id: verificationToken.id
    }
  })

  return {
    success: "Email is verified."
  }

}