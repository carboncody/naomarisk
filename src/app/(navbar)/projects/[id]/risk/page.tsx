'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Risk() {
  const pathname = usePathname();
  const router = useRouter();

  router.push(pathname.replace('/risks', ''));

  return null;
}
