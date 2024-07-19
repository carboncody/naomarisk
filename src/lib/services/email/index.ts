'use server';

import { env } from '@env';
import { Resend } from 'resend';

const resend = new Resend(env.resendApiKey);

export async function sendInviteEmail(email: string, companyName: string) {
  const { error } = await resend.emails.send({
    from: 'NAOMA Risk <it@naoma.dk>',
    to: [email],
    subject: 'Invitation til NAOMA Risk',
    html: `
      <p><strong>Hej,</strong></p>
      <p>Du er blevet inviteret til ${companyName}s NAOMA Risk workspace.</p>
      <p>For at acceptere invitationen og begynde at bruge vores værktøj, bedes du klikke på følgende link:</p>
      <p><a href="https://naomarisk.vercel.app" target="_blank">Gå til NAOMA Risk</a></p>
      <p>Vi ser frem til at byde dig velkommen!</p>
      <p>Med venlig hilsen,<br/>NAOMA Risk Teamet</p>
    `,
  });

  if (error) {
    return console.error({ error });
  }
}

export async function sendNotificationEmail(
  email: string,
  companyName: string,
  Risk: string,
) {
  const { error } = await resend.emails.send({
    from: 'NAOMA Risk <it@naoma.dk>',
    to: [email],
    subject: 'NAOMA Risk Notification',
    html: `
      <p><strong>Hej,</strong></p>
      <p>Risk ${Risk} for ${companyName} er blevet opdateret.</p>
       <p>Med venlig hilsen,<br/>NAOMA Risk Teamet</p>

    `,
  });
  if (error) {
    return console.error({ error });
  }
}
