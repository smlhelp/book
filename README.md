# SML Help

Thanks for checking out SML Help!

This website is built using [Docusaurus](https://docusaurus.io), a modern static website generator.

## Installation

Clone the repo, then:

```sh
$ npm install
```

## Local Development

```sh
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Contributing

0. Checkout to a new branch based on master
1. Decide what kind of resource you'd like to create, and check out what already exists
   - "Getting Started" written tutorial (look in `docs/start`)
   - Specification of a type or structure (`docs/types`)
   - Debugging Guide (`docs/debugging`)
   - Conceptual Notes (`docs/concepts`)
   - Worked example, video or written (`docs/examples/written`)
   - Something else (talk to Jacob if your idea doesn't fit these categories)
2. If a page already exists (probably at `docs/foo/bar.md`, for some `foo` and `bar`) where you can add your content, add it there. Make sure to update the author attribution:
   - If you fixed typos and made minor edits, add "_Revised &lt;current month&gt;_" to attribution
   - If you wrote a new section or performed significant rewrites, add "_Rewritten by &lt;your name&gt;, &lt;current month&gt;_"
3. If no such page exists:
   - Create the file in the appropriate `docs/foo` directory. Give it a short, descriptive, lowercase-alphabetical name, like `minimax.md`
   - Write your content (in markdown) to the file
   - Write "_By &lt;your name&gt;, &lt;current month&gt;_" (with a line break afterwards) beneath the page title
4. Add, commit, push, and pull-request your changes.
5. If your changes get approved and merged, add a separate pull request to add yourself to the list of contributors on the "About" page (if you're not on it).
