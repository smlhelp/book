// @ts-check

const theme = require("prism-react-renderer/themes/github");
const darkTheme = require("prism-react-renderer/themes/dracula");

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
};

module.exports = config;
