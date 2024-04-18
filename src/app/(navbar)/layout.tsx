import { Nav } from '@components/Nav';

export default function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
