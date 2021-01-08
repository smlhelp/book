<!-- Idk why but my title is not rendering right -->
<!-- unless i put this here -->

# Thinking About Recursion Inductively

There's a strong association between mathematical induction and recursion, especially in SML. Often times, we'll be able to use similar vocabularies when describing SML problems and mathematical induction. In particular, we're going to be use the words **base case, induction hypothesis, and induction step** to describe both types of problems.

In essence, we'll be able to approach writing SML functions the same way we approach writing induction proofs.

## Inductive Intuition

Approaching induction proofs can fall along the following line of logic:

1. Solve the **base cases**.
2. Define the **inductive hypothesis**.
3. Assume the correctness of the **inductive hypothesis** to show the correctness of the **inductive step**.

We can similarly apply this line of logic to solving problems with SML functions! We'll look at two problems that can be solved with recursion: `fact` and `len`.

## Factorial

The following function implements the factorial operator in SML.

```sml
(* REQUIRES: n >= 0
 * ENSURES:  fact n ==>* (n)(n-1)...(1), or n! *)
 fun fact (0 : int) : int = 1
   | fact (n : int) : int = n * fact (n - 1)
```

Let's think of this as a proof of extensional equivalence. I want to show that `fact` is equivalent to the mathematical definition of [factorial](https://en.wikipedia.org/wiki/Factorial).

#### Factorial -- (1) Solve the Base Cases

## QED

And like that, we're able to leverage mathematical induction to help us find the solution to part of an SML function. For some, this intuition is obvious. But for others, it isn't! A deep spiral of pure math and proving every single aspect of your code isn't usually needed. **BUT**, it will definitely be helpful to adopt this style of thinking when approaching more difficult and advanced recursion problems. Whenever you're trying to implement a recursive function in SML, remember to think inductively!

1. Solve the **base cases**.
2. Define the **inductive hypothesis**.
3. Assume the correctness of the **inductive hypothesis** to show the correctness of the **inductive step**.

### More Examples

1. Tree Sum

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
