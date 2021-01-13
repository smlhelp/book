# Lazy Evaluation

In programming languages, there's a few different strategies by which arguments
of a function call are evaluated. One you should be familiar with is **_eager_**
evaluation. SML is an **_eager_** language. In other words, we evaluate the
arguments first. We'll be discussing how to "implement" the exact
opposite form of evaluation: **_lazy_** evaluation. In **_lazy_** evaluation,
arguments are evaluated as needed. To implement this, we'll make use of an idea
called **thunks**, as well as modules called **streams**.

## Eager vs Lazy

Let's say I have the function `double : int -> int` which doubles a number, and
`square : int -> int`, which squares a number. In both **_lazy_** and
**_eager_** evaluation, `double square double 2 ==>* 32`. However, they differ
in the way which they "arrive" at `32`.

```sml

DISCLAIMER TO PPL REVIEWING PR, IDK HOW ACCURATE THIS IS SO MAY NEED
SOME FACT CHECKING LOL

val double : int -> int = fn n => 2 * n
val square : int -> int = fn n => n * n

(* Eager *)                   (* Lazy *)
    double square double 2    ==> double square double 2
==> double square 4           ==> 2 * square double 2
==> double 16                 ==> 2 * (double 2) * (double 2)
==> 32                        ==> 2 * 4 * 4 ==> 32
```

You can see that in an eager language, we evaluated the arguments first.
However, in the lazy language, it wasn't until we _needed_ to evaluate
`double square double 2`, that we started evaluating its arguments.

However, SML isn't innately **_lazy_**. The way we can emulate this idea of
**evaluating arguments as needed** is by using **thunks**.

## Thunks

## Lazy Lists

## Streams

## Definitions

- Productive
- Maximally Lazy
