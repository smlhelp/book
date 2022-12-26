---
sidebar_position: 2
---

# Extensional Equivalence

_By Brandon Wu, June 2020_. _Revised December 2022_

Up to this point, we have been using terms such as "equal" and "equivalent" rather casually. Such a notion of equality seems to be rather intuitive, at first glance, not necessarily in need of more exposition. After all, it seems to be our intuition that if two things are equal, we will "know it when we see it". When working in the realm of mathematical expressions, we have some nice assumptions that lend credence to such a hypothesis - if we are evaluating the cosine of a number, we don't expect that the cosine function might wait forever before returning an answer to us. When working with SML code, this becomes a valid concern, and requires that we have a more particular definition of equivalence.

## Motivation

It is at this point that we will try to make the _reasons_ for defining an idea of extensional equivalence apparent. It has everything to do with the _extensional_ behavior of our programs - the outputs that it returns given certain inputs.

Extensional equivalence comes into play when reasoning about the correctness of programs. A large motive for why we write functional code is linked to an idea of a _formal proof_ - when writing code without side effects, it is far easier to reason about the behavior of a program. We would like to be able to provide some rigorous argument as to why a program is correct.

In imperative settings, it is quite difficult to go about doing so - when problems of state are added in, a programmer now not only needs to think about what step a particular program is in at a given moment, but also what the state of the program is as well. By state, we usually mean the particular arrangement of mutable data in the program's environment, such as the state of memory allocation, variable contents, and other transient factors. The possible configurations of such a state are generally infinite, which makes reasoning rather more difficult. While one can generally be _reasonably_ sure what the state of a program should be, it does not always work out that way, as any programmer who has written a bug can attest. In functional programs, we eschew side effects for ease in reasoning about what a program truly outputs. Functions have well-defined results.

Imperative programmers create functional programs. This is, at first, perhaps a surprising claim, but we will soon delineate what precisely we mean. In making this claim, we are only considering functions of a certain basic kind - that is, functions that _compute_, rather than _create_ or _modify_. For instance, a program that generates the Fibonacci numbers, or computes the most efficient path through a given graph, or encodes some kind of data. We do not consider programs that, for instance, outputs to a file or prints the contents of the directory that the program file lives in. In addition, we speak only of programs that do not return _random results_, for instance random number generators or other random selectors.

These programs have the characteristic that they are (in the general case) _deterministic_. Given the same inputs, they should return the same output - regardless of whether the language that they were implemented in is imperative in nature. So for these varieties of programs (which are very common computational problems), imperative programs make use of state to achieve a program that is functional in nature - that is, having no overall visible effect on the machine's state. Functional programming simply uses functional tools to achieve the same result, in the end.

This is an important idea to cognize because it forms the basis for our concept of _correctness_. We identify a program's correctness by its ability to return the expected results when given some input. For instance, we know a factorial function that returns 5 upon being given 3 is no good. Having functional _components_ helps us easily reason and build up functional _results_ - that is, an end program that returns the correct results.

As we will see, extensional equivalence will be a powerful tool when reasoning about the correctness of our code. It lets us prove in a mathematical sense whether functions are _correct_, as well as abstract between specific implementations. We will go further into detail on this later in the chapter.

## The Definition

We will declare this definition of extensional equivalence for non-function expressions first, and then explore the function case later.

> **[Extensional Equivalence (Non-Functions)]** We say that two expressions `e : t` and `e' : t` for some type `t` are _extensionally equivalent_ if they exhibit any of these three behaviors:
>
> 1.  Reduce to the same value
>
> 2.  Loop forever
>
> 3.  Raise the same exception
>
> We will write `e` $\cong$ `e'` to denote this.

**NOTE:** When writing specification comments in code files, we often use `==` to denote extensional equivalence. `==` is not valid SML code, however.

As such, clearly expressions such as `2 + 2` and `3 + 1` should be extensionally equivalent, since they reduce to the same value, that being `4`. It is important to note that reduction is a _stronger_ relation than extensional equivalence - if one expression reduces to another, then they must by definition be extensionally equivalent. However, extensional equivalence does not imply reduction. For instance, `4` does not reduce to `2 + 2`, since clearly `4` is already in its most simplified form. This corresponds to our intuition about traditional mathematical expressions, as we would expect that we could say that $-1$ and $\cos(\pi)$ are equal, since they have the same value.

