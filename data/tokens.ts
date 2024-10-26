import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'
import { getVerfiactionTokenByEmail } from './verificationToken'

export const generateVerifiactionToken = async (email: string) => {
  const token = uuidv4()
  const exipres = new Date(new Date().getTime() + 3600 * 1000)

  /**
   * user already have token or not 
   * if yes then delete old one and
   * put new token 
   */

  const exisitingToken = await getVerfiactionTokenByEmail(email)
  if (exisitingToken) {
    await db.verficationToken.delete({
      where: {
        id: exisitingToken.id
      }
    })
  }

  const verficationToken = await db.verficationToken.create({
    data: {
      email,
      token,
      exipres
    }
  })

  return verficationToken;
}