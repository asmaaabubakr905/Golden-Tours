import type { Metadata } from 'next';
import { getTourBySlug } from '@/data/tours';
import { getImageUrl } from '@/utils/imageUtils';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = getTourBySlug(params.slug);

  if (!tour) {
    return {
      title: 'Tour Not Found | Golden Tours',
      description: 'The tour you are looking for does not exist.',
    };
  }

  // Get the tour image URL (handles both StaticImageData and string URLs)
  const tourImageUrl = getImageUrl(tour.image);
  
  // Construct absolute URL for OG image (required for proper social sharing)
  // In production, this should be your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://goldenphoenixtravel.com');
  
  // Convert relative URL to absolute URL for OG tags
  // Webpack-processed images start with /_next/static/... which works fine with absolute URLs
  // Public folder images start with / which also works fine
  let ogImageUrl: string;
  
  if (tourImageUrl.startsWith('http')) {
    // Already an absolute URL
    ogImageUrl = tourImageUrl;
  } else if (tourImageUrl.startsWith('/')) {
    // Relative URL - make it absolute
    ogImageUrl = `${baseUrl}${tourImageUrl}`;
  } else {
    // Fallback: use default OG image if image URL is invalid
    ogImageUrl = `${baseUrl}/og-image.jpeg`;
  }

  // Construct the page URL
  const pageUrl = `${baseUrl}/tour/${params.slug}`;

  return {
    title: `${tour.title} | Golden Tours`,
    description: tour.description,
    openGraph: {
      title: tour.title,
      description: tour.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tour.title,
        },
      ],
      type: 'website',
      url: pageUrl,
      siteName: 'Golden Tours',
    },
    twitter: {
      card: 'summary_large_image',
      title: tour.title,
      description: tour.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default function TourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
