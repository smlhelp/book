# Auxiliary Library Documentation
_By Jacob Neumann, June 2021_

This page collects the documentation of the [Auxiliary Library](https://github.com/smlhelp/aux-library). The purpose of this library & its documentation is to serve as sample code, proofs, and worked examples for students learning functional programming and/or SML for the first time. Accordingly, this documentation also includes explicit mathematical definitions, proofs by induction, asymptotic analyses, and evaluation traces, as appropriate.

Unless otherwise stated, the documentation assumes SMLNJ v110.99. Some features (e.g. modifications of the pretty printer) might not work in other versions of SMLNJ.

## Timing
The `Timing` module includes types for encoding years, months, days, times, time zones, etc., as well as numerous utilities for working with them. This module primarily serves as an extended example of how to use custom SML `datatypes` to encode data, and how to take advantage of pattern matching to write elegant code. This module includes some imperative features (achieved utilizing basis modules unique to SMLNJ), such as stopwatches, countdown timers, and functions which obtain the current time. 

[Code](https://github.com/smlhelp/aux-library/blob/main/Timing.sml)


## Permute
The `Permute` module contains utilities for permutating and sorting lists. The functions in this module are polymorphic, and some of the sorting functions furthermore serve as examples of _currying_. 

[Documentation](https://github.com/smlhelp/aux-library/blob/main/documentation/permute.pdf) -- [Code](https://github.com/smlhelp/aux-library/blob/main/Permute.sml)

