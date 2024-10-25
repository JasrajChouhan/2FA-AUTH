'use clinet';

import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const Social = () => {
  return (
    <div className='w-full flex justify-center items-center gap-x-6' >
      <Button
        variant={"outline"}
        onClick={() => { }}
        size={"lg"}
        className='w-full'
      >
        <FcGoogle className='h-5 w-5' />
      </Button>
      <Button
        variant={"outline"}
        onClick={() => { }}
        size={"lg"}
        className='w-full'
      >
        <FaGithub className='h-5 w-5' />
      </Button>
    </div>
  )
}

export default Social