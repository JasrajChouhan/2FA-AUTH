'use client'

import { useCallback, useEffect, useState } from "react"
import { BeatLoader } from 'react-spinners'

import { newEmailVerification } from "@/actions/newVerificationAction"
import FormError from "@/components/FormError"
import FormSuccess from "@/components/FormSuccess"
import CardWrapper from "@/components/auth/CardWrapper"
import { useSearchParams } from "next/navigation"


const NewVerificationForm = () => {
  const searchParam = useSearchParams()
  const token = searchParam.get("token")

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const onSubmit = useCallback(() => {
    console.log(token);

    if (!token) {
      setError("Token not found. Try again letter.")
      return;
    }
    newEmailVerification(token)
      .then(data => {
        console.log(data)
        setError(data?.error)
        setSuccess(data?.success)
      })

  }, [token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Go to Login"
      headerLabel="Confirm your email"
    >
      <div className="flex flex-col justify-center items-center" >

        {
          !error && !success && <div><BeatLoader color="white" /></div>
        }

        {
          error && <FormError errorMessage={error} />
        }

        {
          success && <FormSuccess successMessage={success} />
        }
      </div>

    </CardWrapper>
  )
}

export default NewVerificationForm