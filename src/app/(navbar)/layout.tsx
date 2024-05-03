import { Nav } from '@components/ui/Nav';

export default async function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
