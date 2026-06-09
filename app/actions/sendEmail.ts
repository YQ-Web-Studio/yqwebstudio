"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const businessName = formData.get('businessName') as string;
  const primaryGoal = formData.get('primaryGoal') as string;
  const projectDetails = formData.get('projectDetails') as string;

  if (!name || !email || !projectDetails) {
    return { error: 'Please fill in all required fields.' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'YQ Web Studio <noreply@notifications.yqwebstudio.com>',
      to: 'projects@yqwebstudio.com',
      subject: `New Project Enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #5b21b6; padding-bottom: 10px;">New Project Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Business Name:</strong> ${businessName || 'N/A'}</p>
          <p><strong>Primary Goal:</strong> ${primaryGoal}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p><strong>Project Details:</strong></p>
            <p style="white-space: pre-wrap;">${projectDetails}</p>
          </div>
          <footer style="margin-top: 20px; font-size: 12px; color: #666; text-align: center;">
            <p>Sent via YQ Web Studio 'Start a Project' Form</p>
          </footer>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Error:', err);
    return { error: 'Failed to send email. Please try again later.' };
  }
}
