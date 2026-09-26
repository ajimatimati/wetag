/**
 * weTag (iTag) Automated SEO & GEO Meta Tags & Schema.org Injector
 * Enriches all static web distribution pages with high-ranking metadata.
 */

import fs from 'fs';
import path from 'path';

interface PageMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  keywords: string;
  heading: string;
}

const PAGES_CONFIG: Record<string, PageMetadata> = {
  'index.html': {
    title: 'weTag (iTag) — Campus & Commuter Carpool + Scam-Proof Housing Network | Ibadan, Nigeria',
    description:
      'weTag (iTag) is Ibadan’s trusted local-life network. Share daily commutes along Akobo, UI Agbowo, Bodija, Dugbe, and Secretariat corridors with 4-digit safety PINs, and find direct-landlord housing with zero hidden agent fees.',
    canonicalPath: '',
    keywords:
      'weTag, iTag, Ibadan carpool, student rideshare UI Ibadan, Bodija carpooling, Oyo State Secretariat ride, Akobo Dugbe commute, cheap rides Ibadan, scam-free apartments Ibadan, direct landlord Bodija, Agbowo student hostels, Oyo 615 emergency rideshare, paystack transport wallet',
    heading: 'Move Better. Find Your Place in Ibadan.',
  },
  'move.html': {
    title: 'weTag MOVE — Smart Corridor Carpooling in Ibadan (Akobo, UI, Bodija, Dugbe)',
    description:
      'Split fuel costs on daily Ibadan commutes. Verified drivers, 4-digit pickup PIN verification, real-time GPS telemetry anomaly protection, and Oyo State 615 Emergency integration.',
    canonicalPath: 'move',
    keywords:
      'weTag move, iTag move, Ibadan carpool app, carpool UI to Dugbe, Akobo to Secretariat rideshare, Bodija carpooling, safe taxi alternative Ibadan, fuel offset Nigeria, student hitching app',
    heading: 'Smart Corridor Carpooling for Ibadan Commuters.',
  },
  'stay.html': {
    title: 'weTag STAY — Scam-Proof Direct Landlord Housing & Student Hostels | Ibadan',
    description:
      'Rent verified apartments in Bodija, Akobo, Agbowo, and Ring Road with transparent Real Move-In Totals. Zero extortionate agent packages, pHash duplicate scam detection, and household ledger splitting.',
    canonicalPath: 'stay',
    keywords:
      'weTag stay, iTag stay, Ibadan apartments for rent, Bodija direct landlord, UI Agbowo student hostel, self contain Ibadan, no agent fee house rent, scam-free accommodation Oyo State',
    heading: 'Verified Direct-Landlord Housing in Ibadan.',
  },
  'messages.html': {
    title: 'weTag Messages — Secure In-App Communication for Carpools & Rentals',
    description:
      'Coordinate rides and property viewings directly on weTag without sharing personal phone numbers. Secure, authenticated, and monitored for safety.',
    canonicalPath: 'messages',
    keywords: 'weTag messages, secure rideshare chat, verified landlord communication Ibadan',
    heading: 'Encrypted In-App Communications.',
  },
  'profile.html': {
    title: 'weTag Profile & Universal Wallet — Paystack NGN Ledger & Smile ID KYC',
    description:
      'Manage your verified Smile ID credentials (NIN & Driver’s License), track double-entry wallet balances, and manage instant Paystack payouts to Nigerian bank accounts.',
    canonicalPath: 'profile',
    keywords: 'weTag wallet, paystack transport wallet, smile id kyc ibadan, driver verification nigeria',
    heading: 'Universal Wallet & Verified Digital Identity.',
  },
};

const COMMON_GEO_TAGS = `
    <!-- GEO & Local Discovery Optimization (Ibadan, Nigeria) -->
    <meta name="geo.region" content="NG-OY" />
    <meta name="geo.placename" content="Ibadan, Oyo State, Nigeria" />
    <meta name="geo.position" content="7.3775;3.9470" />
    <meta name="ICBM" content="7.3775, 3.9470" />
    <meta name="geo.coverage" content="Ibadan, Oyo State, Nigeria (UI, Bodija, Akobo, Dugbe, Agodi Secretariat, Ring Road, Challenge, Monatan, Ojoo)" />
`;

