module.exports = {
  trailingSlash: true,
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  compiler: {
    styledComponents: true,
  },
};
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  // Other Next.js configuration ...
});
