
import { getEnv } from '@/env';
import { Resend } from 'resend';

const resend = new Resend(getEnv("RESEND_API_KEY"));

export async function sendVerificationEmail(email: string, token: string) {

  const confirmationEmailUrl = `http://localhost:3000/auth/new-verification?token=${token}`
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Hello world',
      react: `<h1> Verificaiton email </h1><a href = "${confirmationEmailUrl}" >Click here</a>`,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
