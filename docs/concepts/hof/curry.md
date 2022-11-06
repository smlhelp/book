---
sidebar_position: 1
---

# Currying and Staging

_By Brandon Wu, June 2020_

Suppose that we are interested in writing a function that adds two numbers. This is fairly simple - this is not a new concept to us.

```sml
fun add (x, y) = x + y
```

Then this function should clearly have type `int * int -> int`. We also know that this notation is really just syntactic sugar for the following:

```sml
val add = fn (x, y) => x + y
```

It binds the lambda expression that takes in a tuple of two integers and adds them together to the identifier of `add`. Yet with our knowledge of expressions and values, it is not too outlandish to write the following instead:

```sml
fun addCurry x = fn y => x + y
```

What might be the type of this function? Well, we know that `addCurry` takes in a value `x`, which should be an `int`, since it is summed with `y`. It then returns a lambda expression that takes in that same `y`, and returns the sum, which is an `int`. It seems to us that the type should be `int -> (int -> int)`. This is an example of a _curried_ function, and one of the first examples we will see of a _higher-order function_.

> **[Higher-Order Functions]** A _higher-order function_ is a function that takes in other functions as input, or returns a function as output.

> **[Currying]** Named after mathematician/logician Haskell Brooks Curry, _currying_ is the act of transforming a function that takes multiple arguments into a function that returns a function that takes the remaining arguments. Intuitively, it separates the arguments into a series of function applications, instead of all at once. We may refer to a general higher-order function that returns a function as a curried function.

An important note is that in the type `int -> (int -> int)`, the parentheses are unnecessary. This is because type arrows are _right-associative_, in the same way that `::` is. This means that there is already an implicit parentheses in the type `int -> int -> int` - the function simply takes in an integer and returns a function from `int -> int`. This is thus a separate type than `(int -> int) -> int`, which is a function that takes in a function from `int -> int` and returns an integer.

Note that in the curried example of `addCurry` we wrote above, this is really syntactic sugar for the following:

```sml
val addCurry = fn x => fn y => x + y
```

Not being ones to skimp on the syntactic sugar (which perhaps spells danger for our syntactic blood sugar levels), we can take this one step further. We can write the exact same declaration in a more concise way, using the form:

```sml
fun addCurry x y = x + y
```

This thus will curry our arguments for us, when we separate them by a space.

Note that our implementations of `addCurry` and `add` are _not_ extensionally equivalent - for the simple reason that they do not even have the same type! They do, however, in a sense _correspond_, in that they seem to do the _same thing_ - that is, add numbers together. The manner in which they do so is entirely disparate, however.

It is important to note that currying our functions gives us a notion of _partial application_, where we can give a curried function only _some_ of its "arguments". This lends us to further specialization and modularity based on the use case and amount of information available. This is discussed more in the coming section.

## Revisiting Extensional Equivalence

In previous chapters, we have explored the idea of extensional equivalence, and constructed a definition for extensional equivalence that covered two cases - the function case and the non-function case.

We seemed to agree on a meaning that said that, for non-function values, two values are extensionally equivalent if they are the _same value_, which is an perhaps an ill-justified definition that may leave a bad taste in one's mouth, but ultimately boils down to our intuitive notion that, yes, some values are just the _same_ and we can't really do much more than question that. For instance, we can see that `(1, 2, "hi")` and `(1, 2, "hi")` are the "same", and neither are the same as `(2, 1, "hello")`. For functions, however, we decided on a slightly more appeasing definition that defined a function by its _input-output_ behavior. We restate the definition below:

> **[Extensional Equivalence (Functions)]** We say two expressions `e : t1 -> t2` and `e' : t1 -> t2` for some types `t1` and `t2` are extensionally equivalent if for all values `x : t1`, `e x` $\cong$`e' x`.

It is our hope that we are now in a place to properly appreciate this definition. For functions that have type `int -> int`, this is a fairly straightforward definition - these functions are extensionally equivalent if, for every integer that we give them, they return the same int. However, what about curried functions? Our definition, in light of this new concept, is that curried functions are extensionally equivalent if _the functions that they return are extensionally equivalent_.

