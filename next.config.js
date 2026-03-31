const path = require('path');

const nextConfig = {
   sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
      prependData: `@import "imports.scss";`,
   },
   images: {
      domains: ['cdn.sanity.io', 'lcw.nyc3.cdn.digitaloceanspaces.com']
   },

   // Clickjacking headers are handled in middleware.ts
}

module.exports = nextConfig
