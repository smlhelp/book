# Recursion and Induction

## Introduction
Functional programmers have a particular affinity for the technique of **_recursion_**. Recursion is a way of writing functions: a given SML function either will or won't be _recursive_, and you can tell by looking at its declaration. Most of the main functions (i.e. the ones doing the "real work" of a problem) you write when programming in a functional style will be recursive, and _thinking recursively_ is an essential skill for functional programming. Indeed, many of the features of functional programming languages like SML are designed to facilitate writing recursive functions. And &mdash; as we discuss more in [the page about datatypes](datatypes.md) &mdash; we'll also be designing our data to make it easier to define recursive functions.

Going hand-in-hand with recursion is the proof technique of **_induction_**. Induction is a tool used throughout mathematics, and will form the basis for the mathematical analysis of functional programming. To prove the correctness of a recursive function, the natural (and often the only) choice is to make use of an inductive argument. Moreover, the form of the recursive function will suggest to us the structure of the inductive proof. In this article, we'll develop this connection for natural numbers and integer lists. The connection between recursion and induction for trees is explored [here](treeinduct.md), and for general datatypes [here](datatypes.md). A specific kind of recursion, called _tail recursion_, is discussed [here](tail.md).

## Iterative versus Recursive Thinking

## The "Type" of Natural Numbers

## List Recursion

## List Induction

## Takeaways
