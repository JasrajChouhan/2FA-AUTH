import { Resend } from 'resend';

import VerificationEmail from '@/components/email/VerificationEmail';
import { getEnv } from '@/env';

const resend = new Resend(getEnv("RESEND_API_KEY"));

export async function sendVerificationEmail(email: string, token: string) {

  const confirmationUrl = `http://localhost:3000/auth/new-verification?token=${token}`

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Email Confirmation',
      react: VerificationEmail({ confirmationUrl: confirmationUrl })
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
