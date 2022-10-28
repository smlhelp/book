---
sidebar_position: 7
---

# Option

_By Jacob Neumann, June 2021_

`option` is a SML datatype for handling potential undefined values. Formally, the option type is parametrized by a single polymorphic type variable, so for every SML type `t`, there is a type `t option`.

The type `t option` represents the construction of "either a value of `t`, or nothing". For instance, a value of type `bool option` is either true, false, or neither. A value of type `int option` is either some integer, or none. A function will return `t option` to represent the possibility that no acceptable value of type `t` can be identified to return, and have a value to return to signal this circumstance. See the "Options-as-partiality" HOFs section below for some functions elaborating on this understanding of options.

Options also function as a kind of "container": a value `x : t option` either "contains" a value of type `t` (`x = SOME(z)`) or is an "empty container" with no values (`x = NONE`). We can therefore view `t option` as a degenerate version of `t list`, where the "list" is constrained to be length at most one. The notion of a "container" is made precise in functional programming with the idea of a "monad". In Haskell (which makes much more explicit use of monads), options are known as the "Maybe monad".

## Values

The type `t option` has exactly one more value than the type `t` itself. Formally,

```sml
datatype 'a option = NONE | SOME of 'a
```

So for each value `v : t`, `SOME(v) : t option`. And `NONE` is a value of type `t option` for each type `t`, as required by the surrounding context. Options can be nested, e.g. `SOME(SOME(3)) : int option option`.

`SOME` and `NONE` are the two constructors of the `t option` type, so, in addition to the constructs generally available in pattern matching (e.g. wildcards and identifier binding), we can pattern match against `SOME` and `NONE`.

```sml
fun defaultToThree (NONE : int option):int = 3
  | defaultToThree (SOME x) = x

val 2 = defaultToThree(SOME 2)
val 3 = defaultToThree(NONE)

fun searchForEven [] = NONE
  | searchForEven (x::xs) = if (x mod 2)=0 then SOME(x) else searchForEven xs

val (SOME _) = searchForEven [1,2,3,4]
val NONE = searchForEven [1,3,5]
```

If `t` is pretty-printed by the `smlnj` REPL (like `int`,`bool`,`string list`, etc.), so too is `t option`. This is demonstrated by the following `smlnj` REPL snippet.

```sml
- val k = SOME(SOME 5);
val k = SOME (SOME 5) : int option option
```

## Production

There are some basic SML functions which produce `option`s:

```sml
Int.fromString : string -> int option
Bool.fromString : string -> bool option
```

Both of these functions are partial inverses to their respective `toString` functions (e.g. `Int.fromString(Int.toString(7)) == SOME 7`), but return an option so they can return `NONE` on strings which do not encode an `int` or `bool`, respectively.

## Elimination

Another option for casing on options is the function (provided in the `Option` structure - see below)

```sml
Option.getOpt : 'a option * 'a -> 'a
```

which behaves as follows: `Option.getOpt(SOME x,y)` will evaluate to `x`, and `Option.getOpt(NONE,y)` will evaluate to `y`. When writing functions operating on options, it is still generally preferable that you use clausal pattern matching to break into the "`SOME` case" and "`NONE` case", but there are situations where `Option.getOpt` is an elegant solution.

The `Option` structure also provides the "join" function

```sml
Option.join : 'a option option -> 'a option
```

which sends `SOME(X)` to `X` and `NONE` to `NONE`.

## From the Structure

The `Option` structure (part of the SMLNJ basis) provides a number of useful utilities for working with `option`s.

In addition to the datatype `option` itself being available at top-level, the exception

```sml
exception Option
```

is available at top-level as well.

### Basic Functions

The `Option` structure provides `bool`ean-valued functions for detecting whether a given option value is `NONE` or `SOME`, and for extracting values from `SOME`.

```sml
Option.isSome : 'a option -> bool
Option.isNone : 'a option -> bool
Option.valOf : 'a option -> 'a
```

`Option.valOf NONE` raises the exception `Option`. **NOTE:** Do _not_ use these fuctions in place of pattern-matching on an option value. Expressions like `if Option.isSome(X) then Option.valOf(X) else e2` are bad style.

### "Options-as-containers" HOFs

Options are an instance of a more general structure in functional programming known as a _monad_. Accordingly, there are a number of higher-order functions which we can define on options. In particular, `option` comes equipped with a _map_ operation:

```sml
Option.map : ('a -> 'b) -> 'a option -> 'b option
```

which does what you might expect, given its type: `Option.map f (SOME x)` evaluates to `SOME(f(x))`, and `Option.map f NONE` produces `NONE`. As usual with "map" functions, we generally require `f` to be total.

Options, as a "container" of data, also admit a _filtering_ operation:

```sml
Option.filter : ('a -> bool) -> 'a option -> 'a option
```

Which is implemented as

```sml
fun filter p opt =
  case opt of
    NONE => NONE
  | SOME x => if p x then SOME x else NONE
```

i.e. it "filters" out the value `x` if `x` does not "satisfy" `p` (`p(x) == false`). As usual with "filter" functions, we generally require `p` to be total.

The `Option` structure also provides a utility for "folding" an option:

```sml
Option.fold : ('a * 'b -> 'b) -> 'b -> 'a option -> 'b
```

which we might implement as

```sml
fun fold g z NONE = z
  | fold g z (SOME x) = g(x,z)
```

We often assume that `g` is total. In certain situations, we also want the two arguments of `g` to be the same type, and might assume that `g` is "associative" (in the sense that `g(x,g(y,z)) == g(g(x,y),z)` for all `x,y,z`) or that `z` is a "unit" for `g` (i.e. `g(x,z) == x == g(z,x)` for all `x`).

### "Options-as-partiality" HOFs

As mentioned above, options provide a way to represent partial functions: a function `f : t1 -> t2 option` can be thought of as a function which is defined on some inputs (`f(x) == SOME(z)`) and not on others (`f(y) == NONE`). The `Option` structure provides several utilities consistent with this interpretation. First is composition of these "partial functions".

```sml
Option.compose : ('a -> 'c) -> ('b -> 'a option) -> 'b -> 'c option
Option.composePartial : ('a -> 'c option) -> ('b -> 'a option) -> 'b -> 'c option
```

So `(Option.compose (g,f))(x)` will return `NONE` if `f(x) == NONE`, and will return `SOME(g(y))` if `f(x) == SOME(y)`. `Option.composePartial` will behave similarly, except it will return `g(y)` in the `f(x) == SOME(y)` case, since `g` returns an option.

It also provides a "partial" version of its map function:

```sml
Option.mapPartial : ('a -> 'b option) -> 'a option -> 'b option
```
