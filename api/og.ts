import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || '';
  const origin = req.headers.host ? `https://${req.headers.host}` : '';
  const userAgent = req.headers['user-agent'] || '';
  
  // Check if this is a crawler (Facebook, Twitter, LinkedIn, etc.)
  const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|SkypeUriPreview|Applebot|Googlebot|Bingbot|facebook|twitter|linkedin/i.test(userAgent);
  
  // Only handle for crawlers - regular users should go to React app
  if (!isCrawler) {
    // Return 404 to let Vite/React app handle it
    return res.status(404).end();
  }
  
  // Check if this is a tour page
  const tourMatch = url.match(/\/tour\/([^/?]+)/);
  
  if (!tourMatch) {
    // Not a tour page, return 404
    return res.status(404).end();
  }
  
  const slug = tourMatch[1];
  
  // Check if it's the desert tour (id: '15' or slug contains 'black' and 'white' and 'desert')
  const slugLower = slug.toLowerCase();
  const isDesertTour = slug === '15' || 
                       (slugLower.includes('black') && slugLower.includes('white') && slugLower.includes('desert')) ||
                       slugLower === 'black-white-desert' ||
                       slugLower === 'black-and-white-desert';
  
  if (isDesertTour) {
    // Return HTML with desert image for crawlers
    const ogImage = `${origin}/black-white-desert.jpeg`;
    const title = 'Black & White Desert | Golden Tours';
    const description = 'Join Golden Tours for an endless adventure – experience the magical contrast of the Black & White Desert, where striking landscapes meet unforgettable desert wonders.';
    
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
  
  // For other tours, return default HTML for crawlers
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
