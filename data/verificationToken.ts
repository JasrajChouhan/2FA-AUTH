import { db } from "@/lib/db";

export const getVerifiactionTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verficationToken.findFirst({
      where: {
        email: email
      }
    })
    return verificationToken;
  } catch (error) {
    console.log(error)
    return;
  }
}

export const getVerifiactionTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verficationToken.findUnique({
      where: {
        token
      }
    })
    return verificationToken
  } catch (error) {
    console.log(error)
    return;
  }
}