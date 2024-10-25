'use client';

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode,
  asChild?: boolean,
  mode?: "modal" | "redirect"
}

const LoginButton = ({
  asChild,
  children,
  mode = "redirect"
}: LoginButtonProps) => {

  const router = useRouter()


  function handleClick() {
    console.log("Logged button is clicked")
    router.push('/auth/login')
  }
  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  )
}

export default LoginButton