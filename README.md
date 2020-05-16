# smlhelp.github.io

Thanks for checking out `smlhelp.github.io`! 

## How to contribute

0. Clone the repo to your local machine (or pull), and checkout to a new branch based on master
1. Decide what kind of resource you'd like to create, and check out what already exists
    - "Getting Started" written tutorial (look in `src/start`)
    - Specification of a type or structure (`src/types`)
    - Debugging Guide (`src/debugging`)
    - Conceptual Notes (`srcj/concepts`)
    - Worked example, video or written (`src/examples/written`)
    - Something else (talk to Jacob if your idea doesn't fit these categories)
2. If a page already exists (probably at `src/MMMMMM/NNNNNN.md`, for some `MMMMMM` and `NNNNNN`) where you can add your content, add it there
3. If no such page exists:
    - Create the file in the appropriate `src/MMMMMM` directory. Give it a short, descriptive, lowercase-alphabetical name, like `minimax.md`
    - Write your content (in markdown) to the file
    - Open up `src/SUMMARY.md` and add a link to your content (follow the format of the other links). The url should be `MMMMMM/NNNNNN.md`, where your new file is located at `src/MMMMMM/NNNNNN.md`
4. Add, commit, push, and pull-request your changes.
5. If your changes get approved and merged, add a separate pull request to add yourself to the list of contributors on the "About" page (if you're not on it).

I'm hoping to automate or streamline some of these processes (so check back here occasionally). 
Also, if you have feedback on the design of the website (technical or aesthetic), I'm happy to hear; 
also let me know if you can think of any possible changes.

### Gotchas and tips

- Math mode dollar signs are not currently supported. Use `\(`+`\)` or `\[`+`\]` instead.
- You can preview your book by installing mdbook, then running `mdbook serve` and going to the specified localhost in your browser.

## Technical stuff

The website is built using the [mdbook](https://rust-lang.github.io/mdBook/) static site builder, which is written in Rust. Talk to Cam if you are interested in contributing to the backend.

