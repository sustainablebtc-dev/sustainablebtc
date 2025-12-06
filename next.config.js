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

   // Webpack configuration to handle Qdrant and undici packages
   webpack: (config, { isServer }) => {
      if (!isServer) {
         // Exclude Node.js modules from client bundle
         config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
         };
      }

      // Exclude undici from webpack processing (it uses private class fields)
      config.externals = config.externals || [];
      config.externals.push({
         'undici': 'commonjs undici',
      });

      return config;
   },

   // Server Components configuration
   experimental: {
      serverComponentsExternalPackages: ['@qdrant/js-client-rest', 'undici'],
   },
}

module.exports = nextConfig
