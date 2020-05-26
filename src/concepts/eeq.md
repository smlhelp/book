# Extensional Equivalence

(intro stuff about eeq)

(definition of eeq)

(make sure to point out that x ==> y implies x ~= y)

## Stepping with Valuable Expressions

Recall from the previous article that SML uses eager evaluation.
In other words, the parameters of a function are evaluated before
stepping into the function.

When proving theorems about SML code, though, we often end up in
a situation where we want to step into a function, but the function
is being applied to an expression that isn't a value.

We will look at an example of this situation, involving the functions
`@` (append) and `rev`. The definition of `@` is as follows:

```sml
fun [] @ L = L
  | (x::xs) @ L = x::(xs@L)
```

Now, suppose we want to show the following theorem:

`(x::xs) @ (rev A)` \( \cong \) `x::(xs @ (rev A))`

where `x : int`, `xs : int list`, and `A : int list` are all values.
First, make sure this "feels right" -- the left side of our theorem
matches the second clause of `@` with `rev A` bound to `L`.

However, notice that `rev A` is not a value. Since SML is eager, we
cannot step into the function `@` until we evaluate the expression
`rev A`. In other words,

\[ `(x::xs) @ (rev A)` \not\Longrightarrow `x::(xs @ (rev A))` \]

So, we're stuck! D:

... or are we?

Let's assume that `rev A` is valuable, i.e. it evaluates to a value,
and let's give that value a name-- say, `v : int list`:
\[ `rev A` \Longrightarrow `v` \]
With this value in hand, we can do what we wanted to do!

\[ `(x::xs) @ (rev A)`
    \Longrightarrow `(x::xs) @ v`
    \Longrightarrow `x::(xs @ v)`
\]

Notice that this complies with SML's eager evaluation, since
we are fully evaluating the parameters of `@` before stepping
into the function.

And here's the kicker: we can also use `v` to evaluate the right
hand side of our theorem!

\[ `x::(xs @ (rev A))`
    \Longrightarrow `x::(xs @ v)`
\]

Again, this complies with SML's eager evaluation-- in this case,
we never even step into the definition of `@`. But, we've actually
proven our theorem! We showed that the LHS and the RHS both evaluate
to the same expression, so by rule 1 of the definition of \( \cong \),
the LHS and RHS must be extensionally equivalent. We are done!

In this example, we got around SML's eager evaluation by assuming
that our parameter `rev A` is valuable, and as it turns out, this
concept holds in the general case. If we know
the parameter of a function is *valuable*, then we can step into the
function *without* first evaluating that parameter. This principle,
which we will call (for lack of a better term) "stepping with
valuable expressions," is one reason why valuable expressions are
so important.

> **[Caution!]** When stepping with *values*, we can use the reduction
relation \( \Longrightarrow \). When stepping with *valuable expressions*,
this is not always true (it certainly is not true in the example
above). Stepping with valuable expressions only preserves
extensional equivalence \( \cong \).


## Totality

In the last section, we saw how useful it is to know that an
expression is valuable. In this section, we present one common
way to show that an expression is valuable.

(talk about totality)
