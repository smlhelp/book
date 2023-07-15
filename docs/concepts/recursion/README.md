---
sidebar_position: 2
---

# Recursion and Induction

_By Jacob Neumann and Kaz Zhou, May 2022. Revised July 2023_

## Introduction

Functional programmers have a particular affinity for the technique of
**_recursion_**. Recursion is a way of writing functions: a given SML function
either will or won't be _recursive_, and you can tell by looking at its
declaration. Most of the main functions (i.e. the ones doing the "real work" of
a problem) you write when programming in a functional style will be recursive,
and _thinking recursively_ is an essential skill for functional programming.
Indeed, many of the features of functional programming languages like SML are
designed to facilitate writing recursive functions.

Going hand-in-hand with recursion is the proof technique of **_induction_**.
Induction is a tool used throughout mathematics, and will form the basis for the
mathematical analysis of functional programming. To prove the correctness of a
recursive function, the natural (and often the only) choice is to make use of
an inductive argument. Moreover, the form of the recursive function will suggest
to us the structure of the inductive proof. In this article, we'll explore the
idea of recursion. Then, the [simple mathematical induction](simple.md) and the
connection to  recursion will be explored. Then,
[other types of induction](induction.md) and how they relate to SML will be
dicussed. Concluding with an example of inducting over [trees](tree.md).
Finally, we mention a specific kind of recursion, [tail recursion](tail.md).

## Iterative versus Recursive Thinking

Here's a simple programming problem: write a function `exp` which takes in a
natural number $n$ (an integer greater than or equal to zero) and returns the
quantity $2^n$. Of course, $2^n$ is just the quantity 2 multiplied by itself $n$
times (e.g. $2^3 = 2 \times 2 \times 2$), with the edge case of $2^0 = 1$. Now,
if we were asked to solve this problem in an _imperative programming language_
(like Python or C), our first instinct might be to do something like this:

```python
# requires: n >= 0
def exp(n):
  i = 0
  res = 1
  while (i < n):
    res *= 2
    i = i + 1
  return res
```

This code directly solves the problem by "multiplying by 2, n times": it
establishes a "result" `res`, and then repeatedly mutates `res` by multiplying
by 2. The counter `i` and the loop guard are there to make sure that we do this
exactly $n$ times, giving $2^n$. This is what's called an
**_iterative solution_**: it consists of initializing our data (in this case,
the values stored in `res` and `i`), performing a carefully-chosen sequence of
mutations to it (doubling `res` and incrementing `i`), and then reading off the
result (the value in `res`). It is this style of thinking which plays a central
role in imperative programming.

Such a solution is not possible when doing functional programming. Indeed, pure
functional programming languages (by definition[^1]) do not have data "cells"
which can be repeatedly modified (as `i` and `res` are in the preceding
example): everything in a functional programming language is **_immutable_**. If
`i` is a "variable" in a functional programming language, `i` has just one value
and will never have a different value. So we must find a different way to solve
this problem. Our solution will be to use **_recursion_**.

The following is a correct SML implementation of `exp`:

```sml
(* exp : int -> int
 * REQUIRES: n>=0
 * ENSURES: exp n == 2^n
 *)
fun exp (0 : int) : int = 1
  | exp (n) = 2 * exp (n-1)
```

In the above code, we specify the **_base case_** that $2^0 = 1$. Then, for
inputs greater than 0, we first compute $2^{n-1}$ recursively, and then multiply
2 to it. By "recursively", we are assuming our code works for smaller inputs.
You can trace through a few test cases to convince yourself that these elegant
two lines of code indeed implement `exp`.
