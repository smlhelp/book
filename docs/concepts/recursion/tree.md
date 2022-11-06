# Trees

_By Len Huang, August 2020_

There's a strong association between mathematical induction and recursion, especially in SML. Often times, we'll be able to use similar vocabularies when describing SML problems and mathematical induction. In particular, we're going to be use the words **base case, induction hypothesis, and induction step** to describe both types of problems.

## Inductive Intuition

Approaching induction proofs can fall along the following line of logic:

1. Solve the **base cases**.
2. Define the **inductive hypothesis**.
3. Assume the correctness of the **inductive hypothesis** to show the correctness of the **inductive step**.

We can similarly apply this line of logic to solving problems with SML functions! Let's take a look at a common recursive problem. `treeSum` takes an int tree and returns the sum of all the integers in that tree. By the end of this, we'll be able to implement recursive functions with the following inductive logic:

```sml
fun treeSum (Empty : int tree) : int = 0
  | treeSum (Node(L,x,R)) = treeSum(L) + treeSum(R) + x
```

> The **base case** for `treeSum` is that an `Empty` tree has a sum of 0. Let's define the **inductive hypothesis** to be that for some tree `T`, that `treeSum` is correct for its left subtree and right subtree. Define my **inductive step** to be for a tree `T = Node(L,x,R)`. By the definition of trees, I know that all integers in `T` are represented by the integers in `L`, `R`, and the integer `x`. If I sum all of these, I will get `treeSum(T)`. By assuming the **IH**, I can say that `treeSum L` and `treeSum R` are correct. Therefore, by math, I will say that `treeSum T = (treeSum L) + (treeSum R) + x` is correct by the above reasoning. As such, I've shown my **IS** to be correct, and thus the theorem that `treeSum T` is correct for all `T : int tree`.

## An Exploration of Tree Sums

Let's define `treeSum`. This function should take in an `int tree` and return the sum of all the integers in that tree.

```sml
datatype int tree = Empty | Node of int tree * int * int

fun treeSum (T : int tree) : int = ...
```

Note that in SML, the `tree` datatype is recursively defined. This is a good hint that we should be using recursive/inductive strategies to approach this problem. Consider the proof of the following theorem:

> **Theorem:** For all `T : int tree`, `treeSum T` is correct.

Let's not worry about formalizing this proof too much so that we can focus on the **inductive intuition** of it. If we were to prove this using induction, we'll need a **(1) base case, (2) induction hypothesis, and (3) induction step.**

### 1. Solving for the Base Cases

Let's first think about proving the base case: `T = Empty`. What does it mean for `treeSum Empty` to be correct? Well, an `Empty` tree does not have any nodes, and if there are no nodes, there are no `int` values. The sum of nothing is 0. Let's write that in a proof-like manner:

> **Base Case:** `T = Empty`
>
> - `treeSum(Empty) ==> 0` because an `Empty` int tree does not have an int value.

That wasn't so bad! If we have an empty node, we can't have a value there, and so the sum is 0. Before we move on to solving the recursive step, let's tie in this idea of how recursion and induction are related. In our proof, we say that `treeSum Empty` is correct when it evaluates to 0. Let's use this as an answer to how to define the base case of our function:

```sml
fun treeSum (Empty : int tree): int = 0
```

Nice job! We've leveraged inductive reasoning to help us define the base case for our recursive problem. Let's move on to something a little harder and may be less obvious than what we've done here.

### 2. Define the Inductive Hypothesis

The next step in our proof is to define the inductive hypothesis. Here, we'll assume the correctness of a smaller part, then use that to prove the correctness of a bigger part. More specifically, we'll be using some ideas of structural induction for this problem. Let's elaborate more on that:

> **Induction Hypothesis:** Assume for all `L : int tree` and `R : int tree` that `treeSum L` is correct and `treeSum R` is correct.

Because we've shown our base case to be true, let's assume tha for the recursive structures (the left subtree `L` and the right subtree `R`), `treeSum` is correct. Just like how in induction we can use these nuggets of information to help us prove our **inductive step**, we can do the same to help us solve the SML function.

### 3. Assume the Inductive Hypothesis to Show the Inductive Step.

What nuggets of information do we know from the previous step, and how can we use that to help us with inductive step? We assume that both `treeSum L` and `treeSum R` are correct by the **inductive hypothesis (IH)**. Since they are correct, their outputs represent the sum of all the integers in them. For `treeSum L` is the sum of all integers in the int tree `L` and for `treeSum R` is the sum of all integers in the int tree `R`.

We also know that since `L` and `R` are the left and right subtrees of `T`, by definition, they represent all nodes of `T` (except the root node). Then, to get sum of `T`, we just need the sum of `L`, `R`, and the value of the root node! Let's proof-ify this line of thought a bit more:

> **Inductive Step:** `T = Node(L,x,R)`
>
> - `treeSum L` is correct by **IH**
> - `treeSum R` is correct by **IH**
> - "All integers in `T`" are represented by "all integers in `L`", "all integers in `R`", and `x` by definition of trees.
> - The sum of "all integers in `T`" is the sum of "all integers in `L`, "all integers in `R`", and the integer `x`.
> - `treeSum T = (treeSum L) + (treeSum R) + x` by definition of `treeSum`.
> - `(treeSum L) + (treeSum R) + x` is correct by math and above logic.
> - `treeSum T` is correct by substitution.

Using the logic needed to complete the proof, we were able to arrive at how to implement our function! Let's translate the above logic into SML:

```sml
fun treeSum (Empty : int tree) : int = 0
  | treeSum (Node(L,x,R)) = (treeSum L) + (treeSum R) + x
```

## QED

And like that, we're able to leverage mathematical induction to help us find the solution to part of an SML function. For some, this intuition is obvious. But for others, it isn't! A deep spiral of pure math and proving every single aspect of your code isn't usually needed. **BUT**, it will definitely be helpful to adopt this style of thinking when approaching more difficult and advanced recursion problems. Whenever you're trying to implement a recursive function in SML, remember to think inductively!

1. Solve the **base cases**.
2. Define the **inductive hypothesis**.
3. Assume the correctness of the **inductive hypothesis** to show the correctness of the **inductive step**.
