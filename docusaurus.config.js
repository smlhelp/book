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
  organizationName: "smlhelp",
  projectName: "book",
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
