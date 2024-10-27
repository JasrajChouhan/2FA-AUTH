'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { forgotPassword } from '@/actions/forgotPasswordAction';
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
import { ForgotPasswordSchema } from '@/schemas';
import { useState, useTransition } from 'react';

const ForgotPasswordForm = () => {

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  });

  const { isLoading } = form.formState

  // Submit handler
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {

    // clear the success and error message 
    setError("")
    setSuccess("")

    startTransition(() => {
      forgotPassword(data)
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
      headerLabel='Forgot Password!'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex flex-col space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='john.doe@example.com'
                      type='email'
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
              {isLoading ? 'Submitting...' : 'Send reset email'}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
