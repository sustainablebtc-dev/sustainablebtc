const path = require('path');

const nextConfig = {
   sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "imports.scss";`,
   },
   images: {
      domains: ['cdn.sanity.io', 'lcw.nyc3.cdn.digitaloceanspaces.com']
   },

   // Fix for click jacking vulnerability
   async headers() {
      return [
         {
            source: '/sbp-mica-whitepaper.pdf',
            headers: [
               { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
               { key: 'Content-Security-Policy', value: "frame-ancestors 'self';" }
            ],
         },
         {
            source: '/legal/mica-whitepaper',
            headers: [
               { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
               { key: 'Content-Security-Policy', value: "frame-ancestors 'self';" }
            ],
         },
         {
            source: '/((?!sbp-mica-whitepaper\\.pdf).*)', // Apply to all other routes except the PDF
            headers: [
               { key: 'X-Frame-Options', value: 'DENY' },
               { key: 'Content-Security-Policy', value: "frame-ancestors 'none';" }
            ],
         },
      ];
   },
}

module.exports = nextConfig
