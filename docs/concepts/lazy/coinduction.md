# Productivity and Coinduction
_By Thea Brick, April 2023_

With lazy programming we've seen how we can encode infinite data structures into
SML. With these new structures, we'd like to be able to safely use them and
prove things about them, but as we will see, there are some interesting quirks
that we must address to do so.

## Lazy Filtering Problems

In the past section we've looked at `lazylist`s, defined as (with some
examples):

```sml
datatype 'a lazylist = Nil | Cons of 'a * (unit -> 'a lazylist)

(* some helper functions for making lazylists *)
fun gen_zeros () = Cons(0, gen_zeros)
fun gen_nats x   = Cons(x, fn () => gen_nats (x + 1))

val onefifty = Cons(1, fn () => Cons (5, fn () => Cons (0, fn () => Nil)))
val zeros = gen_zero () (* infinite lazylist of zeros *)
val nats  = gen_nats 0  (* infinite lazylist of all natural numbers *)
```

Now that we've seen how to construct these `lazylist`s we might want to try to
write some higher order functions, just as we might have for `list`s. For
instance, here is an implementation of `filter` for `lazylist`s.

```sml
fun lazyFilter (p : 'a -> bool) (Nil : 'a lazylist) = Nil
  | lazyFilter p (Cons (x, xs)) =
      if p x
      then Cons (x, fn () => lazyFilter p (xs ()))
      else lazyFilter p (xs ())
```

This is great, now we can filter potentially infinite lists. Except, now we've
encountered an issue. What if our filter doesn't accept anything?

```sml
val Nil = lazyFilter (fn _ => false) onefifty
val  ?  = lazyFilter (fn _ => false) zeros
```

