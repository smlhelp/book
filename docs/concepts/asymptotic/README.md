---
sidebar_position: 3
---

# Asymptotic Analysis

_By Brandon Wu, May 2020_

We have now dedicated a significant amount of discussion towards how to reason about the correctness of programs. Correctness, however, is not the end-all-be-all. In many cases, we would like to be able to think about the _complexity_ of our programs - that is, the amount of resources that it takes to run it on certain inputs. Such resource concerns may include time, space, and energy usage. For the purposes of this book, our principal resource of interest will be _time_.

## The Reality

It is, however, hopefully clear that this question is rather ill-founded. For one thing, hardware limitations mean that running the same program on different machines may yield differing results, based on the performance ability of individual machines. Indeed, even running the same program on the same machine may yield different results, based on the the computer's current workload. We want a metric that is somehow agnostic to these implementation details, that can give us an idea of how efficient an algorithm is.

Additionally, we are usually not just interested in a program's runtime based on a single input, but its behavior across a wide range of inputs. Additionally, the possibility of infinitely many inputs makes empirical methods like taking an average rather infeasible. Generally, programs also tend to have "worse" inputs than others. It is not necessarily fair to compare the time it takes to compute the millionth Fibbonaci number with the time it takes to compute the second. We will have to do better.

## The Solution

We will generally turn to _asymptotic analysis_ to solve these issues. It provides a nice mathematical definition that conveniently takes care of many of the points previously mentioned.

> **[Big-O]** We say that a function $f : \mathbb{R}^+ \rightarrow \mathbb{R}^+$ is in big-O of another function $g : \mathbb{R}^+ \rightarrow \mathbb{R}^+$ (write $f(n) = O(g(n)$ or $f(n) \in O(g(n))$) if there exist constants $c, n_0 > 0$ such that for all $n \geq n_0$, $f(n) \leq cg(n)$. In words, $f(n) = O(g(n))$ if there exists a point beyond which $f(n)$ can be upper bounded by $g(n)$, amplified by some constant factor.

In intuitive terms, we can think of a function $f$ as being in big-O of another function $g$ if it is "less than or equal to" that function, in terms of the complexity class that it belongs to. For instance, $2x$ is $O(x^2)$, and also $O(x)$, the former being because a quadratic function grows faster than a linear function by a factor of $x$, and the latter being because we effectively do not care about constant factors. Note that for that example, we can choose $c = 2$, which makes $f(n) = cg(n) = 2x$, which clearly makes $f(n) \leq cg(n)$ true.

Asymptotic analysis allows us a convenient notion of what the runtime of a function really is in terms of the _size of the input_. We will usually define what metric this takes, but common measures include the length of a list, the number of nodes in a tree, or something similar. If we let $T(n)$ denote the function that maps input sizes to worst-case "runtimes" (that is, $T(x)$ is the maximum number of steps it takes to run on an input of size $x$), then we are usually interested in _upper bounding_ $T(n)$ - that is, determining what complexity class it falls into. Note, however, that we are simply finding upper bounds - the idea is that this $T(n)$ function cannot be determined exactly, but its _approximate asymptotic behavior_ can be upper bounded by a different, more defined function. We also care about achieving a _tight_ upper bound - one that is not unnecessarily large. For instance, we could say that _many_ functions are in $O(2^{2^n})$ - but this is not particularly useful information. You must be careful to perform analyses without being _too_ liberal.

**NOTE:** By "number of steps", we usually mean some idealized notion of some "step of computation" that an algorithm takes, such as the number of comparisons that it takes to run a quicksort algorithm, or the number of times that we cons an element on or off a list. This lets us abstract away from how long it _actually_ takes a computation to run, ignoring the physical machines used. We only care about the high-level "steps" that an algorithm takes, which is the same regardless of platform.

In a world with an incredible amount of data being processed and transmitted in our daily lives, asymptotic analysis forms a nice metric for the efficiency of algorithms. Most of the specific content that has been discussed so far is beyond the scope of this book, but it is good to have an intuitive understanding of asymptotic analysis nonetheless.

## Asymptotic Analysis at a Glance

Oftentimes, one will have to "eyeball" the complexity of their function or program. This really just amounts to knowing what operations that it executes, and how many times they are executed.

For instance, consider the following function:

```sml
fun foo (0 : int) : int = 0
  | foo (n : int) : int = n + foo (n - 1)
```

Clearly, this function simply computes the sum of the first $n$ nonzero numbers upon being given $n$ as an input. What it does is not important, but if we were to try and quantify the complexity of `foo`, we might say that it is $O(n)$ in $n$, the value of the number given as input. This is because we can consider arithmetic operations to be constant-time (that is, running in $O(1)$), and we know that the function should recurse $n$ times.

But now let us consider how long it might take to run the following code fragment:

```sml
fun bar (0 : int) : int = 0
  | bar (n : int) : int = (foo n) + bar (n - 1)
```

Now, instead of adding `n`, each computation in the recursive step instead adds `foo i`, invoking the previous function.

This becomes slightly harder to eyeball. We can eyeball this as upper boundable by $O(n^2$, though we would desire some more justification than just what it "seems to be." We will need to turn to more sophisticated methods to analyze this more formally, which we will cover in the next chapter. The general idea of estimating complexity, however, is simply to look at programs in terms of their components - how many times instructions run, and what the cost of each instruction's individual cost is. This becomes a very powerful method of reasoning that we will explore more later when we discuss sequences, though we will introduce a way to do so in a slightly more rigorous manner.
