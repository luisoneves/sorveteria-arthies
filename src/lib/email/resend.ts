import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const emails = {
  adminDev: process.env.EMAIL_ADMIN_DEV || '1991lotavio@gmail.com',
  adminProd: process.env.EMAIL_ADMIN_PROD || '199lotavion@gmail.com',
};

export const fromEmail = 'Sorveteria Arthies <noreply@arthies.com>';

export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: any;
}) {
  if (!resend) {
    console.warn('Resend not configured - email skipped');
    return { success: false, error: 'Resend not configured' };
  }
  
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false, error };
  }
}