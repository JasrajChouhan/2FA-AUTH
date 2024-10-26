import { db } from "@/lib/db";

export const getVerfiactionTokenByEmail = async (email: string) => {
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

export const getVerfiactionTokenByToken = async (token: string) => {
  try {
    const verficationToken = await db.verficationToken.findUnique({
      where: {
        token: token
      }
    })

    return verficationToken
  } catch (error) {
    console.log(error)
    return;
  }
}