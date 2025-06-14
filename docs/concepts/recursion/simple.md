---
sidebar_position: 1
---

# Simple Induction

_By Len Huang, August 2020. Rewritten by Thea Brick, July 2023._

There's a strong association between mathematical induction and recursion,
especially in SML. Often times, we'll be able to use similar vocabularies when
describing SML problems and mathematical induction. In particular, we're going
to be use the words **base case, induction hypothesis, and induction step** to
describe both types of problems.

## Inductive Intuition

Approaching induction proofs can fall along the following line of logic:

1. Case and solve the **base cases**.
2. Case on the **inductive case** or **inductive step**
3. Define the **inductive hypothesis**.
4. Assume the correctness of the **inductive hypothesis** to show the
   correctness of the **inductive step**.

> You can think of this like a train pulling away from a station. The
> **base case** is the front of the train starting to move. We want to show that
> some car down the line jerks forward, the **inductive step**, and to do so we
> use the assumption that the train-car before it jerks forward, the
> **inductive hypothesis**.

We can similarly apply this line of logic to solving problems with SML
functions! Let's take a look at a common recursive problem, the factorial
function. Let `fact` take a natural number and we want it to return the
mathematical factorial of that number. We can define it as follows:

```sml
(* REQUIRES: n >= 0
 * ENSURES:  fact n evaluates to n factorial
 *)
fun fact (n : int) : int =
  case n of
    0 => 1
  | _ => n * fact (n - 1)
```

This definition might not be the most clear for how it relates to our notion
of mathematical induction, so we can re-write to potentially make it more clear:

```sml
(* REQUIRES: n >= 0
 * ENSURES:  fact n evaluates to n factorial
 *)
fun fact (n : int) : int =
  case n of
    0 => 1
  | _ =>
    let
      val res = fact (n - 1)
    in
      n * res
    end
```

For this function the **base case** in our inductive proof parallels the
non-recursive case in `fact`, i.e. when `n` is `0`. Our **inductive step/case**
is when `n` is not zero, the recursive case. The **inductive hypothesis** is
`fact (n - 1)`, i.e. `res`, which is our recurisve call. We want to show in our
inductive step that `n * res` is the factorial of `n`, given that `res` is the
factorial of `n - 1`.

# An Explained Formal Proof

Lets try and write and prove this a little more formally. We'll start by
restating the theorem:

> **Theorem:** For all `n : int` such that `n >= 0`, `fact n` = $$n!$$.

Now we proceed with the proof, stating any assumptions (none in this case) and
what we are inducting on:

> **Proof:** We proceed by induction on `n`.

And now we go into our non-recursive, base case:

> **Base case:** `n = 0`:

To prove this base case, we want to show that `fact 0` = $$0!$$. We do so by
stepping through the function `fact`:

> **WTS:** `fact 0` = $$0!$$ = $$1$$.
>
> **Showing:**
>
> $$
\begin{aligned}
 & \texttt{fact 0} && \hspace{1cm} &&& \\
 \Longrightarrow\ & \texttt{case 0 of ...} &&& \\
 \Longrightarrow\ & \texttt{1} && &&&\text{(first clause of case)} \\
 \end{aligned}
> $$

We've shown that by stepping through `fact 0`, that it evaluates to `1`, which
is what we wanted to show. Thus our **base case** is shown.

Now we can proceed to our inductive step. In typical mathematical induction,
you'll usually see the **inductive step** be $$n + 1$$ (with an
**inductive hypothesis** being $$n$$), but when proving things about code, it is
often nicer to let the inductive step by $$n$$ and the **inductive hypothesis**
be $$n - 1$$, since that more generally matches the recursive calls we see.

> **Inductive Case:** `n = n'`, for some `n' : int > 0`

Notice how we said `n = n'`. This might seem redundant (because it is in this
case) but it is important to carefully consider the scope and quantifications of
variables in proofs, just like it is important to do so in code.

