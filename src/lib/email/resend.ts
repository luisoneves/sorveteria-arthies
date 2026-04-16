import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emails = {
  adminDev: process.env.EMAIL_ADMIN_DEV || '1991lotavio@gmail.com',
  adminProd: process.env.EMAIL_ADMIN_PROD || '199lotavion@gmail.com',
};

export const fromEmail = 'Sorveteria Arthies <noreply@arthies.com>';

export async function sendEmail({
  to,
  subject,
  react,
  text,
}: {
  to: string;
  subject: string;
  react?: React.ReactElement;
  text?: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: Array.isArray(to) ? to : [to],
      subject,
      react,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export default resend;
