---
sidebar_position: 2
---

# Multi-File Projects

_By Thea Brick, January 2023_

When working with larger projects, we need a way to effectively load various SML
files, sharing common libraries functions, etc. SML does not define a specific
method to do this, so multiple standards have arose. The SML/NJ compiler uses CM
(compilation manager) files and MLton uses MLB (ML basis) files. Both systems
are used and have unique pros and cons, so we will discuss them both. That being
said, each has their own associated documentation, so we will not go completely
in depth.

There is also a utility called [Molasses](https://github.com/T-Brick/molasses)
which can compile (most) SML programs using MLB files into SML programs using CM
files, allowing MLton programs to be ran in the SML/NJ REPL.


## MLB Files

See the official documentation [here](http://mlton.org/MLBasis).

MLB files allow for the sharing of expression-level declarations, infix
declarations, and structure-level declarations between SML files. It is a
sequence of files (SML and MLB) which are loaded sequentially.

MLB files referenced are all merged together to form a basis, and then the SML
files can build upon this basis to add additional bindings. For instance,
considering the following example file.

```sml
lib1.mlb
lib2.mlb
file1.sml
file2.sml
```

First `lib1.mlb` is loaded and is added to a basis. Then, `lib2.mlb` is loaded
and is also added to the basis. Importantly, declarations added by `lib1.mlb`
cannot be used in `lib2.mlb` (they are considered separate libraries). The
declarations in `lib2.mlb` potentially shadow the declarations in `lib1.mlb`.

Then, `file1.sml` is loaded using and expanding the basis. This means that
`file1.sml` can use all the declarations in the combined `lib1.mlb` and
`lib2.mlb`. Finally, `file2.sml` can use all the declarations defined in all the
priorly discussed files.

If we want to limit what signature, structures, and functors we can see, we do
so with a `local` expression (different from the SML version). For instance,
this example limits the imports from `mlb` files:

```sml
local
  lib1.mlb
  lib2.mlb
in
  structure A
  structure C = B (* example of renaming structure B *)
  functor F
end
file1.sml (* only structure A, C, and functor F are available *)
```

Conversely, we can limit exports of our MLB file by doing the same thing, but
for the SML files:

```sml
local
  file1.sml
  file2.sml
in
  structure C = B (* example of renaming structure B *)
  functor F
end (* only structure C and F may be used in importing files *)
```

### MLB Path Variables

These are simply variables defined at compile time that allow us to adjust how
and what files are loaded. They can also be used so that the exact path of a
file doesn't need to be known when writing the MLB file.

These are denoted as `$(PATH_VARIABLE)` in the MLB file. The most common path
variable you may see is `$(SML_LIB)`, which is by default the path for the
SML implementation. So you may see something along the lines of:

```sml
$(SML_LIB)/basis/basis.mlb
```

Which loads the Standard Basis Library. More libraries can be found
[here](http://mlton.org/MLBasisAvailableLibraries).


## CM Files

See the official documentation [here](https://www.smlnj.org/doc/CM/new.pdf).

CM files allow for _only_ the export of structure-level declarations between
files. It is defined by two different type of files. A library file and a
library component file (called a group). Importantly, a group may only be used
by one library which references it. It may be referenced by as many other
groups, so long as they all exist within the same library.

In general, the cabailities of CM files are very complex and there are tons of
interesting features which can be used. In other words, this is very brief
overview of CM files. So, read the documentation if you want to learn more.

A CM library file is structured as follows

```sml
Library
  signature A
  structure B
  functor F
is
  lib1.cm
  lib2.cm
  file1.sml
  file2.sml
```

Between the `Library` and `is` contain the declarations which are being exported
and may be used outside of the library. There must be at least one such
declaration. Below the `is` is a list of files used in the library. These files
do not need to be ordered.

A group is similar to a `library` but the `Library` keyword is replaced by
`Group`, and the export list can be left blank and will be infered from the
exports in the files.

### Anchors

These are variables which can appear in CM files. They are often used to give a
shorthand of common paths. They are denoted as `$ANCHOR_NAME` and they must
appear at the start of a file path.

You may see `$/basis.cm` which implements the Standard Basis Library. Likewise,
`$/smlnj-lib.cm` implement a variety of extensions provided by SML/NJ.
