import { Button } from '@nextui-org/react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
}

export function Backbutton({ href }: BackButtonProps) {
  return (
    <div className="justify-center py-4">
      <Link href={href}>
        <Button>Tilbage</Button>
      </Link>
    </div>
  );
}
