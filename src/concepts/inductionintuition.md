<!-- Idk why but my title is not rendering right -->
<!-- unless i put this here -->

# Thinking About Recursion Inductively

There's a strong association between mathematical induction and recursion,
especially in SML. Often times, we'll be able to use similar vocabularies
when describing SML problems and mathematical induction. In particular, we're
going to be use the words **base case, induction hypothesis and induction step**
to describe both types of problems. In essence, we'll be able to approach
writing SML functions the same way we approach writing induction proofs.

<!-- TODO: Put a reference to induction workshop / general induction review -->

> This page assumes an understanding of mathematical induction proofs. If you
> need a refresher on this subject, check out this
> [Wikipedia Page](https://en.wikipedia.org/wiki/Mathematical_induction).

## Inductive Intuition

Approaching induction proofs can fall along the following line of logic:

1. Solve the **base cases**.
2. Define the **inductive hypothesis**.
3. Prove the **inductive step** by assuming the IH.

We can similarly apply this line of logic to solving problems with SML
functions! We'll look at a problems that can be solved with recursion: `fact`.
We'll look at how thinking of it's proof relates to implementing the problem.

## Factorial

Let's say your asked to implement the following function with these specs.

```sml
(* REQUIRES: n >= 0
 * ENSURES:  fact n ==>* (n)(n-1)...(1), or n! *)
 fun fact (n : int) = ...
```

We can think of this as a proof of extensional equivalence. I want to show that
`fact` is equivalent to the mathematical definition of
[factorial](https://en.wikipedia.org/wiki/Factorial). Let's set up this proof
and use that to help implement the function.

### Factorial -- Want To Show

We want to prove the following theorem:

> For all `n` such that `n >= 0`, `fact n == n!`.

_In other words, the `fact` function is equivalent to the mathematical_
_factorial operator._

### Factorial -- (1) Solve the Base Cases

We want our base case of `fact` to be equivalent to the base case of
mathematical factorial. Since factorial is undefined for negative numbers,
our first valid "input" to the factorial number is `0`. In other words,
`0! = 1`. Because we want our `fact` function to be equivalent, we will
define it in this way.

```sml
(* REQUIRES: n >= 0
 * ENSURES:  fact n ==>* (n)(n-1)...(1), or n! *)
fun fact(0 : int) : int = 1
```

The correctness proof is as follows;

> **Base Case: `n = 0`**
>
> - `0! = 1` by math
> - `fact 0 ==>* 1` by clause 1 of `fact`.
> - `1 = 1` as desired

### Factorial -- (2) Define the Induction Hypothesis

The next step of our proof is the inductive hypothesis. We want to assume
that our theorem holds for all "smaller" scenarios. In other words,

> **Induction Hypothesis:** For all `k` such that `0 <= k < n`, `fact k == k!`.

### Factorial -- (3) Show the Inductive Step

In most induction proofs, you would make a few logical deductions, apply the
IH (induction hypothesis) and prove the theorem. When we think about how to
implement `fact`, we will do something similar! Ask yourself,
**"what can I say if I assume `fact (n-1) == (n-1)!`?** (this assumption is
given by our **IH**).

> **💡 Key Insight 💡**
>
> _When solving the recursive case of an SML function, try to ask yourself: "How would I solve this if I assume the recursive call is correct?"_

Well, we know that the mathematical definition of factorial is the product of
all nonnegative integers up to `n`. Note, by definition, that `n! == n * (n-1)!`.
But also note, that by our **IH**, `(n-1)! == fact (n-1)`. From here, we gain
the insight that `n! == n * fact (n-1)`. Just like in the base case, because
we want our `fact` function to be equivalent, we will define it in this way.

```sml
(* REQUIRES: n >= 0
 * ENSURES:  fact n ==>* (n)(n-1)...(1), or n! *)
fun fact(0 : int) : int = 1
  | fact(n : int) : int = n * fact (n-1)
```

The correctness proof is as follows:

> **Induction Step: `n`**
>
> - `n! == n * (n-1)!` by math
> - `n! == n * fact (n-1)` by IH
> - `n! == fact n` by clause 2 of `fact`

And so we have shown for all `n` such that `n >= 0`, `fact n == n!`.

## QED

And like that, we're able to leverage mathematical induction to help us implement
an SML function. For some, this intuition is obvious. But for others, it isn't! A
deep spiral of pure math and proving every single aspect of your code isn't usually
needed. **BUT**, it will definitely be helpful to adopt this style of thinking when
approaching more difficult and advanced recursion problems. Whenever you're trying
to implement a recursive function in SML, remember to think inductively!

1. Solve the **base cases**.
2. Define the **inductive hypothesis**.
3. Prove the **inductive step** by assuming the IH.

## More Examples

Here are some more examples, with their code, thought processes, and proof outlines.

### List Length

```sml
fun len ([] : int list) : int = 0
  | len (x::xs) = len(xs) + 1
```

### Tree Sum

```sml
fun treeSum (Empty : int tree) : int = 0
  | treeSum (Node(L,x,R)) = treeSum(L) + treeSum(R) + x
```

> The **base case** for `treeSum` is that an `Empty` tree has a sum of 0. Let's define the **inductive hypothesis** to be that for some tree `T`, that `treeSum` is correct for its left subtree and right subtree. Define my **inductive step** to be for a tree `T = Node(L,x,R)`. By the definition of trees, I know that all integers in `T` are represented by the integers in `L`, `R`, and the integer `x`. If I sum all of these, I will get `treeSum(T)`. By assuming the **IH**, I can say that `treeSum L` and `treeSum R` are correct. Therefore, by math, I will say that `treeSum T = (treeSum L) + (treeSum R) + x` is correct by the above reasoning. As such, I've shown my **IS** to be correct, and thus the theorem that `treeSum T` is correct for all `T : int tree`.

> **Base Case:** `T = Empty`
>
> - `treeSum(Empty) ==> 0` because an `Empty` int tree does not have an int value.
>
> **Induction Hypothesis:** For subtrees `L, R`, `treeSum(L)` and `treeSum(R)` are correct.
>
> **Inductive Step:** `T = Node(L,x,R)`
>
> - `treeSum L` is correct by **IH**
> - `treeSum R` is correct by **IH**
> - "All integers in `T`" are represented by "all integers in `L`", "all integers in `R`", and `x` by definition of trees.
> - The sum of "all integers in `T`" is the sum of "all integers in `L`, "all integers in `R`", and the integer `x`.
> - `treeSum T = (treeSum L) + (treeSum R) + x` by definition of `treeSum`.
> - `(treeSum L) + (treeSum R) + x` is correct by math and above logic.
> - `treeSum T` is correct by substitution.