With the second point, however, we depart from our normal mathematical reasoning. It is generally the case that, given a mathematical expression, we expect to be able to generate a result from it. That result may be undefined, and it may take some time, but in many cases we don't expect to have to account for a nonterminating computation. This is not the case in Standard ML. Now, any given function call may loop forever, which plainly is problematic for equivalence.

As such, we will add a stipulation that two expressions (of the same type) that loop forever are extensionally equivalent. Note that even though two expressions of dissimilar types that loop forever have the same "behavior", they cannot be extensionally equivalent by definition, as only expressions of the same type can be extensionally equivalent.

The third case also arises from our usage of Standard ML, as expressions can potentially raise exceptions in cases where computation is not feasible. Some basic kinds of exceptions include `Div`, `Bind`, and `Match`. The precise mechanism of exceptions is not important, since we will cover that in more detail later on, but in order to maintain some notion of equivalence, we will simply require that two same-typed expressions raise the _same_ exception. As such, expressions like `1 div 0` and `2 div 0` are extensionally equivalent, whereas `1 div 0` and `let val [] = [1] in () end` are not.

**Note:** It is not important to know specifically what the latter expression in the last example is doing - just know that it raises the exception `Bind`.

In writing these definitions we have made a step towards cognizing extensional equivalence, but in a sense we have taken a step back as well. We have committed the same mistake by saying extensional equivalence holds when expressions "reduce to the same value". We required this more stringent definition of extensional equivalence specifically because of callously using terms like "equal" and "equivalent", and now we've so unthinkingly used the term "same". But what does it mean for two values to be the "same"?

For many cases, our intuition will suffice. It is clear to say that `2` is the same as `2`, and `2` is not the same as `"two"` (for any self-respecting programming language, in any case). For one, the types must be the same, and definitely one integer value should not be "equal" to any other separate integer value. We might then claim that two values are only "equivalent" if they denote the same literal value.

**NOTE:** The perceptive reader may notice that again, we have used the words "same" and "separate". Unfortunately, there is only so far that we can dig this rabbit hole - at this point, we will have to rely on our intuitions to tell us that `2` is indeed the same value as `2`, and not the same value as `3` or `4`, and call it a day.

This definition will suffice for most types. For functions, however, we will have to take a different approach.

> **[Extensional Equivalence (Functions)]** We say two expressions `e : t1 -> t2` and `e' : t1 -> t2` for some types `t1` and `t2` are extensionally equivalent if for all values `x : t1`, `e x` $\cong$ `e' x`.

We see that this definition simply takes our previous definition and moves it one step up. There is an interesting aspect of this rule that depends on a concept that we have yet to learn, but we will cover that when we get there. Seen in this way, we can say that two function values that are not the same literal value may be extensionally equivalent, as their _extensional_ behavior (that is, their behavior when interacting with other objects) may be the same.

More concretely, let us consider the example of `fn x => x + x` and `fn x => 2 * x`. Recall from the previous chapter that `fn x => x + x` in particular does _not_ simplify to `fn x => 2 * x`, and is in fact itself a value - meaning that it is in its terminal form, being irreducible to anything other than itself. The right hand side of any lambda expression is, in a sense, _frozen_ until the function is given an argument. So then `fn x => x + x` and `fn x => 2 * x` are different values, however it is obvious to see that on being given an input they evaluate to extensionally equivalent values (specifically, the same integer).

As discussed before, our definition of "equivalence" identifies functions with the values that they output. It should feel intuitively clear - two functions are exactly equivalent if they return the same output for the same inputs. This seems to be the definition of computing the "same" function. Notice that we omit any mention of complexity or _how_ the function goes about computing what it computes - no matter what path is taken, all that is important is what values are ultimately outputted.

## Referential Transparency

In this section we will introduce a powerful idea called _referential transparency_, which follows as a direct consequence of our definition of extensional equivalence.

> **[Referential Transparency]** Consider an expression `e` that contains the expression `e1` as a sub-expression. For any expression `e2` $\cong$ `e1`, we can produce the expression `e'` as the same expression as `e`, but with each sub-expression `e1` replaced with `e2`, and we will have `e` $\cong$ `e'`. In words, for an expression `e` that contains `e1`, we can swap out `e1` for an extensionally equivalent `e2` to obtain an expression extensionally equivalent to `e`.

