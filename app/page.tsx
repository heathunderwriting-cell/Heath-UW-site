import type { Metadata } from 'next';
import HomeClient from '@/components/HomeClient';

export const metadata: Metadata = {
  title: 'Heath Underwriting — AI-Native MGA',
  description:
    'Heath is the leading AI underwriting platform — a modern MGA specialising in specialty reinsurance.',
};

export default function Home() {
  return <HomeClient />;
}
