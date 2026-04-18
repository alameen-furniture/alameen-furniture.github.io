// Post-build pre-renderer for GitHub Pages SEO.
// Creates real /privacy-policy/index.html and /terms/index.html files
// that return HTTP 200 with full content baked in. The React SPA still
// hydrates and takes over after load.

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

const indexHtml = readFileSync(join(distDir, "index.html"), "utf8");

const SITE = "https://alameenfurniture.in";

const pages = [
  {
    path: "privacy-policy",
    canonicalPath: "privacy-policy/",
    title: "Privacy Policy | Al Ameen Furniture",
    description:
      "Read how Al Ameen Furniture collects, uses, and protects your personal information when you submit enquiries on our website.",
    h1: "Privacy Policy",
    body: `
      <p class="muted">Last updated: April 2026</p>

      <section>
        <h2>1. Information We Collect</h2>
        <p>When you submit an enquiry through our website, we collect your name, phone number, email address (optional), furniture requirements, and any reference images you upload. We also collect basic usage data through Google Analytics (page views, device type, location).</p>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>Your personal information is used solely to respond to your furniture enquiries, provide quotes, and communicate about your orders. We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
      </section>

      <section>
        <h2>3. Data Storage &amp; Security</h2>
        <p>Your enquiry data is stored securely in our cloud database with encryption at rest and in transit. Reference images are stored in secure cloud storage. We implement industry-standard security measures including Row Level Security policies to protect your data.</p>
      </section>

      <section>
        <h2>4. Cookies &amp; Analytics</h2>
        <p>We use Google Analytics to understand how visitors interact with our website. This helps us improve our services. Google Analytics uses cookies to collect anonymized usage data. You can opt out by disabling cookies in your browser settings.</p>
      </section>

      <section>
        <h2>5. Third-Party Services</h2>
        <p>We use WhatsApp for customer communication, Google Maps for location display, and EmailJS for email notifications. These services have their own privacy policies governing data they process.</p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>You may request access to, correction, or deletion of your personal data at any time by contacting us at akbarkhan891071@gmail.com or calling +91 89107 24040.</p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>Al Ameen Furniture<br/>36, 4/3 Behari Mondal Road, Shanti Pally, Ramlal Bazar, Haltu<br/>Kolkata, West Bengal 700078<br/>Phone: +91 89107 24040<br/>Email: akbarkhan891071@gmail.com</p>
      </section>
    `,
  },
  {
    path: "terms",
    canonicalPath: "terms/",
    title: "Terms & Conditions | Al Ameen Furniture",
    description:
      "Terms and conditions for ordering custom furniture from Al Ameen Furniture in Kolkata — pricing, production, delivery, warranty, and cancellations.",
    h1: "Terms & Conditions",
    body: `
      <p class="muted">Last updated: April 2026</p>

      <section>
        <h2>1. Services</h2>
        <p>Al Ameen Furniture provides custom furniture manufacturing, design consultation, delivery, and installation services in Kolkata and surrounding areas. All furniture is handcrafted to order based on your specifications.</p>
      </section>

      <section>
        <h2>2. Orders &amp; Pricing</h2>
        <p>Prices quoted are estimates based on design, materials, and dimensions. Final pricing is confirmed after detailed consultation. A 50% advance payment is required to begin production. Balance payment is due before delivery.</p>
      </section>

      <section>
        <h2>3. Production &amp; Delivery</h2>
        <p>Standard production takes 2–4 weeks for individual pieces and 4–8 weeks for complete interiors. Delivery within Kolkata is free. We provide professional installation at no extra charge. Delivery timelines are estimates and may vary based on complexity and material availability.</p>
      </section>

      <section>
        <h2>4. Quality &amp; Warranty</h2>
        <p>We use premium materials and provide a quality guarantee on all craftsmanship. Any manufacturing defects reported within 30 days of delivery will be repaired or replaced at no cost. Normal wear and tear is not covered.</p>
      </section>

      <section>
        <h2>5. Cancellations &amp; Refunds</h2>
        <p>Orders may be cancelled within 48 hours of confirmation for a full refund. After production begins, cancellation charges of up to 30% may apply depending on progress. Custom-made items cannot be returned unless defective.</p>
      </section>

      <section>
        <h2>6. Website Usage</h2>
        <p>The content, images, and design of this website are the property of Al Ameen Furniture. Unauthorized reproduction or distribution is prohibited. Portfolio images represent our work and actual results may vary based on materials and specifications chosen.</p>
      </section>

      <section>
        <h2>7. Contact</h2>
        <p>For questions about these terms, contact us at:<br/>Phone: +91 89107 24040<br/>Email: akbarkhan891071@gmail.com<br/>Address: 36, 4/3 Behari Mondal Road, Haltu, Kolkata 700078</p>
      </section>
    `,
  },
];

// Inline SEO-friendly fallback styles so crawlers see styled, readable content
// even before the JS bundle loads. The React app fully replaces this on hydrate.
const fallbackStyles = `
  <style id="prerender-fallback-styles">
    .prerender-shell{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#0a0a0a;color:#f5f5f5;min-height:100vh;padding:48px 24px;}
    .prerender-shell .container{max-width:768px;margin:0 auto;}
    .prerender-shell a.back{color:#d4af37;text-decoration:none;font-size:14px;}
    .prerender-shell h1{font-family:'Playfair Display',Georgia,serif;font-size:32px;margin:24px 0;}
    .prerender-shell h2{font-family:'Playfair Display',Georgia,serif;font-size:20px;margin-top:32px;margin-bottom:8px;color:#f5f5f5;}
    .prerender-shell p{color:#a3a3a3;line-height:1.7;margin:8px 0;}
    .prerender-shell .muted{color:#737373;font-size:13px;}
    .prerender-shell section{margin-top:24px;}
  </style>
`;

function buildPage({ path, canonicalPath = path, title, description, h1, body }) {
  const url = `${SITE}/${canonicalPath}`;

  let html = indexHtml;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,
    `<meta name="description" content="${description}" />`
  );

  // Replace canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?\s*>/,
    `<link rel="canonical" href="${url}" />`
  );

  // Replace og:title / og:url / og:description / twitter equivalents
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?\s*>/g,
    `<meta property="og:title" content="${title}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?\s*>/g,
    `<meta name="twitter:title" content="${title}">`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?\s*>/g,
    `<meta property="og:url" content="${url}">`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?\s*>/g,
    `<meta property="og:description" content="${description}">`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?\s*>/g,
    `<meta name="twitter:description" content="${description}">`
  );

  // Inject fallback styles before </head>
  html = html.replace("</head>", `${fallbackStyles}</head>`);

  // Bake content inside #root so crawlers see it. React hydrates over it.
  const baked = `
    <div class="prerender-shell">
      <div class="container">
        <a href="/" class="back">← Back to Home</a>
        <h1>${h1}</h1>
        ${body}
      </div>
    </div>
  `;
  html = html.replace(
    /<div id="root"><\/div>/,
    `<div id="root">${baked}</div>`
  );

  return html;
}

for (const page of pages) {
  const outDir = join(distDir, page.path);
  mkdirSync(outDir, { recursive: true });
  const out = join(outDir, "index.html");
  writeFileSync(out, buildPage(page), "utf8");
  console.log(`✓ pre-rendered /${page.path}/index.html`);
}

console.log("Pre-render complete.");
