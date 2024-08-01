import { Button } from '@components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
}

export function Backbutton({ href }: BackButtonProps) {
  return (
    <div className="py- justify-center">
      <Link href={href}>
        <Button variant="secondary">Tilbage</Button>
      </Link>
    </div>
  );
}
