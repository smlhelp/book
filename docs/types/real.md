---
sidebar_position: 3
---

# Real

_By Brandon Wu, May 2020_

`real` is the SML type of real or floating-point numbers. As in other programming languages, reals in SML are restricted to finite machine representations, which means that they cannot represent every real number with perfect precision. For this reason, generally in this course we will prefer the use of `int`s when performing numeric operations.

## Values

A real number is a sequence of numbers, followed by a decimal point, followed by another sequence of numbers. This includes examples such as `15.150`, `1.0`, and `3.14159`. Reals are noteworthy in that they are not _equality types_, which means that they cannot be compared for equality with the `=` operator. In addition, they cannot be pattern matched upon. This means that when designing programs with specific behavior based on equality with a specific real number, they should instead be written to operate within some _degree of precision_ of the real number in question. For instance:

```sml
val equalThreshold = 0.000001
fun isZero (x : real) : bool = Real.abs x < equalThreshold
```

This function simply prespecifies a (small) range, within which a number can be considered to be "equal" to 0. It uses the function `Real.abs` to check if the real number in question is within that threshold of zero, in either direction. In this way, we can approximate some test for equality, up to some degree of acceptable precision.

## Production

Real numbers similarly have access to some of the basic arithmetic operations as integers. In particular, they have:

```sml
(op +) : real * real -> real
(op -) : real * real -> real
(op *) : real * real -> real
(op /) : real * real -> real
```

Note that all but the last operator are also defined to work on `int` types. This may seem to violate type safety, however this is just an example of those functions being _overloaded_. There are two "copies" of, for instance, the `+` operator - one that has type `int * int -> int` and one with type `real * real -> real`. Notably, however, it only works on either both ints or both reals - it is not defined on both. As such, SML can infer from its arguments whether it should use the `int` or the `real` variant, and similarly for `-` and `*`. `div`, however, is only defined for integers - `/` is the counterpart for division on the real numbers.

## Combination

While not defined for equality, reals can still be compared to one another.

```sml
(op <)  : real * real -> bool
(op >)  : real * real -> bool
(op <=) : real * real -> bool
(op >=) : real * real -> bool
```

These operations are similarly overloaded, and will also work on integers.

## From the Structure

The structure `Real` is bound as part of the SML Basis. It has access to a few useful functions, including:

```sml
Real.toString : real -> string
Real.compare  : real * real -> order
Real.abs      : real -> real
```

where `Real.toString` is the standard function that transforms a real number into its corresponding string representation, `Real.compare` on two reals returns `LESS`, `EQUAL`, or `GREATER` depending on their relative magnitudes, and `Real.abs` returns the absolute value of the real number in question.
