---
sidebar_position: 2
---

# Recursion and Induction

_By Jacob Neumann and Kaz Zhou, May 2022_

## Introduction

Functional programmers have a particular affinity for the technique of **_recursion_**. Recursion is a way of writing functions: a given SML function either will or won't be _recursive_, and you can tell by looking at its declaration. Most of the main functions (i.e. the ones doing the "real work" of a problem) you write when programming in a functional style will be recursive, and _thinking recursively_ is an essential skill for functional programming. Indeed, many of the features of functional programming languages like SML are designed to facilitate writing recursive functions.

Going hand-in-hand with recursion is the proof technique of **_induction_**. Induction is a tool used throughout mathematics, and will form the basis for the mathematical analysis of functional programming. To prove the correctness of a recursive function, the natural (and often the only) choice is to make use of an inductive argument. Moreover, the form of the recursive function will suggest to us the structure of the inductive proof. In this article, we'll develop this connection for natural numbers and integer lists. The connection between recursion and induction for trees is explored [here](tree.md). A specific kind of recursion, called _tail recursion_, is discussed [here](tail.md).

## Iterative versus Recursive Thinking

Here's a simple programming problem: write a function `exp` which takes in a natural number $n$ (an integer greater than or equal to zero) and returns the quantity $2^n$. Of course, $2^n$ is just the quantity 2 multiplied by itself $n$ times (e.g. $2^3 = 2 \times 2 \times 2$), with the edge case of $2^0 = 1$. Now, if we were asked to solve this problem in an _imperative programming language_ (like Python or C), our first instinct might be to do something like this:

```c
// requires: n >= 0
int exp (int n) {
    int i = 0;
    int res = 1;
    while (i < n) {
        res *= 2;
        i++;
    }
    return res;
}
```

This code directly solves the problem by "multiplying by 2, n times": it establishes a "result" `res`, and then repeatedly mutates `res` by multiplying by 2. The counter `i` and the loop guard are there to make sure that we do this exactly $n$ times, giving $2^n$. This is what's called an **_iterative solution_**: it consists of initializing our data (in this case, the values stored in `res` and `i`), performing a carefully-chosen sequence of mutations to it (doubling `res` and incrementing `i`), and then reading off the result (the value in `res`). It is this style of thinking which plays a central role in imperative programming.

Such a solution is not possible when doing functional programming. Indeed, pure functional programming languages (by definition[^1]) do not have data "cells" which can be repeatedly modified (as `i` and `res` are in the preceding example): everything in a functional programming language is **_immutable_**. If `i` is a "variable" in a functional programming language, `i` has just one value and will never have a different value. So we must find a different way to solve this problem. Our solution will be to use **_recursion_**.

The following is a correct SML implementation of `exp`. Type annotations have been omitted, for clarity.

```sml
(* exp : int -> int
 * REQUIRES: n>=0
 * ENSURES: exp n == 2^n
 *)
fun exp 0 = 1
  | exp n = 2 * exp(n-1)
```

In the above code, we specify the **_base case_** that $2^0 = 1$. Then, for inputs greater than 0, we first compute $2^{n-1}$ recursively, and then multiply 2 to it. By "recursively", we are assuming our code works for smaller inputs. You can trace through a few test cases to convince yourself that these elegant two lines of code indeed implement `exp`.

## Proof by Induction

Perhaps test cases are not enough for you, or you would like to see the deep connection between induction and recursion. We can use the principle of mathematical induction to **_prove_** that our `exp` code works. Here is the theorem we want to show. Recall that we use `==` to denote two expressions being extensionally equivalent.

**Theorem:** $\texttt{exp} \ n = 2^n$ for all integer values $n \geq 0$.

**Proof:** We use the principle of mathematical induction on $n$.

**Base case (BC):** We prove the theorem for $n = 0$.

$$
\begin{aligned}
& \
  \texttt{exp} \ n
\\ = & \
  1 && \text{clause 1 of \texttt{exp}}
\\ = & \
  2^0 && \text{math}
