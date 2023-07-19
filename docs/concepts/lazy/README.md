---
sidebar_position: 9
---

# Lazy Evaluation

_By Len Huang, Cooper Pierce, and Brandon Wu, January 2021. Rewritten by Thea Brick, April 2022._

In programming languages, there's a few different strategies by which arguments
of a function call are evaluated. One you should be familiar with is **_eager_**
evaluation. SML is an **_eager_** language. In other words, we evaluate the
arguments first. We'll be discussing how to "implement" the exact opposite form
of evaluation: **_lazy_** evaluation. In **_lazy_** evaluation, arguments are
evaluated as needed. To implement this, we'll make use of an idea called
**thunks**.

## Eager vs Lazy

### Eager Evaluation

Let's say I have the function `double : int -> int` which doubles a number, and
`square : int -> int`, which squares a number. In both **_lazy_** and
**_eager_** evaluation, `double (square (double 2)) ==>* 32`. However, they
differ in the way which they "arrive" at `32`. SML is an eager language, so the
code (eagerly) steps as follows:

```sml
val double : int -> int = fn n => 2 * n
val square : int -> int = fn n => n * n

(* Eager *)
    double (square (double 2))
==> double (square 4)
==> double 16
==> 32
```

You can see that we evaluated the arguments first. However, when doing things
lazily, arguments will be evaluated as _needed_. The notion of _need_ will be
subjective relative to what's being implemented. The question now remains, since
SML is eager, how do we do things lazily?

### Introducing Laziness with Thunks

Since SML is an eager language, to have lazy evaluation we must simulate it in
some way. To do this, we need a way to wait until we _need_ an argument to
evaluate it. This is where **thunks** come into play. A **thunk** is a function
of type `unit -> t` for some type `t`. They help us represent this notion of
"evaluation by need" by wrapping an expression in a function, which delays the
computation of that expression.