Filtering `onefifty` turns out to be fine, we eventually run out of elements and
simply evaluate to `Nil`. Filtering `zeros` is where things become problematic.
Our filter function will keep searching for an element that satisfies `p` (which
doesn't exist), but since `zeros` is infinite, this process will never stop, and
our function will loop forever! And if that wasn't bad enough, we can do other
weird things:

```sml
val lessThan5 = lazyFilter (fn x => x < 5) nats
```

This evaluates to a value rather than looping forever, but we aren't out of
trouble yet. If we try and look at the element after `4` in `lessThan5`, then we
suddenly loop forever again (as we cannot find any element satisfying the
predicate).

## Productivity

Ideally, we don't want our functions to (seemingly) randomly loop forever on
some `lazylist` inputs. So how do we ensure that this won't be an issue? The
answer is to introduce the idea of productivity.

We say that a `lazylist`, `L` is productive if `L` evaluates to either:
- `Nil`.
- `Cons (x, L')` where `L' ()` is productive (for some `x`).

Essentially, we are guaranteeing that `L` and any sub-`lazylist`s don't loop
forever (or raise exceptions) when we try to look at their elements. This is
great, now we can start requiring that inputs to our functions give productive
`lazylist`s and that our functions output productive `lazylist`s.

But how do we know that some `lazylist` is productive? We can see that
`onefifty` is productive, since `Nil` is productive, meaning
`Cons (0, fn () => Nil)` is productive, and so on. How do we know that `zeros`
and `nats` are both productive? We can inspect them and maybe judge that they
should be productive, but this is prone to errors and isn't really rigorous.
Instead we should prove that they productive.

Our first attempt at this might be to use induction. We set `Nil` as our base
case, and our inductive case would be `Cons (x, L')` for some values `x`, and
`L'`. Our inductive hypothesis would be that the `L' ()` is productive. This may
appear fine at first, but consider a `lazylist` like `nats`: there's no base
case in sight (or we have to go through an infinite number of `Cons`'s to get
to one)!

> If the problem with using induction here isn't the clearest, that's okay!
> Consider a simpler example: the natural numbers but extended with an infinite
> element $$\infin$$ (meaning 'zero' with an infinite number of successors,
> "$$+ 1$$"'s, applied to it). We'll call these numbers co-natural numbers.
>
> Let's try and prove the claim "All co-natural numbers are finite" by
> induction. Well, 0 is clearly finite, and if n is finite, then n + 1 is also
> finite. QED. This is a great induction proof, but hopefully you can see the
> problem, we haven't considered $$\infin$$ at all. This is why our traditional
> induction falls short on infinite datatypes, like `lazylist`.

## Coinduction and Corecursion

Induction relies on constructing an object by looking at the basic building
block(s) that the input could be, the base case(s), and building them upwards,
the inductive case(s). For instance, a list has the basic building blocks of
`[]` and can build upwards using `::`. So when we write a proof using we have a
base case of `[]` and an inductive case of `::`. Similarly, when we are writing
a function that recurses over an input list, we pattern match on the list into
the two possible constructors.

Coinduction is the opposite of this (that's what the "co-" prefix means).
Instead of considering how we construct the inputs to a function, we instead
consider how we deconstruct the outputs. Another way to think of it
is we have an observation of the state of the object and we describe how we
could "change" the object for future states.

Let's make this notion of destruction more clear for `lazylist`s. For
simplicity, let's only worry about infinite `lazylist`s since that is what we
are interested in studying anyway (so no need to worry about the `Nil` case):

```sml
fun head (Nil : 'a lazylist) : 'a = raise Fail "Unimplemented"
  | head (Cons (x, _)) = x

fun tail (Nil : 'a lazylist) : 'a lazylist = raise Fail "Unimplemented"
  | tail (Cons (_, xs)) = xs ()
```

Our function `head` and `tail` defines two ways to deconstruct a `lazylist` (or
if you prefer, two ways to get to a future state). The `head` deconstructor (or
co-constructor) evaluates to the head of the `lazylist` (if it exists).
Likewise, the `tail` produces the next `lazylist`.

Now let's rewrite our `lazyFilter` explicitly using these deconstructors:
```sml
(* REQUIRES: `ll` is an infinite lazylist *)
fun lazyFilter' (p : 'a -> bool) (ll : 'a lazylist) : 'a lazylist =
  let
    val x = head ll
  in
    if p x then
      Cons (x, fn () =>
        (* This is only evaluated if someone called tail on the
         * outer lazylist: `Cons (x, fn () => ...) *)
        lazyFilter' p (tail ll)
      )
    else lazyFilter' p (tail ll)
```

Notice that our function is defining what it should do in terms of the
output deconstructors `head` and `tail`. We don't case on the input to the
function, we are casing on the output behaviour. Specifically, it defines that:
- `head (lazyFilter' p ll)` evaluates to `x` where `p x` is true
- `tail (lazyFilter' p ll)` evaluates to `ll'` where `ll'` is the filtered
  `tail` of `ll` according to `p`.

You might notice a parallel in this definition to what we've seen before.
Specifically, it seems like `head (...)` is our base case, and `tail (...)` is
our inductive case, with an inductive hypothesis of `ll'`. Except since we are
doing coinduction, it is instead a coinductive case and a coinductive
hypothesis.

## Proving Productivity

Now that we've at least established what coinduction is, let's use it to prove
productivity! For this example, we'll consider the following function:

```sml
(* REQUIRES: `ll` is an infinite lazylist *)
fun lazymap (f : 'a -> 'b) (ll : 'a lazylist) : 'b lazylist =
  let
    val hd = head ll
  in
    Cons (f hd, fn () => lazymap f (tail ll))
  end
```

The theorem we want to show is as follows:

**Theorem:** For all types `t1`, `t2`, for all infinite `ll : t1 lazylist` that
are values, and for all total function values `f : t1 -> t2`,
`lazymap f ll` evaluates to a value `LL` where `LL` is productive.

Remember, for a `lazylist` to be productive it must evaluate to either `Nil` or
`Cons (x, ll')` where `ll' ()` is productive (where `x` is the leading element
in the `lazylist`). Since we are only considering infinite lists we don't need
to worry about the `Nil` case.

Using our deconstructors, we can rewrite our notion of productivity to say that
a `lazylist` `ll` is productive if `head ll` evaluates to `x` (for some `x`) and
`tail ll` evalautes to a productive lazylist.

**Proof:** Fix `t1`, `t2` to be types and `f : t1 -> t2` to be a total function
value. We proceed by co-induction on `ll`.

**Co-IH**: `lazymap f (tail ll)` is a productive `lazylist`

**WTS**: `lazymap f ll` is a productive `lazylist`.

**Showing**:

$$
\begin{aligned}
& \texttt{lazymap f ll} && \hspace{1cm} &&& \\
\Longrightarrow\ & \texttt{let val hd = head ll in ... end} && &&&\text{clause 1 of \texttt{lazymap}} \\
\Longrightarrow\ & \texttt{let val hd = y in ... end} && &&&\text{\texttt{ll} is infinite} \\
\Longrightarrow\ & \texttt{Cons (f y, fn () => lazymap f (tail ll))} & && &&& \\
\Longrightarrow\ & \texttt{Cons (x, fn () => lazymap f (tail ll))} & && &&\text{\texttt{f} total, \texttt{f y} evaluates to value \texttt{x}} \\
\Longrightarrow\ & \texttt{LL} & && &&\text{is a syntactic value} \\

\end{aligned}
$$

By the Co-IH, `lazymap f (tail ll)` is productive. Therefore, we have that
`head LL` evaluates to a value `x` and `tail LL` evaluates to a productive
stream (`lazymap f (tail ll)`). So, `lazymap f ll` is productive!

This is a weird proof, so it is understandable if you don't grasp all the
nuisances, they aren't too important for our purposes. To try and intuit what
the proof is doing, we are showing that two sides simulate each other. One
side is our `lazymap` function and the other side is our productivity
definition. We are showing that if we start in equivalent states and step one
side (e.g. the `lazymap` function) that we can simulate the other side (e.g. the
productivity definition), and vice-versa. This idea is called *bisimulation* 
(which we won't explore further) and encodes the reasoning why we don't need to
look at the entire stream.
