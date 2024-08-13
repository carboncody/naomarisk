import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export function InviteEmail({
  companyName,
  email,
}: {
  companyName: string;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Text className="text-center text-[24px] font-normal text-black">
                NAOMA RISK
              </Text>
            </Section>
            <Heading className="mx-0 my-[15px] p-0 text-center text-[24px] font-normal text-black">
              Invitationen til {companyName}
            </Heading>
            <Text className="text-center text-[12px] leading-[24px] text-[#666666]">
              For at acceptere invitationen og begynde at bruge værktøjet, skal
              du blot klikke på følgende link og oprette et konto med {email}:
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={'https://naomarisk.vercel.app'}
              >
                Join
              </Button>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
