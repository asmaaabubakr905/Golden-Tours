import type { Metadata } from 'next';
import '../src/index.css';
import '../src/swiper-custom.css';
import 'swiper/css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'GOLDEN TOURS Tourism Website',
  description: 'Discover Egypt\'s iconic destinations with our curated tours. From pyramids to temples, book your adventure today!',
  openGraph: {
    title: 'GOLDEN TOURS Tourism Website',
    description: 'Discover Egypt\'s iconic destinations with our curated tours. From pyramids to temples, book your adventure today!',
    images: ['/og-image.jpeg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GOLDEN TOURS Tourism Website',
    description: 'Discover Egypt\'s iconic destinations with our curated tours. From pyramids to temples, book your adventure today!',
    images: ['/og-image.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <ScrollToTop />
        <Header />
        <main className="pb-20 lg:pb-0">
          {children}
        </main>
        <BottomNav />
        <Footer />
      </body>
    </html>
  );
}