**NOTE:** The notion of a "sub-expression" here is not very well defined - we will use our intuition here, similarly with what it means to be the "same expression". Gaining an intuition through examples will suffice.

To illustrate this, we might say that the expression `4 * (2 + 2)` has the sub-expression `2 + 2`, and that `let val x = f (1 div 0) in x end` has `(1 div 0)` as a sub-expression. In the former case, we can use referential transparency to say that `4 * (2 + 2)`$\cong$`4 * 4` and `let val x = f (1 div 0) in x end`$\cong$`let val x = f (2 div 0) in x end`, by replacing the aforementioned sub-expressions with `4` and `2 div 0`, respectively.

Referential transparency will let us abstract away from the specific makeup of a certain implementation or expression, instead replacing it as we see fit with something known to be extensionally equivalent, while still allowing us to maintain extensional equivalence. This comes in handy when proving that an implementation of a particular function is correct, as we can simply prove that it is extensionally equivalent to an existing, simpler implementation that is already known to be correct. This has consequences for simplifying and optimizing implementations.

Later on, we will explore specifically how we may go about proving extensional equivalence. This will primarily take the form of mathematical or structural induction.

## Stepping with Valuable Expressions

Recall from the previous article that SML uses eager evaluation. In other words, the parameters of a function are evaluated before stepping into the function.

When proving extensional equivalence theorems about SML code, though, we often end up in a situation where we want to step into a function, but the function is being applied to an expression that isn't a value.

We will look at an example of this situation, involving the functions `@` (append) and `rev`. The definition of `@` is as follows:

```sml
fun [] @ L = L
  | (x::xs) @ L = x::(xs@L)
```

Now, suppose we want to show the following theorem:

$$\texttt{(x::xs) @ (rev A)} \cong \texttt{x::(xs @ (rev A))}$$

where `x : int`, `xs : int list`, and `A : int list` are all values. First, make sure this "feels right" -- the left side of our theorem matches the second clause of `@` with `rev A` bound to `L`.

However, notice that `rev A` is not a value. Since SML is eager, we cannot step into the function `@` until we evaluate the expression `rev A`. In other words,

$$\texttt{(x::xs) @ (rev A)} \not\Longrightarrow \texttt{x::(xs @ (rev A))}$$

So, we're stuck! D:

... or are we?

Let's assume that `rev A` is valuable, i.e. it evaluates to a value, and let's give that value a name-- say, `v : int list`: \[ `rev A` $\Longrightarrow$ `v` \] With this value in hand, we can do what we wanted to do!

$$\texttt{(x::xs) @ (rev A)} \Longrightarrow \texttt{(x::xs) @ v} \Longrightarrow \texttt{x::(xs @ v)}$$

Notice that this complies with SML's eager evaluation, since we are fully evaluating the parameters of `@` before stepping into the function.

And here's the kicker: we can also use `v` to evaluate the right hand side of our theorem!

$$\texttt{x::(xs @ (rev A))} \Longrightarrow \texttt{x::(xs @ v)}$$

Again, this complies with SML's eager evaluation-- in this case, we never even step into the definition of `@`. But, we've actually proven our theorem! We showed that the LHS and the RHS both evaluate to the same expression, so by rule 1 of the definition of $\cong$, the LHS and RHS must be extensionally equivalent. We are done!

In this example, we got around SML's eager evaluation by assuming that our parameter `rev A` is valuable, and as it turns out, this concept holds in the general case. If we know the parameter of a function is _valuable_, then we can step into the function _without_ first evaluating that parameter. This principle, which we will call (for lack of a better term) "stepping with valuable expressions," is one reason why valuable expressions are so important.

> **[Caution!]** When stepping with _values_, we can use the reduction relation $\Longrightarrow$. When stepping with _valuable expressions_, this is not always true (it certainly is not true in the example above). Stepping with valuable expressions only preserves extensional equivalence $\cong$.

## Totality

