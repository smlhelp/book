---
sidebar_position: 1
---

# Evaluation

_By Brandon Wu, May 2020_

Evaluation is a commonplace idea. No matter what programming language you are in, it is a customary concept to invoke subroutines in order to obtain some kind of _final result_, which can be further used in order to achieve some later goal. To obtain such a result, however, programs must perform certain computations and carry out certain steps - in other words, they must _evaluate_. Ultimately, programs are complicated constructs whose main goal is to compute some value or achieve some effect - we will focus mainly on the first case here.

## Expressions and Values

Expressions in Standard ML are akin to mathematical expressions. They are built up from applications of certain operations, being subject to certain simplification rules that can be used to obtain a final answer. For instance, we would consider `2 + 2` an expression, similarly to other examples such as `1 div 0` and `Int.toString 2`.

The most fundamental building blocks in Standard ML are _values_. Values are the primordial units of a given type, being irreducible to any further simplified form. When trying to answer some computational problem, it is usually the case that we are looking for some kind of "answer". As such, values are important to obtain, as we are usually looking for some kind of answer in "simplest terms". Values in SML encompass examples such as `2`, `true`, `"foo"`, `[1, 2, 3]` and `fn x => x + 1`.

> **[Value]** A value is an expression `e` such that, for all `e'` such that `e ==> e'`, `e' = e`. In other words, a value is an expression that only reduces to itself - there is no pending computation left to be done.

**NOTE:** The meaning of `==>` in the above definition is _reduction_, which is further explained below.

A noteworthy distinction to make is that certain language constructs, such as an if-then-else expression, let-in-end expression, or case expression, are in fact _expressions_. This means that they can be passed around and evaluated just like any other expression. So for instance, the following code is a valid expression:

```sml
(let
    val x = 5
in
    x
end) + 2
```

and has the value of `7`. Similarly, the following code is also an expression:

```sml
(if true then 15 else 150) * 2
```

and has a value of `30`.

## Reduction

We now define a notion of _reduction_, which corresponds to our notion of simplification. We write that `e ==> e'` if the expression `e` _reduces to_ the expression `e'`, which means that `e` produces `e'` from zero or more applications of some simplifying rule. For instance, we may say that `2 + 2 ==> 4`, since by applying the function `(op +)`, we obtain `4`. Furthermore, we may say that `if true then "good" else "bad" ==> "good"` by evaluation of the if-then-else expression, since the predicate (in this case `true`) is true.

**NOTE:** `==>` is _not_ valid SML code, it is simply our shorthand for the idea of reduction.

> **[Valuable]** An expression `e` is _valuable_ if there exists a value `v` such that `e ==> v`. Note that all values are by definition valuable.

So valuable expressions include `2 + 2`, `4`, and `if true then 4 else 2` (and in fact all reduce to the same value!). An example of a _non_-valuable expression is `1 div 0`, which raises an exception `Div` when evaluated (since division by zero is undefined). Additionally, if we consider the following code fragment:

```sml
fun loop (x : int) : int = loop x
```

This defines a function `loop : int -> int` that loops forever, since it continuously calls itself forever. Thus, `loop x` for any `x : int` is also a non-valuable expression, since it never reduces down to a value.

In fact, what we will see is that this behavior is sufficient to characterize _all_ well-typed expressions. We summarize it in the following:

> **[Behavior of Well-Typed Expressions]** For any well-typed expression `e`, it either:
>
> 1. Reduces to a value
> 2. Loops forever
> 3. Raises an exception

## Eager Evaluation

SML is an _eagerly evaluated_[^1] language. This stands opposed to other paradigms such as _lazy_ evaluation, which is exhibited in languages such as Haskell. In an eagerly evaluated language, we evaluate arguments of functions even if we may not need them. While this arguably may be "wasteful" in some cases, we will find that this greatly simplifies work/span analysis, among other benefits.

> **[Eager Evaluation]** In an eagerly evaluated language, arguments of functions are evaluated _before_ stepping into the body of a function. For a function `f` and valuable expression `e`, when evaluating the expression `f e`, first `e` is evaluated to obtain the value `v` such that `e ==> v`, then `f v` is evaluated.

As an example of this, consider the function `fn x => x + 1`. If we were to try and evaluate `(fn x => x + 1) (2 * 3)`, first we would need to evaluate the function's arguments, that being `2 * 3`. As such, this entire expression would reduce to `(fn x => x + 1) 6`, which is `7`.

In an example like the previous one, it doesn't particularly matter where we evaluated `2 * 3` - we would have gotten the same result either way. This is not always the case. Consider the expression `(fn x => 2) (1 div 0)`. By eager evaluation, we should evaluate the argument first, which means that this entire expression should raise an exception. Raising an exception thus happens _before we even look at the body of the function_. For all intents and purposes, the body of the function does not exist to us until we actually enter it - which necessitates that the argument to the function is valuable. It is a black box that is "locked" behind the argument.

[^1]: In other languages, we may instead say _call-by-value_, which is a separate but closely related concept.
