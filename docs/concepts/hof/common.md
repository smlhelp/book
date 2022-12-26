---
sidebar_position: 2
---

# Common HOFs and Partial Evaluation

_By Brandon Wu, June 2020. Revised December 2022_

In this section, we will explore a number of common higher-order functions that we will make use of. These higher-order functions embody _design patterns_ that are common in programming, and represent a _generalized notion_ of a large space of potential functions that can be made to solve a myriad of problems. This section focuses on understanding the importance that higher-order functions offer us through increasing _abstraction_, as well as _modularity_ in the structure of our code.

## Designing Higher-Order Functions

Suppose that we are interested in incrementing all the numbers in a list by one.

```sml
fun incList [] = []
  | incList (x::xs) = (x + 1) :: incList xs
```

This is not too bad to do - we simply need to increment each individual element, and then simply cons it back on recursively. Suppose further that, as the arithmetically-minded scholars that we are, we are also interested in negating the sign of each element in a list.

```sml
fun negateList [] = []
  | negateList (x::xs) = (~x) :: negateList xs
```

These two look quite similar, which we begin to find unnerving. Hoping to get away from what is surely a wild coincidence, we try and write a function to take a list of strings and append the string `"\n"` to them (which denotes the newline character).

```sml
fun newLineList [] = []
  | newLineList (x::xs) = (x ^ "\n") :: newLineList xs
```

We can't seem to escape!

### Map

We have seen that these functions we have written all look very similar - they perform a function on each element of a list, then cons the result back on to the recursive call so as to perform that operation on _every_ element of the list. This is a common _design pattern_, or _template_ for a function that we want to do a particular thing. For each specific operation we want to perform on a list, it seems we would have to write the same sort of function each time, only changing the operation that is performed at the recursive call. To avoid all that work, we will make use of _higher-order functions_.

```sml
(* map : ('a -> 'b) -> 'a list -> 'b list *)
fun map f [] = []
  | map f (x::xs) = (f x) :: map f xs
```

`map` thus both takes in a function (in this instance, the function `f`) and is _curried_, meaning that it itself returns a function. `map` takes in the function that you wish to apply to the entire list, and then the list, and then returns the result of applying that function to every element in the list. In other words, `map f [x_1, ..., x_n] ==> [f x_1, ..., f x_n]`.

We also note that `map` is _polymorphic_, as we learned earlier, and the function it takes in has type `'a -> 'b`, which is the most general function type. This means that the function we pass in can describe any kind of transformation on some element, which grants us a great deal of versatility.

`map` _describes_ a pattern, or a _family_ of functions that all follow the same sort of structure. In the same way that `'a` is a variable ranging over all types, where we can describe each type as an _instance_ of `'a`, we can describe functions like `incList`, `negateList`, and `newLineList` as being sort of "instances" of `map`. Specifically, we have that `incList` is extensionally equivalent to `map (fn x => x + 1)`, `negateList` is extensionally equivalent to `map ~`, and `newLineList` is extensionally equivalent to `map (fn x => x ^ "\n")`.

We will now explore some more types of common patterns.

### Filter

Quite often, we have a collection of objects and are interested in only some of them - we want to select those that possess the desired property, and get rid of those that do not. In other words, we want to _filter_ the list into only those such elements. The property that we desire, however, could be anything. All we need to be able to do is say "yes" or "no" at any given item,

This is embodied in the implementation of `filter`, which abstracts away the specific property in question.

```sml
(* filter : ('a -> bool) -> 'a list -> 'a list *)
fun filter p [] = []
  | filter p (x::xs) = if p x then x :: filter p xs
                              else filter p xs
```

We describe the function `p` (of type `'a -> bool`) as a _predicate function_, or alternatively _indicator function_, which simply returns `true` on those "yes"-cases and `no` on "no"-cases. Seen in this way, `filter` does something very similar to `map`, where it takes in the function it needs to apply to the elements of the list. In the case where the predicate holds, the element is kept, otherwise the element is discarded.

We could, for instance, obtain all the even integers in a list `L : int list` by writing the expression `filter (fn x => x mod 2 = 0) L`.

### Fold

Map is very useful for performing some kind of transformation on a bulk group of data, however it retains the "structure" of the list. It maintains the elements in the same order as they were inputted, and simply transforms each piecewise to produce a final answer. Sometimes, we are interested in simply achieving a final result from a collection of data - not another collection of data itself. This describes a very common pattern known as _folding_.

```sml
(* foldl : ('a * 'b -> 'b) -> 'b -> 'a list -> 'b *)
fun foldl g z [] = z
  | foldl g z (x::xs) = foldl g (g(x, z)) xs

(* foldr : ('a * 'b -> 'b) -> 'b -> 'a list -> 'b *)
fun foldr g z [] = z
  | foldr g z (x::xs) = g(x, foldr g z xs)
```

More specifically, `foldl` and `foldr` both describe two ways of combining the elements in a list, given a function `g`. The role of `z` is that of a "base case" in our accumulated value, so that we have an initial point to start from when using the function `g`. The result of `foldl g z [x_1, ..., x_n]` is to evaluate to `g(x_n, ..., g(x_2, g(x_1, z))...)`, and the result of `foldr g z [x_1, ..., x_n]` is to evaluate to `g(x_1, ..., g(x_n-1, g(x_n, z))...)`. We are thus choosing whether we want to fold from the _left_ of the list or the _right_.

