'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { LoginSchema } from '@/schemas';
import CardWrapper from '@/components/auth/CardWrapper';
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
import FormError from '../FormError';
import FormSuccess from '../FormSuccess';

const LoginForm = () => {


  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {isLoading} = form.formState

  // Submit handler
  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    // try {
    //   setLoading(true);
    //   // Perform login operation, e.g., call your login API
    //   console.log('Form Submitted:', data);
    //   // Success handling here
    // } catch (error) {
    //   console.error('Login error:', error);
    //   // Optionally show error message here
    // } finally {
    //   setLoading(false);
    // }
    console.log(data)
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
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError errorMessage='Email is taken' />
            <FormSuccess successMessage='Email sent' />
            <Button
              className='w-full'
              type='submit'
              disabled={isLoading} 
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
