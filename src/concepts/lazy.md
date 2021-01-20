# Lazy Evaluation

In programming languages, there's a few different strategies by which arguments
of a function call are evaluated. One you should be familiar with is **_eager_**
evaluation. SML is an **_eager_** language. In other words, we evaluate the
arguments first. We'll be discussing how to "implement" the exact
opposite form of evaluation: **_lazy_** evaluation. In **_lazy_** evaluation,
arguments are evaluated as needed. To implement this, we'll make use of an idea
called **thunks**.

## Eager vs Lazy

### Eager Evaluation

Let's say I have the function `double : int -> int` which doubles a number, and
`square : int -> int`, which squares a number. In both **_lazy_** and
**_eager_** evaluation, `double (square (double 2)) ==>* 32`. However, they differ
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
a lazy list and compare it to a normal list.

```sml
datatype 'a list     = Nil | Cons of 'a * 'a list
datatype 'a lazylist =       Cons of 'a * (unit -> 'a lazylist)
```

You'll see that a `lazylist` is very similar to normal `list`s. The only difference
is that the computation of the list's tail has been delayed with a thunk.
Just like before where we had arguments for functions, we are now delaying the
computation of arguments for constructors. You can sort of think of it like
instead of having `x::xs`, we now have `x::(fn () => xs)`. This can help us create
infinite lists since the true computation of the list tail is always delayed.

For example, if I wanted to represent a list of fibonacci numbers, I could do:

```sml
val fibs : int lazylist =
    let
        fun fib' x y = Cons(x, fn () => fib' y (x + y))
    in
        fib' 0 1
    end

(* Iterate through lazy list *)
val Cons(a, f) = fibs
val Cons(b, g) = f ()
val Cons(c, h) = g ()
val Cons(d, i) = h ()
val Cons(e, j) = i ()

(* Test cases *)
val 0 = a
val 1 = b
val 1 = c
val 2 = d
val 3 = e
```

Here, we have a value `fibs : int lazylist` that represents the entire list of
fibonacci numbers. Instead of immediately evaluating the tail of the list, the
lazy list allows us to delay the computation. We can exploit this by delaying
the circular evaluation of `fib' y (x + y)`.

Note that if you tried to do this with normal lists, we would get some circular
reasoning since the computation is not being delayed. For example:

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
> this. Well `fib y (x + y) ==> y::(fib (x + y) (y + (x + y)))`. What's the
> tail of the list? I'm eager and I evaluate the arguments of the constructor
> first! Why it's `fib (x + y) (y + (x + y))`! How exciting. Let's evaluate
> this...
>
> _a few steps later..._
>
> Why it's `fib ((y + (x + y)) + ((x + y + (y + (x + y))))) (((x + y + (y + (x + y)))) + ((y + (x + y)) + ((x + y + (y + (x + y))))))`!
> dang this is one thicc expression. It's time to surrender and
> `raise exception Overflow [overflow]`. We'll get em next time 😞
>
> _- The inner dialogue of the SML Compiler_

# Conclusion

Even though SML is an eager language, we can utilize **thunks** to delay the
computation of arguments. This allows us to simulate and represent a more
**lazy** style of evaluation, where we evaluate arguments _as needed_. Using
this idea, we can even represent things like infinite lists in SML!
