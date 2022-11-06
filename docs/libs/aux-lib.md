---
sidebar_position: 2
---

# Auxiliary Library

_By Jacob Neumann, June 2021_

This page collects the documentation of the [Auxiliary Library](https://github.com/smlhelp/aux-library). The purpose of this library & its documentation is to serve as sample code, proofs, and worked examples for students learning functional programming and/or SML for the first time. Accordingly, this documentation also includes explicit mathematical definitions, proofs by induction, asymptotic analyses, and evaluation traces, as appropriate.

Unless otherwise stated, the documentation assumes SMLNJ v110.99. Some features (e.g. modifications of the pretty printer) might not work in other versions of SMLNJ.

All the documents & code here should be considered "work-in-progress". If you spot an error in either, you can report it [here](https://forms.gle/yuyc17oBnT4JvG5h9).

## Trees

Provides polymorphic binary trees in a structure `Tree`, with a couple basic methods for working with them.

In particular, this includes the functions `inord` and `foldr`, which are used in the `OrdTreeSet` functor (see **Sets** below) and critical to the associated representation independence result.

[Code](https://raw.githubusercontent.com/smlhelp/aux-library/main/Tree.sml)

## Timing

The `Timing` module includes types for encoding years, months, days, times, time zones, etc., as well as numerous utilities for working with them. This module primarily serves as an extended example of how to use custom SML `datatypes` to encode data, and how to take advantage of pattern matching to write elegant code. This module includes some imperative features (achieved utilizing basis modules unique to SMLNJ), such as stopwatches, countdown timers, and functions which obtain the current time.

[Code](https://raw.githubusercontent.com/smlhelp/aux-library/main/Timing.sml)

## Permute

The `Permute` module contains utilities for permutating and sorting lists. The functions in this module are polymorphic, and some of the sorting functions furthermore serve as examples of _currying_.

[Documentation](https://github.com/smlhelp/aux-library/blob/main/documentation/permute.pdf) -- [Code](https://raw.githubusercontent.com/smlhelp/aux-library/main/Permute.sml)

## CPS Iterate

The `CPSIterate` module allows for imperative-programming-esque loops, but defined entirely functionally and entirely in continuation passing style.

[Documentation](https://github.com/smlhelp/aux-library/blob/main/documentation/cpsIterate.pdf) -- [Code](https://raw.githubusercontent.com/smlhelp/aux-library/main/CPSIterate.sml)

## Language

The `Language` module provides combinators for working with "languages": lists of values of some equality type `Sigma`. Connects to some of the classic theory of computation, as well as providing sufficient combinators to capture a fragment of the logic of regular expressions. Good showcase of Higher-Order Functions & Combinators.

[Documentation](https://github.com/smlhelp/aux-library/blob/main/documentation/language.pdf) -- [Code](https://raw.githubusercontent.com/smlhelp/aux-library/main/Language.sml)

## Regular Expressions

The `Regexp` module implements regular expressions in Standard ML. Parametrizes over an "alphabet" (equality) type `Sigma`, and implements a type `''Sigma regexp` with a CPS/Exn-control-flow function `match` which performs regular expression matching. Includes a method for obtaining the _language_ of a regular expression, implemented using the `Language` module (above).

**Requires:** `Language.sml`

[Documentation](https://github.com/smlhelp/aux-library/blob/main/documentation/regexp.pdf) -- [Code](https://raw.githubusercontent.com/smlhelp/aux-library/main/Regexp.sml)

## Sets

An implementation of sets in Standard ML. Includes `EQ` & `ORD` typeclasses, the `SET` signature, and three implementations: `ListSet` (sets are unordered, duplicate free lists), `OrdListSet` (sorted, duplicate-free lists), and `OrdTreeSet` (sorted, duplicate-free trees). The latter two are equivalent (as proven by a representation independence proof), but the superior time bounds of `OrdTreeSet` are not realized unless we can maintain a balance invariant -- providing motivation for _red-black trees_.

**Requires:** `Tree.sml`

[sig](https://raw.githubusercontent.com/smlhelp/aux-library/main/SET.sig) -- [struct](https://raw.githubusercontent.com/smlhelp/aux-library/main/Set.sml)
