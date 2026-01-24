import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || req.query.url as string || '';
  const origin = req.headers.host ? `https://${req.headers.host}` : '';
  const userAgent = req.headers['user-agent'] || '';
  
  // If this is not a tour page, return 404 to let Vite handle it
  if (!url.match(/\/tour\//)) {
    return res.status(404).end();
  }
  
  // Check if this is a crawler (Facebook, Twitter, LinkedIn, etc.)
  const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|SkypeUriPreview|Applebot|Googlebot|Bingbot|facebook|twitter|linkedin/i.test(userAgent);
  
  // Get slug from URL or query
  let slug = '';
  const tourMatch = url.match(/\/tour\/([^/?]+)/);
  if (tourMatch) {
    slug = tourMatch[1];
  } else if (req.query.slug) {
    slug = req.query.slug as string;
  }
  
  // Check if it's the desert tour (id: '15' or slug contains 'black' and 'white' and 'desert')
  const slugLower = slug.toLowerCase();
  const isDesertTour = slug === '15' || 
                       (slugLower.includes('black') && slugLower.includes('white') && slugLower.includes('desert')) ||
                       slugLower === 'black-white-desert' ||
                       slugLower === 'black-and-white-desert';
  
  // Debug logging (remove in production)
  console.log('URL:', url);
  console.log('Slug:', slug);
  console.log('User Agent:', userAgent);
  console.log('Is Crawler:', isCrawler);
  console.log('Is Desert Tour:', isDesertTour);
  
  // If it's a crawler and desert tour, return custom HTML with desert image
  if (isCrawler && isDesertTour) {
    const ogImage = `${origin}/black-white-desert.jpeg`;
    const title = 'Black & White Desert | Golden Tours';
    const description = 'Join Golden Tours for an endless adventure – experience the magical contrast of the Black & White Desert, where striking landscapes meet unforgettable desert wonders.';
    
    // Return HTML with correct meta tags for crawlers
    const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${origin}${url}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="${title}" />
  <meta property="twitter:description" content="${description}" />
  <meta property="twitter:image" content="${ogImage}" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
    
    return res.status(200).setHeader('Content-Type', 'text/html').send(html);
  }
  
  // For regular users, we need to let React app handle it
  // But since we're using rewrite, we need to return HTML that will load React app
  // For crawlers on other tours, return default meta tags
  if (isCrawler) {
    // For crawlers on other tours, return default HTML
    const defaultHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GOLDEN TOURS Tourism Website</title>
  <meta name="description" content="Discover Egypt's iconic destinations with our curated tours. From pyramids to temples, book your adventure today!" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="GOLDEN TOURS Tourism Website" />
  <meta property="og:description" content="Discover Egypt's iconic destinations with our curated tours. From pyramids to temples, book your adventure today!" />
  <meta property="og:image" content="${origin}/og-image.jpeg" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="GOLDEN TOURS Tourism Website" />
  <meta property="twitter:description" content="Discover Egypt's iconic destinations with our curated tours. From pyramids to temples, book your adventure today!" />
  <meta property="twitter:image" content="${origin}/og-image.jpeg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
    return res.status(200).setHeader('Content-Type', 'text/html').send(defaultHtml);
  }
  
  // For regular users on tour pages, we need to redirect to let React app handle it
  // But since we're using rewrite, we need to return the same HTML structure
  // The issue is that /src/main.tsx requests might also go through this function
  // So we need to check if the request is for a static file
  if (url.includes('/src/') || url.includes('/assets/') || url.includes('/node_modules/')) {
    // This is a static file request, return 404 to let Vite handle it
    return res.status(404).end();
  }
  
  // For regular users on tour pages, return HTML that will load React app
  const reactHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GOLDEN TOURS Tourism Website</title>
  <meta name="title" content="GOLDEN TOURS Tourism Website" />
  <meta name="description" content="Discover Egypt's iconic destinations with our curated tours. From pyramids to temples, book your adventure today!" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="GOLDEN TOURS Tourism Website" />
  <meta property="og:description" content="Discover Egypt's iconic destinations with our curated tours. From pyramids to temples, book your adventure today!" />
  <meta property="og:image" content="${origin}/og-image.jpeg" />
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:title" content="GOLDEN TOURS Tourism Website" />
  <meta property="twitter:description" content="Discover Egypt's iconic destinations with our curated tours. From pyramids to temples, book your adventure today!" />
  <meta property="twitter:image" content="${origin}/og-image.jpeg" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
  
  return res.status(200).setHeader('Content-Type', 'text/html').send(reactHtml);
}
