import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Egypt Tours & Experiences | Golden Tours',
  description: 'Embark on unforgettable journeys through Cairo, Alexandria, Luxor, and Aswan. Experience the wonders of pharaohs, temples, and timeless treasures.',
  openGraph: {
    title: 'Egypt Tours & Experiences | Golden Tours',
    description: 'Embark on unforgettable journeys through Cairo, Alexandria, Luxor, and Aswan. Experience the wonders of pharaohs, temples, and timeless treasures.',
    images: ['/og-image.jpeg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egypt Tours & Experiences | Golden Tours',
    description: 'Embark on unforgettable journeys through Cairo, Alexandria, Luxor, and Aswan. Experience the wonders of pharaohs, temples, and timeless treasures.',
    images: ['/og-image.jpeg'],
  },
};

export default function Home() {
  return <HomeClient />;
}
