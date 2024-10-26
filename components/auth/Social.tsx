'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Social = () => {

  const onClick = (provider : "google" | "github") => {
    console.log("hello")
    signIn(provider , {
      redirectTo : DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <div className='w-full flex justify-center items-center gap-x-6' >
      <Button
        variant={"outline"}
        onClick={() => onClick("google")}
        size={"lg"}
        className='w-full'
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => onClick("github")}
        size={"lg"}
        className='w-full'
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  )
}

export default Social