const STRUCTURED_JSON_LD = `
    <!-- Schema.org JSON-LD Microdata -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://wetag.ng/#website",
          "url": "https://wetag.ng",
          "name": "weTag (iTag) Local Life Network",
          "description": "Decentralized commuter carpooling and scam-free verified housing discovery in Ibadan, Nigeria.",
          "inLanguage": "en-NG"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://wetag.ng/#app",
          "name": "weTag (iTag)",
          "operatingSystem": "iOS, Android, Web",
          "applicationCategory": "TravelApplication, RealEstateApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "NGN"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "128"
          }
        },
        {
          "@type": "TransportationService",
          "@id": "https://wetag.ng/#move-service",
          "name": "weTag MOVE",
          "serviceType": "Corridor Carpooling & Ridesharing",
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Ibadan, Oyo State, Nigeria"
          },
          "provider": {
            "@type": "Organization",
            "name": "weTag Technologies"
          },
          "termsOfService": "https://wetag.ng/terms"
        },
        {
          "@type": "AccommodationService",
          "@id": "https://wetag.ng/#stay-service",
          "name": "weTag STAY",
          "serviceType": "Scam-Proof Verified Direct-Landlord Housing Discovery",
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Ibadan, Oyo State, Nigeria"
          }
        }
      ]
    }
    </script>
`;

export function injectSeoGeo(distDir: string) {
  console.log(`🔍 Injecting SEO & GEO metadata into static web pages at ${distDir}...`);

  for (const [filename, meta] of Object.entries(PAGES_CONFIG)) {
    const filePath = path.join(distDir, filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ File not found: ${filePath}`);
      continue;
    }

    let html = fs.readFileSync(filePath, 'utf-8');

    // Replace or set title
    const titleTag = `<title>${meta.title}</title>`;
    if (html.includes('<title data-rh="true"></title>')) {
      html = html.replace('<title data-rh="true"></title>', titleTag);
    } else if (html.includes('<title>')) {
      html = html.replace(/<title>.*?<\/title>/, titleTag);
    }

    const canonicalUrl = `https://wetag.ng${meta.canonicalPath ? '/' + meta.canonicalPath : ''}`;

    const enrichedMetaTags = `
    <!-- Primary SEO Meta Tags -->
    <meta name="title" content="${meta.title}" />
    <meta name="description" content="${meta.description}" />
    <meta name="keywords" content="${meta.keywords}" />
    <meta name="author" content="weTag Technologies" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="canonical" href="${canonicalUrl}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${meta.title}" />
    <meta property="og:description" content="${meta.description}" />
    <meta property="og:image" content="https://wetag.ng/assets/og-preview.png" />
    <meta property="og:site_name" content="weTag (iTag) Network" />
    <meta property="og:locale" content="en_NG" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${canonicalUrl}" />
    <meta name="twitter:title" content="${meta.title}" />
    <meta name="twitter:description" content="${meta.description}" />
    <meta name="twitter:image" content="https://wetag.ng/assets/twitter-card.png" />
    ${COMMON_GEO_TAGS}
    ${STRUCTURED_JSON_LD}
`;

    // Clean up any previously injected SEO/GEO tags to avoid duplicates
    html = html.replace(/<!-- WETAG_METADATA_START -->[\s\S]*?<!-- WETAG_METADATA_END -->/g, '');
    html = html.replace(/<!-- Primary SEO Meta Tags -->[\s\S]*?<\/script>\s*/g, '');

    const wrappedMetaTags = `
    <!-- WETAG_METADATA_START -->
    ${enrichedMetaTags.trim()}
    <!-- WETAG_METADATA_END -->
`;

    // Inject right after <head> or viewport
    if (html.includes('shrink-to-fit=no"/>')) {
      html = html.replace('shrink-to-fit=no"/>', `shrink-to-fit=no"/>\n${wrappedMetaTags}`);
    } else {
      html = html.replace('<head>', `<head>\n${wrappedMetaTags}`);
    }

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`✅ Injected SEO/GEO tags into: ${filename}`);
  }

  // Generate sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:geo="http://www.google.com/geo/schemas/sitemap/1.0">
  <url>
    <loc>https://wetag.ng/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://wetag.ng/move</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://wetag.ng/stay</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://wetag.ng/messages</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://wetag.ng/profile</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://wetag.ng/waitlist</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`✅ Generated: sitemap.xml`);

  // Generate robots.txt
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://wetag.ng/sitemap.xml
Host: https://wetag.ng
`;
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log(`✅ Generated: robots.txt`);
}

let distDir = path.resolve(process.cwd(), 'apps/mobile/dist');
if (!fs.existsSync(distDir)) {
  try {
    const { fileURLToPath } = await import('url');
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    distDir = path.resolve(dirname, '../apps/mobile/dist');
  } catch {
    // fallback
  }
}
const targetDist = process.env.DIST_DIR || distDir;
injectSeoGeo(targetDist);

