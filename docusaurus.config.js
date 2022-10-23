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
  tagline: "A resource for learning SML",
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
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: github,
        },
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
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Tutorial",
          },
          {
            href: github,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} The SML Help Authors.`,
      },
      prism: {
        theme,
        darkTheme,
        additionalLanguages: ["sml", "vim"],
      },
    }),
};

module.exports = config;
