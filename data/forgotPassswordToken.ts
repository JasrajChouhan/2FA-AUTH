import { db } from "@/lib/db";

export const getForgotPasswordToken = async (email: string) => {
  try {
    const forgotPasswordToken = await db.forgotPasswordToken.findFirst({
      where: {
        email: email
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