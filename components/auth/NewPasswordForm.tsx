'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { setNewPassword } from '@/actions/newPasswordAction';
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NewPasswordSchema } from '@/schemas';
import { useSearchParams } from 'next/navigation';

const NewPasswordForm = () => {

  const serachParams = useSearchParams()
  const token = serachParams.get("token") as string

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { isLoading } = form.formState

  // Submit handler
  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {

    // clear the success and error message 
    setError("")
    setSuccess("")
    console.log(data)

    startTransition(() => {
      setNewPassword(data, token)
        .then((data) => {
          setError(data?.error)
          setSuccess(data?.success)
        })
    })

  };

  return (
    <CardWrapper
      backButtonHref='/auth/login'
      backButtonLabel="Back to Login"
      headerLabel='Reset Password'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='********'
                      type='password'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='********'
                      type='password'
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error &&
              <FormError errorMessage={error as string} />}
            {success &&
              <FormSuccess successMessage={success as string} />}
            <Button
              className='w-full'
              type='submit'
              disabled={isPending || isLoading}
            >
              {isLoading ? 'Submitting...' : 'Create New Password'}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
