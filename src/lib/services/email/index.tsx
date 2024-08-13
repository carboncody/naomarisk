'use server';

import { env } from '@env';
import { Resend } from 'resend';
import { InviteEmail } from './templates/invite';
import { ProjectAssignment } from './templates/project-assignment';
import { RiskAssignment } from './templates/risk-assignment';

const resend = new Resend(env.resendApiKey);

export async function sendInviteEmail(email: string, companyName: string) {
  const { error } = await resend.emails.send({
    from: 'NAOMA Risk <it@naoma.dk>',
    to: [email],
    subject: 'Invitation til NAOMA Risk',
    react: <InviteEmail companyName={companyName} email={email} />,
  });

  if (error) {
    return console.error({ error });
  }
}

export async function sendProjectAssignmentEmail({
  emails,
  project,
  link,
}: {
  emails: string[];
  project: string;
  link: string;
}) {
  const { error } = await resend.batch.send(
    emails.map((email) => ({
      from: 'NAOMA Risk <it@naoma.dk>',
      to: [email],
      subject: 'Nyt projekt tildelt til dig',
      react: <ProjectAssignment project={project} link={link} />,
    })),
  );

  if (error) {
    return console.error({ error });
  }
}

export async function sendRiskAssignmentEmail({
  email,
  risk,
  link,
}: {
  email: string;
  risk: string;
  link: string;
}) {
  const { error } = await resend.emails.send({
    from: 'NAOMA Risk <it@naoma.dk>',
    to: [email],
    subject: 'Nyt risiko tildelt til dig',
    react: <RiskAssignment risk={risk} link={link} />,
  });

  if (error) {
    return console.error({ error });
  }
}
