import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || '';
  const origin = req.headers.host ? `https://${req.headers.host}` : '';
  const userAgent = req.headers['user-agent'] || '';
  
  // Check if this is a crawler (Facebook, Twitter, LinkedIn, etc.)
  const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|SkypeUriPreview|Applebot|Googlebot|Bingbot/i.test(userAgent);
  
  // Check if this is a tour page
  const tourMatch = url.match(/\/tour\/([^/?]+)/);
  
  if (tourMatch) {
    const slug = tourMatch[1];
    
    // Check if it's the desert tour (id: '15' or slug contains 'black-white-desert')
    const isDesertTour = slug === '15' || 
                         slug.toLowerCase().includes('black-white-desert') ||
                         slug.toLowerCase().includes('black-and-white-desert');
    
    // If it's a crawler and desert tour, return custom HTML
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
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImage}" />
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
  }
  
  // For regular users or other routes, return default HTML (React app will handle it)
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
