import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'
import { getVerifiactionTokenByEmail } from './verificationToken'
import { getForgotPasswordTokenByEmail } from './forgotPassswordToken'

export const generateVerifiactionToken = async (email: string) => {
  const token = uuidv4()
  const exipres = new Date(new Date().getTime() + 3600 * 1000)

  /**
   * user already have token or not 
   * if yes then delete old one and
   * put new token 
   */

  const exisitingToken = await getVerifiactionTokenByEmail(email)
  if (exisitingToken) {
    await db.verficationToken.delete({
      where: {
        id: exisitingToken.id
      }
    })
  }

  const verificationToken = await db.verficationToken.create({
    data: {
      email,
      token,
      exipres
    }
  })

  return verificationToken;
}

export const generateForgotPasswordToken = async (email : string) => {

  const token = uuidv4()
  const exipres = new Date(new Date().getTime() + 10 * 60 * 1000)  // for 10 minutes


  const exisitingToken = await getForgotPasswordTokenByEmail(email)
  if (exisitingToken) {
    await db.forgotPasswordToken.delete({
      where: {
        id: exisitingToken.id
      }
    })
  }

  const forgotPassordToken = await db.forgotPasswordToken.create({
    data: {
      email,
      token,
      exipres
    }
  })

  return forgotPassordToken;

}