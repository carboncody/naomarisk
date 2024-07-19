import Link from 'next/link';
import { Button } from '@components/ui/button';

interface BackButtonProps {
  href: string;
}

export function Backbutton({ href }: BackButtonProps) {
  return (
    <div className="justify-center py-4">
      <Link href={href}>
        <Button variant="secondary">Tilbage</Button>
      </Link>
    </div>
  );
}
