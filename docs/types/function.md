---
sidebar_position: 5
---

# Functions

_By Brandon Wu, May 2020_

Functions are a familiar concept in programming. In most languages, functions seem to capture a notion of a list of instructions to be carried out, with each invocation of the function resulting in another round of executing its instructions. In this class, however, we will take another perspective on functions - one that identifies the function more with the values that it outputs than the instructions that it executes.

## What is a Function?

What is a function? To most seasoned programmers, the definition given in the above section seems to be the most obvious. A function (or subroutine) is simply identified with the instructions that it executes, which have some _effect_ on the state of the program as a whole, such as incrementing some variable, or setting some flag.

Before most programmers were programmers, however, they had a different notion of a function. To a mathematician, a function is something else entirely. Instead of being an algorithmic sequence of instructions, a function is simply an entity that maps inputs to outputs - for example, \(f(x) = x + 1\). Something rather notable is that mathematical functions are _pure_ - given the same input, they always return the same output. So while it is a valid question in programming to ask how a function's behavior changes over time, this is a nonsensical question in terms of mathematical functions.

To be more concrete, let us consider a Python program.

```python
x = 0
def f(y):
    x += 1
    return x + y
```

This program instantiates a variable `x` outside the scope of the function `f` (which takes a single argument `y`), and the behavior of `f` is to increment the value of `x`, then return the sum of `x` and `y`. What we would find is that the first time that we run `f(0)`, for instance, we obtain `1`. The second time that we run `f(0)`, it will return `2`, and so on and so forth. We cannot even say that `f(0) = f(0)`! The output behavior of this function changes every time that it is run. This makes it difficult to reason about the function - in order to do so, we must know the number of times that it has been called before, at a given step in the program. While this is a fairly tame example, this problem only compounds with more complicated functions.

Clearly, this function is _impure_. Can we do better?

## Function Types and Function Application

So far we have seen basic types such as `int` and `string`, among others. Functions allow us to compose types in new ways.

In SML, we denote the type of a function that has input type `t1` and output type `t2` (for some arbitrary, fixed `t1` and `t2`) to be `t1 -> t2`. By SML's strict typing rules, functions of type `t1 -> t2` can _only_ take in inputs of type `t1` and return outputs of type `t2`, for any types `t1` and `t2`. Additionally, we write `e1 e2` for the expression consisting of the function `e1` being given as input the expression `e2` (so we may write the mathematical function \(f(x)\) instead as `f x`).

> **[APP]** An expression `e1 e2` has type `t2` if and only if `e1 : t1 -> t2` and `e2 : t1`.

We call the above rule [APP] since it concerns the types of expressions during _function application_, or the process of applying a function to an argument.

Note that a function must always have type `t1 -> t2` (for some types `t1` and `t2`, though `t1` and `t2` may be complicated types in their own right). As such, all functions in SML can only take in _one_ input - though the input type `t1` may be one that "contains" multiple values. For instance, a function may have type `int * int -> bool`. For such a function, it takes in only _one_ argument (a tuple containing two integers).

## Functions in SML

We can declare a function with the `fun` keyword.

```sml
fun fact (0 : int) : int = 1
  | fact (n : int) : int = n * fact (n - 1)
```

The above example serves to initialize a function that computes the factorial function, and then bind it to the identifier `fact`. Function declarations create a _closure_ which includes all bound variables in the scope of the function when it was declared, so the behavior of `fact` will always be as if it was in the same environment as when it was first declared. As such, we can also declare functions such as:

```sml
val x = 1
fun addX (n : int) : int = n + x
val x = 2
```

When `addX` is bound, it is bound in a closure that includes the binding of the value `1` to the identifier `x` (we may denote this as `[1/x]`). As such, even though the body of `addX` refers to the identifier `x`, it is not affected by the later re-binding of the value of `x`, since it only matters what the value of `x` was when `addX` was first bound. Seen in this way, then, reasoning about functions which use bound variables is very intuitive - you simply have to look up for the most recent time that that variable was bound.

We also can use _anonymous lambda expressions_ to bind functions. These are denoted by the `fn` keyword, and are called lambda expressions for historical reasons having to do with a model of computation called the _lambda calculus_. For instance, we can declare:

```sml
val addOne : int -> int = fn x => x + 1
```

Lambda expressions can also be _multi-clausal_, by pattern matching to multiple different clauses. For instance, we can define the following function, which simply returns true when given 0 and 1, and false otherwise.

```sml
val isBinary : int -> bool = fn 0 => true | 1 => true | _ => false
```

Note that the right hand side of this declaration is an expression in its own right, and can be used independently of just being bound. The above binding simply binds the anonymous lambda expression (which simply increments an integer) to the identifier `addOne`. We could also do the following binding:

```sml
val two : int = (fn x => x + 1) 1
```

where we bind the result of evaluating the expression `(fn x => x + 1) 1` to the identifier `two`. Clearly, this expression evaluates to `2`, as `1` is substituted in for the local variable `x`, and then simply summed with `1`.

**NOTE:** `fun` and `fn` differ in that functions declared with `fun` can be recursive, whereas val bindings using `fn` _cannot_ unless you use `rec`. As such, while we can define the function `fact` as we did above, using `fun`, the following code _does not_ work:

```sml
(* DOES NOT WORK *)
val fact : int -> int = fn 0 => 1 | n => n * fact (n - 1)
```

We will explore later on in the course what lambda expressions are useful for. In the meantime, usage of `fun` is sufficient to declare any functions that you may need.

It is also important to note that SML is an _eager_ language, or _call-by-value_. This means that functions evaluate their arguments before stepping into their function bodies. This is explored more in the article on evaluation.