\end{aligned}
$$

When dealing with arithmetic, we may justify proof steps by "math". Also, unless stated otherwise, we may assume SML implements basic mathematical operations correctly, such as `+` and `*`.

**Inductive step (IS):** Let $k \geq 0$ be fixed.

**Induction hypothesis (IH):** Assume the theorem holds for $k$, i.e., assume $\texttt{exp} \ k = 2^k$.

We want to show the theorem holds for $k + 1$, i.e. we show $\texttt{exp} \ k = 2^k$.

$$
\begin{aligned}
& \
  \texttt{exp} \ (k + 1)
\\ = & \
  2 \times \texttt{exp} \ (k + 1 - 1) && \text{clause 2 of \texttt{exp}}
\\ = & \
  2 \times \texttt{exp} \ k && \text{math}
\\ = & \
  2 \times 2^k && \text{IH}
\\ = & \
  2^{k + 1} && \text{math}
\end{aligned}
$$

This concludes the inductive step.

There are some things to note about this proof. First, every time we are evaluating SML code, we justify which line of code allows us to make a particular step. For example, when evaluating `exp (k+1)`, clause 2 of `exp` tells us that expression is extensionally equivalent to `2 * exp (k+1-1)`. In fact, we can say `exp (k+1)` **_steps to_** `2 * exp (k+1-1)`.

Second, we've abbreviated the induction hypothesis citation as "IH". Furthermore, note how we quantified the induction hypothesis: we are not assuming the theorem is true for all natural numbers. Rather, we assume the theorem is true for some fixed `k` (which is $\geq 0$).

The principle of mathematical induction works due to a sort of domino effect. Let's notate that the theorem is true for an integer $n$ with $P(n)$. In the above proof, we've shown $P(0)$, and that $P(k) \implies P(k+1)$ for all $k \geq 0$.

For example, suppose we wanted to show $P(2)$. We begin with $P(0)$, and from the inductive step get $P(1)$. Then we apply the inductive step again to get $P(2)$.

## The "Type" of Natural Numbers

We can _inductively_ define the natural numbers using Peano's axioms:

$0$ is a natural number. For every natural number $n$, $S(n)$ is a natural number.

We call $S(n)$ the successor of $n$. It's just a fancy term for saying "add 1". Using these axioms, we can create a datatype that encapsulates natural numbers:

`datatype nat = Zero | Succ of nat`

This is essentially saying that `Zero : nat`, and if some expression `e : nat`, then `Succ e` also has type `nat`. For example, the number 3 corresponds to `Succ (Succ (Succ Zero))`.

Using this datatype, we can view the principle of mathematical induction merely as **_structural induction_** on the `nat` datatype. As an example, let us rewrite `exp` as:

```sml
(* exp' : nat -> int
 * REQUIRES: true
 * ENSURES: exp' n == 2^n
 *)
fun exp' Zero = 1
  | exp' (Succ n) = 2 * exp' n
```

The `ENSURES` is a bit sloppy because we haven't defined taking exponents of values of type `nat`, but hopefully it has meaning for the code's reader. Now, if we wanted to prove the correctness of this version of `exp'`, our base case would be showing `exp' Zero == ` $2^0$. The inductive step would be showing that if `exp' n == ` $2^n$, then `exp' (Succ n) == ` $2^{n+1}$. We'll omit the proof's details.

It may seem pointless to write the above code (indeed, it is not that practical). But, there are two advantages: we don't need to restrict the inputs to `exp'` anymore, because negative numbers are not natural numbers! So, we won't need to worry about looping forever, which would happen in the earlier version of `exp` if we tried evaluating `exp ~1`. Also, the code portrays how **_structural induction_** is basically an overpowered version of the principle of mathematical induction.

## Strong induction

For proofs on natural numbers, we can also make use of **_strong induction_**. With strong induction, the inductive step is showing that for an arbitrary $k > 0$, $P(0), P(1), \cdots, P(k-1)$ all together imply $P(k)$. In other words, we can make use of the theorem being true on all previous natural numbers, as our induction hypothesis.

With `exp`, the recursive case only references `exp (n-1)`, so the principle of mathematical induction (also known as simple induction) is sufficient. But for code which references not just the previous number, strong induction will be useful in proofs. For example, let us rewrite `exp` one last time:

```sml
(* exp'' : int -> int
 * REQUIRES: n >= 0
 * ENSURES: exp'' n == 2^n
 *)