Okay so now lets write our **inductive hypothesis**. We assume that
`fact (n' - 1)` = $$(n' - 1)!$$:

> **Inductive Hypothesis:** `fact (n' - 1)` = $$(n' - 1)$$

Notice how when we wrote the **inductive step**, we wrote "... for some `n'`
...", we wouldn't say "... for all `n'` ..." because that is precisely what the
overall theorem is stating, i.e. it is what we are trying to prove.

> Going back to our train example, using "for all" would be like saying "Assume
> all train cars jerk forward". Of course any one given train-car moves forward,
> because we just assumed they all did.

This is why our **inductive hypotheis** uses `n'` specifically. We are
explicitly limiting what our **inductive hypothesis** applies to. In general, it
is very important to define every variable you use in a proof, just like you
would when programming.

In this case, we want to show that `fact n'` = $$n'!$$. Then we want to actually
prove it:

> **WTS:** `fact n'` = $$n!$$
>
> **Showing:**
>
> $$
\begin{aligned}
 & \texttt{fact n'} && \hspace{1cm} &&& \\
 \Longrightarrow\ & \texttt{case n' of ...} &&& \\
 \Longrightarrow\ & \texttt{let val res = fact (n' - 1) in ... end} && &&&\text{second clause of case} \\
 \Longrightarrow\ & \texttt{n * res} && &&&\text{IH, \texttt{res} is a value equal to $$(n' - 1)!$$} \\
 =\               & n! \\
 \end{aligned}
> $$

There are a few important things to note. First, notice how `res` explicitly
represents result of our **inductive hypothesis** and recursive call. Secondly,
our recursive call specifically used `n'`, which matches what we said in our
**IH**, using a different value/variable makes the proof less clear, and in
some cases, lets your proove false things. Finally, note how we stay that
`n * res` is $$=$$ to $$n!$$. This is because our SML code
doesn't evaluate to the mathematical expression of $$n!$$, it is merely
equivalent to it.

Notice the parallels, the **base case** is the non-recursive case, the
**inductive step/case** is the recursive case, and the **inductive hypothesis**
is the recursive call. In fact we can generalize this even further. What we've
done is essentially cased, but in some places (the recursive parts), we've been
given an extra assumption (the **inductive hypothesis**). You may find this
interpretation useful when we expand our notion of induction past just numbers.

## Deviations to the Proof

Unfortunately, mathematical proofs being written in English prose means that
there are a variety of ways to write the same thing. One common practice is to
write the **inductive hypothesis** before we write the **inductive step**. When
doing this, we must pay extra attention to the variables we use. Specifically,
we must pay attention to: not assume what we wish to prove and to not use
undefined/unquantified variables.

So, if we were to re-write our **inductive hypothesis** to be before the
**inductive step** in our proof above, we should re-write it to be:

> **Inductive Hypothesis:** For some `n' : int >= 0`, `fact (n' - 1)` =
> $$(n' - 1)$$
>
> **Inductive Step:** `n = n'`
> ...

Notice we now explicitly define and quantify ("some") `n'` in our
**inductive hypothesis**, this means using `n'` within the **IH** makes sense,
because we've fully defined what it means.

So, we were able to utilize induction to help us be certain that a piece of code
is correct. We can throw aside extensive test cases because we know,
mathematically, that what we wrote is correct.

## Full Proof

Here's the full we wrote above without any commentary, if you'd find that
helpful:

**Theorem:** For all `n : int` such that `n >= 0`, `fact n` = $$n!$$.


**Proof:** We proceed by induction on `n`.

**Base case:** `n = 0`:

**WTS:** `fact 0` = $$0!$$ = $$1$$.

**Showing:**

$$
\begin{aligned}
 & \texttt{fact 0} && \hspace{1cm} &&& \\
 \Longrightarrow\ & \texttt{case 0 of ...} &&& \\
 \Longrightarrow\ & \texttt{1} && &&&\text{(first clause of case)} \\
 \end{aligned}
$$

**Inductive Case:** `n = n'`, for some `n' : int > 0`

**Inductive Hypothesis:** `fact (n' - 1)` = $$(n' - 1)$$

**WTS:** `fact n'` = $$n!$$

**Showing:**

$$
\begin{aligned}
 & \texttt{fact n'} && \hspace{1cm} &&& \\
 \Longrightarrow\ & \texttt{case n' of ...} &&& \\
 \Longrightarrow\ & \texttt{let val res = fact (n' - 1) in ... end} && &&&\text{(second clause of \texttt{case})} \\
 \Longrightarrow\ & \texttt{n * res} && &&&\text{(IH, \texttt{res} is a value equal to $$(n' - 1)!$$)} \\
 =\               & n! \\
 \end{aligned}
$$

Thus we have shown by induction that for all `n : int` such that `n >= 0`,
`fact n` = $$n!$$.
