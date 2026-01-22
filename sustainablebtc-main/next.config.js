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
            source: '/(.*)', // Apply to all routes
            headers: [
               { key: 'X-Frame-Options', value: 'DENY' },
               { key: 'Content-Security-Policy', value: "frame-ancestors 'none';" }
            ],
         },
      ];
   },
}

module.exports = nextConfig