fun exp'' 0 = 1
  | exp'' 1 = 2
  | exp'' n = exp'' (n-1) + 2 * exp'' (n-2)
```

This code is needlessly complicated and inefficient, but it works. It only exists for us to illustrate strong induction. The recursive case uses both `n-1` and `n-2`, so we'll need strong induction to prove the correctness of `exp''`.

In addition, **the proof mirrors the code.** What we mean by this is, there should be a different case for each clause of the function. Our proof would have a base case for both `n = 0` and `n = 1`, because the first two clauses of `exp''` deal with those cases. Again, we omit the details of proving `exp''`'s correctness.

## List Recursion

Let's first define lists. Here are some examples of `int list`s:

```sml
[1,5,1,5,0]
[42,~42]
[]
```

The last one is called the empty list. We can also build lists containing other types:

```sml
["h","e","l","l","o"]
```

Let `t` be some type. Intuitively, a value of type `t list` has a bunch of values of type `t` inside it (or is the empty list). We can readily access the first element of the list (also called the **_head_**) by pattern matching with the `::` operator (pronounced "cons").

We can build lists using the constructors `[]` and `::`. The empty list, `[]`, is the base case. The inductive case is `::`, which is an infix operator that takes in `t * t list` and creates a `t list`. For example, `1::[]` is the list `[1]`, and `1::[2,3]` is the list `[1,2,3]`. It adds an element to the front of a list.

The inductive definition of lists means that it's natural to write recursive functions on lists. We can write a function that computes the length of a list as follows:

```sml
(* length : int list -> int
 * REQUIRES: true
 * ENSURES: length L returns the number of values in L.
 *)
fun length [] = 0
  | length (x::xs) = 1 + length xs
```

Our function takes in an `int list`, and outputs an `int`. For the empty list, we return 0 straight away. A nonempty list has the form `x::xs`, where `x` is the first element of the list, and `xs` is the rest of the list. (Perhaps `xs` means there are many `x`'s, or it's a homophone of "excess". We will never know.) In the recursive case, we calculate the length of the rest of the list by evaluating `length xs`, and then add 1 to account for `x` being in the original list as well.

Now, let's write a slightly more complex function, `@`, which appends together two lists. It is an infix operator, and to notate this we write `infix @`. Here are examples of using `@`:

```sml
[1,2,3] @ [4,5,6] == [1,2,3,4,5,6]
["s", "o"] @ ["u", "p"] == ["s", "o", "u", "p"]
[] @ [] == []
```

Here is the implementation:

```sml
(* @ : int list * int list -> int list
 * REQUIRES: true
 * ENSURES: A @ B evaluates to a list with
 * all the elements of A, then all the elements of B
 *)
infix @

fun [] @ B = B
  | (x::xs) @ B = x::(xs @ B)
```

Our `@` function recurses on the left list. If it's empty, we just return the right list. If it's nonempty, we evaluate `xs @ B`, and then tack on `x` to the beginning.

## List Induction

Let's consider proofs by structural induction on lists. Let's say we want to show that some property $P$ is true for all values of type `t list`. It suffices to show the following:

**Base case:** $P([])$. In other words, we show the theorem holds for the empty list.

**Inductive step:** For any value `xs : t list`, and any value `x : t`, $P(\texttt{xs}) \implies P(\texttt{x :: xs})$.

For example, if the type `t` is `int`, then $P([1, 2])$ is true because the base case tells us $P([])$, and then one application of the inductive step gets us $P(2 :: [])$, and one more application of the inductive step gets us $P(1 :: 2 :: [])$. Remember that `1::2::[]` is the same thing as `[1,2]`.

### Proving the totality of `length`

Recall the code of `length`, which has type `int list -> int`:

```sml
fun length [] = 0
  | length (x::xs) = 1 + length xs
