// @ts-check

const theme = require("prism-react-renderer/themes/github");
const darkTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

const title = "SML Help";
const org = "smlhelp";
const repo = "book";
const github = `https://github.com/${org}/${repo}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title,
  tagline: "A resource for learning Standard ML",
  url: `https://${org}.github.io`,
  baseUrl: `/${repo}/`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  organizationName: org,
  projectName: repo,
  trailingSlash: true,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        docs: { remarkPlugins: [math], rehypePlugins: [katex] },
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-search-algolia'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title,
        items: [
          {
            href: github,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme,
        darkTheme,
        additionalLanguages: ["sml", "vim"],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'XNI9A5Z2CN',

        // Public API key: it is safe to commit it
        apiKey: '5b35780ea0596402725411ca0bf319b0',

        indexName: 'smlhelp',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/docs/', // or as RegExp: /\/docs\//
        //   to: '/',
        // },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
    }),
  // TODO figure out how to get the katex css without CDN (should already be
  // in node_modules)
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
};

module.exports = config;
