import { db } from "@/lib/db";

//get user by email-address

export const getUserByEmail = async (email : string) => {
  try {
    const user = await db.user.findUnique({
      where : {
        email : email
      }
    })
    return user;
  } catch (error) {
    console.log(error)
    return null;
  }
}


// get user by userId

export const getUserById = async (userId : string) => {
  try {
    const user = await db.user.findUnique({
      where : {
        id : userId
      }
    })
    return user;
  } catch (error) {
    console.log(error)
    return null;
  }
}