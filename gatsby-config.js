const dotenv = require('dotenv');
const {webFontsConfig} = require('@trevorblades/mui-theme');

dotenv.config();

module.exports = {
  siteMetadata: {
    title: 'Superteam',
    description:
      "Build a team of current and future CS:GO superstars and earn points based on your team's weekly performance."
  },
  plugins: [
    {
      resolve: 'gatsby-theme-material-ui',
      options: {webFontsConfig}
    },
    'gatsby-theme-apollo',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-svgr',
    'gatsby-plugin-lodash',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'markdown-pages'
      }
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-markdown-pages',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-136591171-1',
        anonymize: true
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Countries',
        fieldName: 'countries',
        url: 'https://countries.trevorblades.com'
      }
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Superteam',
        fieldName: 'superteam',
        url: `${process.env.GATSBY_API_URL}/graphql`
      }
    },
    {
      resolve: 'gatsby-plugin-create-client-paths',
      options: {
        prefixes: ['/teams/*', '/edit/*']
      }
    }
  ]
};