**NOTE:** One way to remember which way that that each respective `fold` goes is to identify the corresponding side (left or right) as being the side of the most _deeply nested_ element in the functions. As such, since `x_1` is the most leftmost element, `foldl` has `f(x_1, z)` as its innermost component, whereas since `x_n` is the most rightmost element, `foldr` has `f(x_n, z)`.

Use cases for `fold` include if you wanted to turn a list of strings into a single string, which you could accomplish with `foldr (op^) ""`, or if you wanted to sum the elements of a list, which could be done with `foldl (op+) 0`. Note that in the case of summing a list, `foldr` would work too. This is because `+` satisfies the property that `x + y = y + x`. In general, `foldl f` and `foldr f` do the same thing when `f` satisfies the property $f(a_1, f(a_2, b)) = f(a_2, f(a_1, b))$. (As a difficult exercise, you can try proving this!)

For many purposes, it will be the case that your `z` will be some _identity_ value, such as `0` for summing a list, or the empty string for concatenating all the strings in a list. This does not always have to be the case. One of the strengths of the implementation is that we can _specify_ what our `z` is, and tailor that to our needs. For instance, if we wanted to append a `"\n"` to our string concatenation, we could use `foldr (op^) "\n"`. Fold offers us a great deal of flexibility with choosing how we want to reduce a list.

It is somewhat important to note the type of the function `g` here. It has type `'a * 'b -> 'b`, where `'a` is the type of the elements in the list that we are folding, and `'b` is the type of the initial accumulator and output. It is useful to think of this `'b` type as the type of the `fold` function's "accumulator", or the information that it stores as it proceeds along its computation. In the case of `foldl`, this accumulator at a given point along the list is simply the folded value of the all the elements to the left - and in `foldr`, it is the folded value of all the elements to the right. The polymorphic nature of this accumulator becomes a major strength, as we can "carry along" any kind of information that we like, so long as we define how it changes when we receive a new `'a`-typed element from the list that we are folding.

So, for instance, the accumulator in `foldl (op+) 0` is simply the sum of all the elements to the left of any given point. The accumulator of `foldr (op^) ""` is the concatenation of all of the strings to the right of a given point (which I hope makes apparent why `foldr` is the right fold for the task, as opposed to `foldl`!).

## Compose

One of the major examples that we used to motivate totality was that of _function composition_, the classic example being $f(g(x))$, for some functions $f$ and $g$. This is a very common idea, where we have some form of data that we would like to put through a series of transformations. If our transformations are inherently disparate (such as being bound to identifiers of different functions), we may have to write code that looks like `f1 (f2 (f3 (f4 (f5 x))))`. However, this can only happen if we _already have access to the element x_. So then, what happens if we want to give a name to the _process_ of applying `f5`, then `f4`, then `f3`, then `f2`, and then `f1`?

We could, of course, write the lambda expression `fn x => f1 (f2 (f3 (f4 (f5 x))))`, however that still can be rather ugly. There is an entire style of programming (named _point-free_, or _tacit_ programming) that tries to eliminate the deliberate identification of the arguments to functions, instead making use of _combinators_. In a similar flavor, we would like to eliminate the explicit need to construct the lambda expression that takes in the input `x`. We might then call back to another common mathematical operator, that being of _function composition_, or `o`.

```sml
infix o
(* o : ('b -> 'c) -> ('a -> 'b) -> ('a -> 'c) *)
fun f o g = fn x => f (g x)
```

Note that the types are constrained to permit the "compatibility" of the functions `f` and `g`. The input type of `f` can be general, as well as the output type of `g`, but the output type of `g` must match the input type of `f`. In this way, we can "string along" a series of functions in order to produce a single function that performs the "pipeline" of transformations that we desire.

So, for instance, we could write the function that, given a tree of integers, sums all of the elements in the tree by simply writing `sum o inord`. We could, of course, simply write `treeSum`, however this idea is generalizable to more complicated sequences of transformations.

## Partial Evaluation and Modularity

At this point, we have seen several examples of common higher-order functions, as well as potential use cases. These use cases often look nothing alike, but they all share a fundamental similarity in their _structure_, which is specified by the given higher-order function.

A key strength of higher-order functions lies in _partial evaluation_, where we can use higher-order functions to further derive other functions (and possibly higher-order functions, themselves). It is fine for, in the case of finding the sum of a single list `L`, to simply evaluate `foldr (op+) 0 L`, but in the general case it is a strength that we can bind the function `foldr (op+) 0` to the name `sum`. This comes in handy especially if we want to sum over _many_ lists, so that we don't continuously have to compute the result of `foldr (op+) 0` (though it has negligible computational cost, admittedly).

Seen in this way, it is as if higher-order functions are at the root of a large _tree_ of potential functions, where each node in the tree is an increasingly-specialized function, until we arrive at some specific use case. This makes higher-order functions _modular_, as we can simply "mix-and-match" the arguments to HOFs such as `map` or `fold` until we arrive at the specific tools that we need.

This is only an example of the way that abstraction and modularity grant us strength in programming. Through abstracting away even the specific operations that programs carry out, we can "capture" a large amount of potential functions that we may write.