No matter how deeply nested this currying takes place, this definition will suffice. Types must be finite, so we must eventually reach a point where we can say that values are "the same" (excluding the existence of non-equality types, perhaps). We can see now that this idea of extensional equivalence is elegantly compatible with the existence of curried functions, being a recursive definition much in the same way that the `datatype`s that we declare or the `fun`ctions that we write are.

## Staging

With curried functions, we can have much more deliberate control over _when_ a function does evaluation, particularly with respect to the inputs that it receives.

Consider an analogy. Suppose you have math homework to do, but you left your calculator at home. A more lazy-minded student might procrastinate, thinking that they would only start once they got home, but a more pragmatically-minded individual might simply start on the problems that don't require a calculator. The idea of staging is that we can reap efficiency benefits for certain problems when facing a scarcity of information, by simply doing computations that require the arguments that are at hand first. We thus make a distinction between functions that must have all of their arguments to do useful work, and those who do not.

For instance, take the addition function.

```sml
fun add (x : int, y : int) : int = x + y
```

This is not a function that we would categorize as being able to do "useful work" with a single one of its arguments. Even if we were to curry `add`, with only one `int` it can't really do anything but simply wait for the second argument. In this case, the efficiency benefits are marginal at best. The computations are somewhat "dependent" - we need access to both arguments in order to do anything meaningful.

Consider a more contrived example:

```sml
(* contrived : int -> int -> int *)
fun contrived x y =
    let
        val z = horrible_computation x (* this takes 3 years *)
    in
        y + z
    end
```

The function `contrived` takes in two arguments `x` and `y`. It then performs some transformation on `x` using the function `horrible_computation` (which takes 3 years to run, unfortunately), and then adds `y` to the result of that transformation `z`.

Suppose that we are interested in computing the results of `contrived 4 2` and `contrived 4 5`, for no reason other than because we can. Then, clearly evaluation of those two expressions will take 3 years each (per `horrible_computation`'s horrible computational nature) - totalling up to six years! This is far too long, and we want to do better.

One thing that we note is that almost all of the work that we expended in computing `contrived 4 2` and `contrived 4 5` was in evaluating `horrible_computation 4`. This computation took us 3 years, but we repeated it twice! In both of queries we made, we had to compute the exact same thing, which led to major inefficiencies. The rest of the work of `contrived` was negligible compared to the overhead of `horrible_computation`. It seems that we should be able to achieve better results.

Consider the following definition instead:

```sml
(* contrivedStaged : int -> int -> int *)
fun contrivedStaged x =
    let
        val z = horrible_computation x (* this still takes 3 years *)
    in
        fn y => y + z
    end
```

Now, we have _staged_ `contrived`. `contrivedStaged` still has the same type as `contrived`, but it behaves slightly differently. It is not too difficult to see that `contrived` is extensionally equivalent to `contrivedStaged`, but we have made a slightly more optimal change with regards to SML's semantics.

Now, instead of waiting for the second argument `y` to begin executing `horrible_computation x`, `contrivedStaged` does so immediately after receiving `x`. This is clearly better - there was no point to wait for `y` in the first place, since `horrible_computation` does not depend on it. So now we can execute the following code fragment:

```sml
val intermediate = contrivedStaged 4
val ans1 = intermediate 2
val ans2 = intermediate 5
(* takes 3 years in total *)
```

We can do this because `contrivedStaged 4` computes the result of `horrible_computation 4`, and then _stores the result_ in the closure of the function that it returns. This means that, in the scope of `intermediate`, it contains the answer that was common to both of the expressions we wrote earlier. Now, we can execute the step of `y + z` (which is nearly instantaneous), cutting our runtime in half. Now, we can obtain the result of `contrived 4 2` and `contrived 4 5` in only 3 years (though to evaluate both of those expressions themselves would still take 6 years!).

It is important to note that currying is _not_ the same thing as staging. `contrived` was curried, but not staged optimally - we made a change that, even though it had the same type, let us structure our queries in a more optimal manner. This is an important idea with many applications, such as when building up a data structure to make queries to, or in graphics when a lot of work must first be done to preprocess the given data.
