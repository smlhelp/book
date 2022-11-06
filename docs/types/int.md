---
sidebar_position: 2
---

# Int

_By Brandon Wu, May 2020_

`int` is the SML type of integers.

## Values

The underlying representation of integers can be likened to the following:

```sml
datatype int = ... | ~2 | ~1 | 0 | 1 | 2 | ...
```

This signifies that the type `int` is inhabited by infinitely many values, all corresponding to whole numbers. In particular, every integer forms its own _constant constructor_ for the `int` type, meaning that they each individually can be pattern matched upon. Note that the use of `~` above denotes negativity. Additionally, `~` is a valid function of type `int -> int` that negates a number.

While in practice, computers can only represent a finite number of integers, for the purposes of this class we will generally assume the integers to be unbounded. This means that we can do induction on SML integers in exactly the same way as we would do induction on the natural numbers, and that we do not have to worry about the consequences of edge case behavior. This allows us to ignore pedantic implementation details and explore mathematically interesting properties of programs.

## Production

Integers have all the familiar arithmetic operations available to them. Note that some of these functions are also overloaded to work with `real` types - this is further discussed in the Real page.

```sml
(op +)   : int * int -> int
(op -)   : int * int -> int
(op *)   : int * int -> int
(op div) : int * int -> int
(op mod) : int * int -> int
```

All of these functions are _infixed_, so instead of being applied as `+(2, 3)`, we write `2 + 3`. Additionally, `div` and `mod` are not defined when the second argument is 0, and will raise a `Div` exception.

## Combination

Integers are also eligible for comparison, including equality and inequality. (In other words, integers are an _equality type_).

```sml
(op =)  : int * int -> bool
(op <>) : int * int -> bool (* Inequality *)

(op <)  : int * int -> bool
(op >)  : int * int -> bool
(op <=) : int * int -> bool
(op >=) : int * int -> bool
```

## From the Structure

The structure `Int` is bound as part of the SML Basis. It includes helpful functions such as

```sml
Int.toString : int -> string
Int.compare  : int * int -> order
Int.min      : int * int -> int
Int.max      : int * int -> int
```

where `Int.toString` is the function that returns the string representation of a given integer, and `Int.compare` has return type `order`, which is inhabited only by values `LESS`, `EQUAL`, and `GREATER`. `Int.compare (x, y)` returns `LESS` only if x < y, `EQUAL` if x = y, and `GREATER` if `x > y`. Additionally, `Int.min` and `Int.max` are just the corresponding min and max functions for integers.