```

**Theorem:** for all values `L : int list`, `length L` evaluates to a value.

In other words, the theorem states that the function `length` is **_total_**. We'll use `==>` throughout the proof to denote "steps to", as we are trying to show `length L` evaluates to a value.

> Be careful not to mix up `==>` and `==`. For example, `4 == 2+2` is true because the expressions are extensionally equivalent, but no compiler in their right mind would step `4` to `2+2`. Therefore `4 ==> 2+2` is nonsense.)

> Furthermore, "steps to", or `==>`, is very different from $\implies$. `==>` is used when talking about expressions in SML. $\implies$ is not particular to SML, since it's the symbol for logical implication.

**Proof:** We'll use structural induction on `L`.

**Base case:** We prove the theorem when `L` is `[]`.

`length [] ==> 0` by clause 1 of `length`. `0` is a value, as desired.

**Inductive step:** Let `xs` be some value of type `int list`.

Induction hypothesis: Assume that `length xs` evaluates to a value.

Let `x : int` be an arbitrary value. We want to show that `length (x::xs)` evaluates to a value.

`length (x::xs) ==> 1 + length xs` (by clause 2 of `length`)

`==> 1 + v` (by IH, `length xs ==> v` for some value `v`)

Now, `1 + v` evaluates to a value (we assume that SML implements operators like `+` correctly, and we do not care about overflow). This concludes the inductive step.

Note how powerful structural induction is! We've proven a fact about _all_ values of type `int list` (there are very many such values). To conquer the infinite, we only needed to prove a base case and the inductive step, due to the inductive nature of lists.

Let's now sketch out a proof that `@` is total (that is, for all values `A : int list` and `B : int list`, `A @ B` evaluates to a value). Recall the code of `@`:

```sml
fun [] @ B = B
  | (x::xs) @ B = x::(xs @ B)
```

Note that the code of `@` does not care what the right list, `B`, looks like! We only case on whether the left list is empty or nonempty. As such, it makes sense that a proof about `@` would use structural induction on the left list, `A`. (Again, **the proof mirrors the code**!)

The base case would involve proving `[] @ B` evaluates to a value, for any `B : int list`.

The inductive step would roughly be: given an arbitrary `xs : int list` and `x : int`, prove that for all `B : int list`, the fact that `xs @ B` evaluates to a value implies that `(x::xs) @ B` evaluates to a value.

We leave the proof's details as an exercise, but they are quite similar to the proof that `length` is total. The main difference is we are letting `B` be an arbitrary value of type `int list` throughout the entire proof.

## Takeaways

Functional programming lends itself very nicely to recursive code, rather than iterative code. Induction is a powerful technique for proving theorems about recursive functions. There are different types of induction, useful for functions on various types. For natural numbers, we may use simple or strong induction. (Or, we can be fancy and consider the datatype of natural numbers, `nat`, and use structural induction.) For lists and other recursively defined datatypes, structural induction is the way to go.

> Not all proofs about SML code need induction! Recursion and induction go hand in hand. So, if you were tasked with proving a theorem on a _non-recursive_ function, there will be no need for induction!

We also saw how **proofs mirror the code**. Non-recursive clauses in functions (that is, where the function does not call itself) correspond to base cases in proofs. Recursive clauses in functions correspond to inductive steps. (When we move into more complex datatypes than lists, which may have multiple inductive cases, there may be multiple inductive steps!) The deep connection between recursion and induction is just another example of how the fields of computer science and mathematics are closely tied.

[^1]: SML actually does have mutable data cells called `ref`s. For this reason, SML is not (strictly speaking) a _pure_ functional programming language. But we primarily program with the parts of SML which are pure, and therefore don't have to worry about _side effects_.