Let's say we have some function `f` and argument `x`. When we run `f x`, `x`
will get evaluated immediately. However, by wrapping `x` inside a function, we
can delay its computation _(assume `f`'s type is correct)_: `f (fn () => x)`.
Since **_functions are values_**, this lambda function is already fully
evaluated. However, `x` has yet to be evaluated! Now we can wait to evaluate `x`
by passing in `() : unit` to the lambda function at some point. A lambda
expression is like a lawn mower on a cord - it has the potential to start doing
some kind of work, but not until its cord is pulled.

Let's see how that changes things in our earlier example. Here, we change
`square` into a lazy version that accepts a **thunk** instead of an `int`.

```sml
val double : int -> int = fn n => 2 * n
fun square (f : unit -> int) : int = f () * f ()

(* Lazy *)
    double (square (fn () => double 2))
==> double ((fn () => double 2) () * (fn () => double 2) ())
==> double (double 2 * double 2)
==> double (4 * 4)
==> double 16
==> 32
```

You can see that with lazy evaluation, we put off the computation of `double 2`
until we "needed it". That "need" is subjective, but the key idea is that we
delayed the computation of `double 2` by wrapping it a **thunk**. Lets see what
this looks like in normal algebra.

**NOTE**: You can see that the computation was "put off" since we had to
recompute the value of `double 2` twice. This seems rather inefficient, since
we don't want to have to recompute every time we use the value of some
expression multiple times. In other _lazy languages_ that use a primarily lazy
evaluation strategy, there tends to be a sophisticated system of _memoization_
(or, remembering values) so that values do not have to be recomputed.

```sml
(* Eager *)                  (* Lazy *)
    2 * (2 * 2)^2                2 * (2 * 2)^2
==> 2 * (4)^2                ==> 2 * ((2 * 2) * (2 * 2))
==> 2 * (4 * 4)              ==> 2 * (4 * 4)
==> 2 * 16                   ==> 2 * 16
==> 32                       ==> 32
```

**NOTE**: In another sense, in a lazy setting, the final computed value of
`2 * (2 * 2)^2` is just the computation of `2 * (2 * 2)^2` itself. Lazy
evaluation is lazy because it does not move until it is forced to - thus, in
this example, we have shown how algebraically we can obtain the final value of
`2 * (2 * 2)^2` _when forced_, where we use the term "forcing" to refer to
forcing a lazy expression to evaluate to a traditional "value".

Since `square` is now the lazy function, we are delaying the evaluation of
`square`'s arguments. That's why in eager evaluation, we just do `2 * 2 ==> 4`
before we square that value, whereas in lazy evaluation, we square the
unevaluated arguments by doing `(2 * 2) * (2 * 2)`.

_Note, we let the type of a **thunk** be `unit -> 'a` just because it's convenient._
_Theoretically we could use a different type to represent thunks since all we need_
_is a way to wrap an expression in a function to delay its computation._

## Lazy Lists

Now that we have established this notion of **_laziness_** in SML, we can do
even fancier things, like create _infinite data structures_! Unlike regular data
structures, infinite data structures have the potential to encode an _unbounded_
amount of data. Let's first look at a lazy list and compare it to a normal list.

```sml
datatype 'a list     = nil |  ::  of 'a * 'a list
datatype 'a lazylist = Nil | Cons of 'a * (unit -> 'a lazylist)
```

You'll see that a `lazylist` is very similar to normal `list`s. The only
difference is that the computation of the list's tail has been delayed with a
thunk. Just like before where we delayed computation of arguments for functions,
we are now delaying the computation of arguments for constructors. You can sort
of think of it like instead of having `x::xs`, we now have `x::(fn () => xs)`.
This can help us create infinite lists since the true computation of the list
tail is always delayed.

For example, if I wanted to represent a list of fibonacci numbers, I could do:

```sml
val fibs : int lazylist =
    let
        fun fib' x y = Cons(x, fn () => fib' y (x + y))
    in
        fib' 0 1
    end

(* Iterate through lazy list *)
val Cons(a1, f1) = fibs
val Cons(a2, f2) = f1 ()
val Cons(a3, f3) = f2 ()
val Cons(a4, f3) = f3 ()
val Cons(a5, f5) = f4 ()

(* Test cases *)
val 0 = a1
val 1 = a2
val 1 = a3
val 2 = a4
val 3 = a5
```

Here, we have a value `fibs : int lazylist` that represents the entire list of
fibonacci numbers. Instead of immediately evaluating the tail of the list, the
lazy list allows us to wait until a later time to continue iterating the list.
We can exploit this by later triggering the evaluation of `fib' y (x + y)`.

Note that if you tried to do this with normal lists, we would get some circular
evaluation since the computation is not being delayed. For example:

```sml
(* Example REPL Output *)

- fun fib x y = x::(fib' y (x + y));

val fib = fn : int -> int -> int list

- fib 0 1;

uncaught exception Overflow [overflow]
  raised at: <file stdIn>
```

We get an `exception Overflow` since SML is trying to eagerly evaluate the
arguments passed into the constructor `::`. This causes it to go into an
infinite loop and eventually overflow.

> "What's the tail of the list? I'm eager and I evaluate the arguments of the
> constructor first! Why it's `fib y (x + y)`! How exciting. Let's evaluate
> this. Well `fib y (x + y) ==> y::(fib (x + y) (y + (x + y)))`. What's the tail
> of the list? I'm eager and I evaluate the arguments of the constructor first!
> Why it's `fib (x + y) (y + (x + y))`! How exciting. Let's evaluate this...
>
> _a few steps later..._
>
> Why it's `fib ((y + (x + y)) + ((x + y + (y + (x + y))))) (((x + y + (y + (x + y)))) + ((y + (x + y)) + ((x + y + (y + (x + y))))))`! dang this is one thicc expression. It's time to surrender and
> `raise exception Overflow [overflow]`. We'll get em next time 😞
>
> _- The inner dialogue of the SML Compiler_

## Thunks and Continuations

Another way to think of **thunks** is in relation to continuations. We've seen
before continuations being passed into functions as a way to represent
_what instructions need to be executed_. Here, we are using the same idea but
rather than forcing all those instructions to be executed now, we are passing
them off so that they can be done when and if they are needed.

In the `fibs` example we can see this where the `lazylist` is defined to be the
specific element of the fibonacci sequence, and a continuation (thunk) to
produce the next element (along with a new continuation to compute the next next
element, and so on infinitely).

Another example that may be more enlightening is the function that tries to find
all elements in a list that satisfy some predicate `p`:

```sml
fun listFind (p : 'a -> bool) ([] : 'a list) : 'a lazylist = Nil
  | listFind p (x::xs) =
        if p x
        then Cons (x, fn () => listFind p xs)
        else listFind p xs

val p = fn x => x mod 2 = 0
val res : int lazylist = listFind p [1,2,3,4]
```

Here, `res` would be bound to `Cons(2, fn () => listFind p [3,4])`. Our program
is basically saying "I found this element, 2, that satisfies your predicate, and
if you'd like to find another element: here's a continuation/thunk that will do
that for you". So rather than having to evaluate a predicate (with a potentially
large cost-bound) over a potentially huge list, we can be lazy, and only look at
what we need.

# Conclusion

Even though SML is an eager language, we can utilize **thunks** to delay the
computation of arguments. This allows us to simulate and represent a more
**lazy** style of evaluation, where we evaluate arguments _as needed_. Using
this idea, we can even represent things like infinite lists in SML!
