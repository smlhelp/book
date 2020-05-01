# smlhelp.github.io

Thanks for checking out `smlhelp.github.io`! 

## How to contribute

0. Clone the repo to your local machine (or pull), and checkout to a new branch based on master
1. Decide what kind of resource you'd like to create, and check out what already exists
    - "Getting Started" written tutorial (look in `start/resources`)
    - Specification of a type or structure (`types/resources`)
    - Debugging Guide (`debugging/resources`)
    - Conceptual Notes (`concepts/resources`)
    - Worked example, video or written (`examples/written`)
    - Something else (talk to Jacob if your idea doesn't fit these categories)
2. If a page already exists (probably at `MMMMMM/resources/NNNNNN.md`, for some `MMMMMM` and `NNNNNN`) where you can add your content, add it there
3. If no such page exists:
    - Create the file in the appropriate `MMMMMM/resources` directory. Give it a short, descriptive, lowercase-alphabetical name, like `minimax.md`
    - Write your content (in markdown) to the file
    - Open up `nav.html` (at top level) and add a link to your content (follow the format of the other links). The url should be of the form `https://smlhelp.github.io/MMMMMM?view=NNNNNN`, where `MMMMMM` is the resource directory it's in (e.g. `concepts`) and `NNNNNN` is the name you gave it (don't include the "`.md`").
    - Open up the corresponding directory index page (`MMMMMM/index.html`) and add a link to it somewhere in the `<main>` HTML tag (which probably starts somewhere around line 80). Copy the format of the other links.
4. Add, commit, push, and pull-request your changes.
5. If your changes get approved and merged, add a separate pull request to add yourself to the list of contributors on the "About" page (if you're not on it).

I'm hoping to automate or streamline some of these processes (so check back here occasionally). 
Also, if you have feedback on the design of the website (technical or aesthetic), I'm happy to hear; 
also let me know if you can think of any possible changes.