As stated previously, frequently we will write proofs demonstrating the extensional equivalence of two expressions. In order to do so, we often will have to expand definitions, stepping through function bodies and applying lemmas. In doing so, we will frequently need to do a _totality citation_, to justify that making such steps is truly valid. While the name may seem unfamiliar, it ultimately belies a concept that you already know - valuability.

> **[Total]** We say that a function `f : t1 -> t2` for some types `t1` and `t2` is _total_ if for all valuable expressions `x : t1`, `f x` is valuable. In other words, for all valuable inputs to `f`, we get a valuable output.

Examples of total functions include `fn x => x + 1`, `fn x => "foo"`, and the length function for lists. Notably, however, the factorial function is _not_ total:

```sml
fun fact (0 : int) : int = 1
  | fact (n : int) : int = n * fact (n - 1)
```

This function is not total because, while `fact n` is valuable for all non-negative `n`, `fact n` for a negative `n` loops forever, as it decrements infinitely, never finding a base case. Thus, `fact` is not total. Sometimes if a function is valuable only on certain inputs, then we will say that a function is "total over" some domain, even if it is not total in general. We may say that `fact` is thus total over the non-negative integers, though this is not a common practice.

We will now digress slightly to consider an example. What can we say of the behavior of a function `fn x => 15150`? Well, we can characterize its behavior in words - it returns `15150` on all inputs. We must be careful when linking our intuition regarding this function to the actual evaluational semantics of SML - however. Consider the expression `(fn x => 15150) (1 div 0)`. If we went along with our previous conclusion, we might say that this is `15150`. This contradicts what we learned in the previous section, however. Since SML is eagerly evaluated, this expression should raise an exception and never reach the function body at all.

This is an easy mistake to catch when considering an explicit, definite input like `1 div 0`, but oftentimes we will be considering inputs that might be "unspecified" in some sense. They may be the result of computations that we are not fully convinced of, which could return an expression with any kind of behavior. Suppose we were wondering the behavior of `(fn x => 15150) (f y)`, for some function `f` and value `y`. Now, we aren't sure at all if this expression does what we think it might do, which is return `15150` - that depends entirely on the definition of `f` and the value of `y`.

This is where totality comes in. Totality is oftentimes like a sledgehammer, being far more brutish and exhaustive than its use cases necessitate. It is undeniably useful, however. With totality, we do not have to reason about the behavior of a function on any specific inputs - we can just handwave them all and say that no matter what, it must return a valuable output, which is what we really care about. If we revisit the expression `(fn x => 15150) (f y)` with the totality of `f` in hand, now reasoning about it is very simple. We know that `y` is a value, and that `f` is total, so by definition `f y` is valuable. This means that, regardless of what value `f y` _actually_ evaluates to, we can step into the body of `(fn x => 15150)`, and thus conclude that the expression reduces to `15150`.

More generally, suppose we have the following definition:

```sml
fun f (x : int) : int = e
```

where `e` denotes some expression that we will leave unspecified for the moment. Thus, `f` is a function that takes in some input of type `int`, and produces a val binding to bind it to the identifier `x`, and then evaluates the expression of `e` in the scope of that binding. Note that such a binding is truly a _val_ binding - since we have eager evaluation, the input must first be evaluated to a value, and then bound to the identifier `x`.

Then, consider the expression `f (g y)`, where `g` is some other function and `y` is some value. Oftentimes, we would like to just step through the definition of `f` in some proof, and say that `f (g y)` reduces to the expression `e` in the scope of the binding `[(g y)/x]` (recall that this is our notation for "binding the value of `g y ` to the identifier `x`). This is not always possible in general, however. Recall that a well-typed expression either reduces to a value, loops forever, or raises an exception. If `g y` were to loop forever, would we be able to enter the function body of `f`, and evaluate `e`?

Of course we would not - this is just another consequence of eager evaluation. Evaluation of `f (g y)` would get "stopped at the door", so to speak. We would not be able to enter `f` because `g y` does not reduce to a value. Since the input to `g` is arbitrary, in this case, to be able to claim that `f (g y)` enters the function body of `f` requires that we know the totality of `g`. We thus use totality as a _tool_ to get at what is really important - the valuability of the arguments to `f`, which in this case is `g y`. As such, while we may refer to such citations as "totality citations", and name this idea of totality, do not forget that this is all just a consequence of eager evaluation. We are really looking for _valuability of arguments_.
