import { type Metadata } from 'next';
import { Farelog } from '.';

export const metadata: Metadata = {
  title: 'Farelog',
};

export default function Page() {
  return <Farelog />;
}
