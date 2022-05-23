# Recursion and Induction

## Introduction
Functional programmers have a particular affinity for the technique of **_recursion_**. Recursion is a way of writing functions: a given SML function either will or won't be _recursive_, and you can tell by looking at its declaration. Most of the main functions (i.e. the ones doing the "real work" of a problem) you write when programming in a functional style will be recursive, and _thinking recursively_ is an essential skill for functional programming. Indeed, many of the features of functional programming languages like SML are designed to facilitate writing recursive functions. And &mdash; as we discuss more in [the page about datatypes](datatypes.md) &mdash; we'll also be designing our data to make it easier to define recursive functions.

Going hand-in-hand with recursion is the proof technique of **_induction_**. Induction is a tool used throughout mathematics, and will form the basis for the mathematical analysis of functional programming. To prove the correctness of a recursive function, the natural (and often the only) choice is to make use of an inductive argument. Moreover, the form of the recursive function will suggest to us the structure of the inductive proof. In this article, we'll develop this connection for natural numbers and integer lists. The connection between recursion and induction for trees is explored [here](treeinduct.md), and for general datatypes [here](datatypes.md). A specific kind of recursion, called _tail recursion_, is discussed [here](tail.md).

## Iterative versus Recursive Thinking
Here's a simple programming problem: write a function `exp` which takes in a natural number (an integer greater than or equal to zero) and returns the quantity 2<sup>n</sup>. Of course, 2<sup>n</sup> is just the quantity 2 multiplied by itself n times (e.g. 2<sup>3</sup> is 2 times 2 times 2), with the edge case of 2<sup>0</sup>=1. Now, if we were asked to solve this problem in an _imperative programming language_ (like Python or C), our first instinct might be to do something like this:
```
int exp (int n) { 
    // requires: n>=0
    i = 0;
    res = 1;
    while (i<n) {
        res = res * 2;
        i = i+1;
    }
    return res;
}
```
This code directly solves the problem by "multiplying by 2, n times": it establishes a "result" `res`, and then repeatedly mutates `res` by multiplying by 2. The counter `i` and the loop guard are there to make sure that we do this exactly n times, giving 2<sup>n</sup>. This is what's called an **_iterative solution_**: it consists of initializing our data (in this case, the values stored in `res` and `i`), performing a carefully-chosen sequence of mutations to it (doubling `res` and incrementing `i`), and then reading off the result (the value in `res`). It is this style of thinking which plays a central role in imperative programming. 

Such a solution is not possible when doing functional programming. Indeed, pure functional programming languages (by definition[1]) do not have data "cells" which can be repeatedly modified (as `i` and `res` are in the preceding example): everything in a functional programming language is **_immutable_**. If `i` is a "variable" in a functional programming language, `i` has just one value and will never have a different value. So we must find a different way to solve this problem. Our solution will be to use **_recursion_**.

The following is a correct SML implementation of `exp`. Type annotations have been omitted, for clarity.
```sml
(* exp : int -> int
   REQUIRES: n>=0 
 * ENSURES: exp n == 2^n
 *)
fun exp 0 = 1
  | exp n = 2 * exp(n-1)
```
In the above code, we specify the **_base case_** that \\( 2^0 = 1 \\). Then, for inputs greater than 0,
we first compute \\(2^{n-1} \\) recursively, and then multiply 2 to it.
By "recursively", we are assuming our code works for smaller inputs.
You can trace through a few test cases to convince yourself that these elegant two lines of code
indeed implement `exp`.

## Proof by Induction

Perhaps test cases are not enough for you, or you would like to see the deep connection
between induction and recursion. We can use the principle of mathematical induction to
**_prove_** that our `exp` code works. Here is the theorem we want to show. Recall that we use
`==` to denote two expressions being extensionally equivalent.

**Theorem:** `exp n ==` \\(2^n\\) for all integer values \\( n \geq 0 \\).

**Proof:** We use the principle of mathematical induction on `n`.

**Base case:** We prove the theorem for `n = 0`.

`exp 0 == 1` (by clause 1 of `exp`)

`1 ==` \\(2^0\\) (math)

When dealing with arithmetic, we may justify proof steps by "math".
Also, unless stated otherwise, we may assume SML implements basic mathematical operations correctly,
such as `+` and `*`.

**Inductive step:** Let \\( k \geq 0 \\) be fixed. 

Induction hypothesis: Assume that `exp k ==` \\( 2^k \\).

We want to show the theorem for `k+1`.

`exp (k+1) == 2 * exp (k+1-1)` (by clause 2 of `exp`)
`== 2 * exp k` (by math, \\(k+1-1 \\) `==` \\(k \\) )
`== 2 *` \\(2^k \\) (by IH)
`==` \\(2^{k+1} \\) (math)

This concludes the inductive step. 

There are some things to note about this proof. First, every time we are evaluating SML code,
we justify which line of code allows us to make a particular step.
For example, when evaluating `exp (k+1)`, clause 2 of `exp` tells us that expression is
extensionally equivalent to `2 * exp (k+1-1)`. In fact, we say `exp (k+1)` **_steps to_**
`2 * exp (k+1-1)`.

Second, we've abbreviated the induction hypothesis citation as "IH". Furthermore, note how
we quantified the induction hypothesis: we are not assuming the theorem is true for all
natural numbers. Rather, we assume the theorem is true for some fixed `k` (which is \\( \geq 0 \\) ).

The principle of mathematical induction works due to a sort of domino effect. Let's notate
that the theorem is true for an integer `n` with \\( P(n) \\). In the above proof, we've shown
\\( P(0) \\), and that \\( P(k) \implies P(k+1) \\) for all \\(k \geq 0 \\).
Then suppose we wanted to show \\( P(2) \\). We begin with \\( P(0) \\), and from the inductive step get
\\( P(1) \\). Then we apply the inductive step again to get \\( P(2) \\).

## The "Type" of Natural Numbers

## List Recursion

## List Induction

## Takeaways

### Footnotes
- [1] SML actually does have mutable data cells called `ref`s. For this reason, SML is not (strictly speaking) a _pure_ functional programming language. But we primarily program with the parts of SML which are pure, and therefore don't have to worry about _side effects_.
