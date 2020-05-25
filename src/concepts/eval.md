# Evaluation

Evaluation is a commonplace idea. No matter what programming language you are in, it is a customary concept to invoke subroutines in order to obtain some kind of _final result_, which can be further used in order to achieve some later goal. To obtain such a result, however, programs must perform certain computations and carry out certain steps - in other words, they must _evaluate_. Ultimately, programs are complicated constructs whose main goal is to compute some value or achieve some effect - we will focus mainly on the first case here. 

## Expressions and Values
Expressions in Standard ML are akin to mathematical expressions. They are built up from applications of certain operations, being subject to certain simplification rules that can be used to obtain a final answer. For instance, we would consider `2 + 2` an expression, similarly to other examples such as `1 div 0` and `Int.toString 2`.

The most fundamental building blocks in Standard ML are _values_. Values are the primordial units of a given type, being irreducible to any further simplified form. When trying to answer some computational problem, it is usually the case that we are looking for some kind of "answer". As such, values are important to obtain, as we are usually looking for some kind of answer in "simplest terms". Values in SML emcompass examples such as `2`, `true`, `"foo"`, `[1, 2, 3]` and `fn x => x + 1`.

> **[Value]** A value is an expression `e` such that, for all `e'` such that `e ==> e'`, `e' = e`. In other words, a value is an expression that only reduces to itself - there is no pending computation left to be done.

**Note:** The meaning of `==>` in the above definition is _reduction_, which is further explained below. 

A noteworthy distinction to make is that certain language constructs, such as an if-then-else expression, let-in-end expression, or case expression, are in fact _expressions_. This means that they can be passed around and evaluated just like any other expression. So for instance, the following code is a valid expression:
```sml
(let
    val x = 5
in 
    x
end) + 2
```
and has the value of `7`. Similarly, the following code is also an expression:
```sml
(if true then 15 else 150) * 2
```
and has a value of `30`. 

## Reduction
We now define a notion of _reduction_, which corresponds to our notion of simplification. We write that `e ==> e'` if the expression `e` _reduces to_ the expression `e'`, which means that `e` produces `e'` from zero or more applications of some simplifying rule. For instance, we may say that `2 + 2 ==> 4`, since by applying the function `(op +)`, we obtain `4`. Furthermore, we may say that `if true then "good" else "bad" ==> "good"` by evaluation of the if-then-else expression, since the predicate (in this case `true`) is true.

> **[Valuable]** An expression `e` is _valuable_ if there exists a value `v` such that `e ==> v`. Note that all values are by definition valuable.

So valuable expressions include `2 + 2`, `4`, and `if true then 4 else 2` (and in fact all reduce to the same value!). An example of a _non_-valuable expression is `1 div 0`, which raises an exception `Div` when evaluated (since division by zero is undefined). Additionally, if we consider the following code fragment:
```sml
fun loop (x : int) : int = loop x
```
This defines a function `loop : int -> int` that loops forever, since it continuously calls itself forever. Thus, `loop x` for any `x : int` is also a non-valuable expression, since it never reduces down to a value. 

In fact, what we will see is that this behavior is sufficient to characterize _all_ well-typed expressions. We summarize it in the following:

> **[Behavior of Well-Typed Expressions]** For any well-typed expression `e`, it either:
> 
>   1. Reduces to a value
>
>   2. Loops forever
>
>   3. Raises an exception

## Eager Evaluation
SML is an _eagerly evaluated_ language, or _call-by-value_. This stands opposed to other paradigms such as _lazy_ evaluation, or _call-by-need_, which is exhibited in languages such as Haskell. In a call-by-value language, we evaluate arguments of functions even if we may not need them. While this arguably may be "wasteful" in some cases, we will find that this greatly simplifies work/span analysis, among other benefits.

> **[Eager Evaluation]** In an eagerly evaluated language, arguments of functions are evaluated _before_ stepping into the body of a function. For a function `f` and valuable expression `e`, when evaluating the expression `f e`, first `e` is evaluated to obtain the value `v` such that `e ==> v`, then `f v` is evaluated.

As an example of this, consider the function `fn x => x + 1`. If we were to try and evaluate `(fn x => x + 1) (2 * 3)`, first we would need to evaluate the function's arguments, that being `2 * 3`. As such, this entire expression would reduce to `(fn x => x + 1) 6`, which is `7`.

In an example like the previous one, it doesn't particularly matter where we evaluated `2 * 3` - we would have gotten the same result either way. This is not always the case. Consider the expression `(fn x => 2) (1 div 0)`. By eager evaluation, we should evaluate the argument first, which means that this entire expression should raise an exception. Raising an exception thus happens _before we even look at the body of the function_. For all intents and purposes, the body of the function does not exist to us until we actually enter it - which necessitates that the argument to the function is valuable. It is a black box that is "locked" behind the argument. 

## Totality
Oftentimes, we will write proofs demonstrating the extensional equivalence of two expressions (extensional equivalence being a topic that will be covered more in-depth in the next article). In order to do so, we often will have to expand definitions, stepping through function bodies and applying lemmas. In doing so, we will frequently need to do a _totality citation_, to justify that making such steps is truly valid. While the name may seem unfamiliar, it ultimately belies a concept that you already know - valuability.

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

## Conclusions

In this section, we explored the idea of computation as evaluation, and how we can interpret SML code as being centered around expressions and values, interspersed between applications of simplifying rules. We learned about SML's usage of eager evaluation and how it affects the assumptions that we can make about the way that code reduces. Additionally, we explored the idea of totality, a direct corollary of our eager evaluation model, which we can use as a tool to justify certain steps that we make during extensional equivalence proofs. Totality (as well as SML's evaluational semantics in general) will be a recurring theme throughout this course, so it will be crucial to understand.
