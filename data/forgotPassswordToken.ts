import { db } from "@/lib/db";

export const getForgotPasswordTokenByToken = async (token: string) => {
  try {
    const forgotPasswordToken = await db.forgotPasswordToken.findFirst({
      where: {
        token: token
      }
    })
    return forgotPasswordToken;
  } catch (error) {
    console.log(error)
    return;
  }
}


export const getForgotPasswordTokenByEmail = async (email: string) => {
  try {
    const forgotPassordToken = await db.forgotPasswordToken.findUnique({
      where: {
        email
      }
    })
    return forgotPassordToken
  } catch (error) {
    console.log(error)
    return;
  }
}