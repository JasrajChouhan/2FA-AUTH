'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { login } from '@/actions/loginForm';
import CardWrapper from '@/components/auth/CardWrapper';
import { LoginSchema } from '@/schemas';
import { useState, useTransition } from 'react';
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const LoginForm = () => {

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { isLoading } = form.formState

  // Submit handler
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {

    // clear the success and error message 
    setError("")
    setSuccess("")

    startTransition(() => {
      login(data)
        .then((data) => {
          setError(data.error)
          setSuccess(data.success)
        })
    })

  };

  return (
    <CardWrapper
      showSocial={true}
      backButtonHref='/auth/register'
      backButtonLabel="Don't have an account?"
      headerLabel='Welcome back! Please Login'
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

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
