import { type Metadata } from 'next';
import Account from './Account';

export const metadata: Metadata = {
  title: 'Brugerinstillinger',
};

export default function Page() {
  return <Account />;
}
