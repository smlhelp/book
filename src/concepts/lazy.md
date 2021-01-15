# Lazy Evaluation

In programming languages, there's a few different strategies by which arguments
of a function call are evaluated. One you should be familiar with is **_eager_**
evaluation. SML is an **_eager_** language. In other words, we evaluate the
arguments first. We'll be discussing how to "implement" the exact
opposite form of evaluation: **_lazy_** evaluation. In **_lazy_** evaluation,
arguments are evaluated as needed. To implement this, we'll make use of an idea
called **thunks**, as well as modules called **streams**.

## Eager vs Lazy

### Eager Evaluation

Let's say I have the function `double : int -> int` which doubles a number, and
`square : int -> int`, which squares a number. In both **_lazy_** and
**_eager_** evaluation, `double square double 2 ==>* 32`. However, they differ
in the way which they "arrive" at `32`.

```sml
val double : int -> int = fn n => 2 * n
val squareE : int -> int = fn n => n * n

(* Eager *)
    double square double 2
==> double square 4
==> double 16
==> 32
```

You can see that in an eager language, we evaluated the arguments first.
However, in the lazy language, arguments will be evaluated as _needed_.
The notion of _need_ will be subjective relative to what's being implemented.

### Introducing Laziness with Thunks

SML is an eager language. But what if we wanted to simulate lazy evaluation?
First we need a way to wait until we _need_ an argument to evaluate it. This
is where **thunks** come into play. A **thunk** is a function of type
`unit -> 'a`. They help us represent this notion of "evaluation by need" by
wrapping an expression in a function, which delays the computation of that expression.

Let's say we have some function `f` and argument `x`. When we run `f x`, `x`
will get evaluated immediately. However, by wrapping `x` inside a function,
we can delay its computation _(assume `f`'s type is correct)_: `f (fn () => x)`.
Since **_functions are values_**, this lambda function is already fully evaluated.
However, `x` has yet to be evaluated! Now we can wait to evaluate `x` by passing
in `() : unit` to the lambda function at some point.

Let's see how that changes things in our earlier example. Here, we change `square`
into a lazy version that accepts a **thunk** instead of an `int`.

```sml
val double : int -> int = fn n => 2 * n
fun square (f : unit -> int) : int = f () * f ()

(* Lazy *)
    double square (fn () => double 2)
==> double ((fn () => double 2) () * (fn () => double 2) ())
==> double (double 2 * double 2)
==> double (4 * 4)
==> double 16
==> 32
```

You can see that with lazy evaluation, we put off the computation of `double 2`
until we "needed it". That "need" is subjective, but the key idea is that we
delayed the computation of `double 2` by wrapping it a **thunk**. Lets see
what this looks like in normal algebra.

```sml
(* Eager *)                  (* Lazy *)
    2 * (2 * 2)^2                2 * (2 * 2)^2
==> 2 * (4)^2                ==> 2 * ((2 * 2) * (2 * 2))
==> 2 * (4 * 4)              ==> 2 * (4 * 4)
==> 2 * 16                   ==> 2 * 16
==> 32                       ==> 32
```

Since `square` is now the lazy function, we are delaying the evaluation of
`square`'s arguments. That's why in eager evaluation, we just do `2 * 2 ==> 4`
before we square that value, whereas in lazy evaluation, we square the
unevaluated arguments by doing `(2 * 2) * (2 * 2)`.

_Note, we let the type of a **thunk** be `unit -> 'a` just because it's convenient._
_Theoretically I could use a different type to represent thunks since all we need_
_is a way to wrap an expression in a function to delay its computation._

## Lazy Lists

Now that we have established this notion of **_laziness_** in SML, we can do
even fancier things, like create infinite data structures! Let's first look at
a lazy list. I will compare it a normal list in SML so we can see how they vary.

```sml
datatype 'a lazylist = Cons of 'a * (unit -> 'a lazylist)
datatype 'a list     = Cons of 'a * 'a list               | Nil

```

## Streams

## Definitions

- Productive
- Maximally Lazy
