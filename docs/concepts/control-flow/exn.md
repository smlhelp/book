---
sidebar_position: 2
---

# Exceptions

_By Brandon Wu, June 2020. Revised June 2022_

So far, we have seen how we can manipulate the constructs of SML to create unique control flow behavior in the form of continuation passing style. In this section, we will discuss _exceptions_, which are themselves a builtin feature of the language. With exceptions, we can cover cases where continuing to evaluate an expression does not make sense or is ill-defined at run-time.

## Built-In Exceptions

We have seen how SML interprets computation as evaluation, and how we can reduce our entire notion of program execution to application of simple reduction rules. Sometimes, however, we run into cases where attempting to apply some rule results in an error, or in some output that we cannot actually express. In such cases, it is necessary to actually _halt_ evaluation with some manner of effect - this is the behavior that exceptions will introduce.

While we would like to be able to push as many of these errors as possible to compile time, it is not always the case that this is possible - this is usually when dealing with cases where computation is made infeasible by the _values_ that are bound to identifiers, which cannot be determined _a priori_ at compile time. As such, we have no way of telling beforehand if such errors will occur - forcing us to define some notion of a _run-time error_.

There are numerous examples of built-in SML exceptions, however, you will encounter some far more than others. The following is a brief overview of what they are, when you will encounter them, and how to deal with them.

### Fail

Whether you knew it or not, you have certainly seen `Fail` before! Whenever you have a homework problem where we give you an unimplemented function in the form `fun myFunction x = raise Fail "Unimplemented"` you are using the power of exceptions! `Fail` can be thought of as an all-purpose exception, nothing super special, but quite useful!

### Div

This one is fairly straight-forward. `Div` is raised whenever you do a division operation that is mathematically invalid such as `1 div 0`.

### Match

The match exception is raised whenever you have a case of nonexhaustive pattern matching. We _generally_ want our patterns to be exhaustive, meaning that no matter the input, it matches to one of the buckets established by our patterns. Consider the function `fn true => 1`, which is plainly nonexhaustive, not covering the `false` case. Nonetheless, it is a function of type `bool -> int` that can be bound to an identifier. How, then, should we handle the case of attempting to evaluate `(fn true => 1) false`? This is a well-typed expression, causing it to fly under the radar of our compile-time tests. At run-time, then, we cannot evaluate this expression through function application - the function does not specify what it should return in this case! As such, we will simply raise a `Match` exception, signifying that the function's input was not able to match to any particular clause of the function.

#### Examples

Lines that cause exceptions will be marked `(* ! *)`

```sml
fun f 1 = 5
  | f 5 = 10

val x = f 6 (* ! *)

val y = case [] of x::xs => 17 (* ! *)
```

### Bind

Bind is similar to match, but crucially different. While Match is raised when you are unable to match with any clause, Bind is raised when you try to "force" a binding that cannot happen. An example of this would be `val 5 = 4`. SML we see that you are trying to force the value `4` to be assigned to the value `5` which obviously cannot happen.

In pattern matching, while we are attempting to produce a binding in case expressions/function clauses, we aren't "forcing" any bindings. Instead, we are simply attempting to find a case that could match our expression (and we only bind to the pattern if we find a successful case). If we aren't able to find a case that works, we raise `Match` to indicate that we tried to find a case that could match with our expression, but couldn't due to non-exhaustive casing.

`Bind` on the other hand is caused when we don't even try to case to see whether a pattern works or not. Instead, we are saying that our expression _has_ to bind with some pattern. If that binding cannot happen, then `Bind` is raised.

#### Examples

```sml
val () = 5
val "polly" = "honk" (* could you imagine! :O *)
```

## Defining Exceptions: Basic

We have now seen the built-in exceptions that are automatically raised for certain prescribed use cases. Oftentimes, however, we are interested in our own specified use cases, meaning that we likely do not want to use the exceptions `Div`, `Match`, and `Bind`, which may be unrelated. In this case, we want to define our own exceptions.

The syntax for defining exceptions is as follows:

```sml
exception Error
```

This introduces the constructor named Error, which corresponds to the identically named exception Error. Exception constructors are _first class_, meaning that they are themselves values. The type of exception constructors is `exn`, so this line really introduces the value `Error : exn`. The type `exn` stands for "exception name", but it is also useful to think of it as standing for "extensible", since the type `exn` is _extensible_. This means that we can _extend_ the values that populate `exn` with new constructors, like we did with `Error`.

The value `Error` is not, by itself, an exception, however we can use it to raise exceptions with the `raise` keyword. We can think of the `raise` keyword as being "like" a function of type `exn -> 'a`, in that it "takes in" a value of type `exn` and has type `'a`. It is important to remember that `raise` is _not_ a function really, though - it merely has similar behavior when used to raise exceptions, but it is not first class.

The polymorphic "return type" of the `raise` keyword is so that raising exceptions can be compatible with our type system. Suppose we want to write a factorial function that, instead of looping forever on negative inputs, raises an exception.

```sml
exception Negative

fun fact' 0 = 1
  | fact' n =
      if n < 0 then raise Negative
               else n * fact' (n-1)
```

This code fragment should carry out our desired behavior. Consider the type of `raise Negative` - we would like to raise an exception, but we know that the expressions in both branches of an if then else expression must be the same type. In the positive case, this has type `int`, corresponding to just calculating the actual factorial. Therefore the negative case must also be `int`, though we also want to raise an exception. To be compatible with this, `raise Negative` must have type `int`.

We would not like `raise Negative` to have type `int` in _general_, however - this depends on our use case! We want raising exceptions to be able to just _work_, type-wise, since we know that it never returns a well-defined value anyways. As such, we define raising exceptions to have a _polymorphic_ return type, so that it fits within our type system correctly, no matter the use case. This is also the reason why we can write `raise Fail "Unimplemented"` as the output of not-yet defined functions and still pass typechecking, no matter how complicated the function.

## Exceptional Control Flow

At this point, we have seen how exceptions let us implement a very limited form of "control flow", in that we can stop the flow of control entirely - upon encountering a raised exception, computation ceases. This is rather rudimentary in terms of expressiveness - we can only create programs that forcibly terminate! In this section, however, we will explore the usage of `handle`, a keyword that allows us to have more sophisticated behavior with respect to programs deal with raised exceptions.

> **[handle]** For expressions `e : t`, `e1 : t` ... `en : t`, and different values `Exn1 : exn` ... `ExnN : exn`, if the expression `e` raises the exception `ExnI`, then the expression
>
> ```sml
> e handle Exn2 => e1
>        | Exn2 => e3
>        ...
>        | ExnN => en
> ```
>
> reduces to `eI`.
>
> In other words, the `handle` keyword lets us case on the exception raised by an expression.

It is important to note that all the expressions `e`, `e1`, ... `en` have to be of the same type. Consider what would happen if they were not:

```sml
e handle Div => "Oh no!"
```

Let `e` be an expression of type `int`. Suppose that, in this case, `e` raises `Div`, so ostensibly this expression should reduce to `"Oh no!"`. However, what would happen if `Div` was not raised? Then, we would have `e`, which is of type `int`.

We've violated type safety here. We cannot "sometimes" have an expression be one type and another time have it be another. We must have _static type guarantees_. As such, all the arms of a `handle` must agree, and additionally they must agree with the type of the expression being handled.

We say that an exception that is raised can either propagate up to the _top level_ (in which case the program or expression simply results in an uncaught exception), or to the _nearest handler_. To clarify the meaning of "nearest", take the evaluation of the expression `(1 + (1 div 0)) * 3 handle Div => 5`, for example. We see that `1 div 0` raises the exception `Div`, so the inner expression is extensionally equivalent to `(1 + raise Div) * 3`. Then, applying this logic one more time, `1 + raise Div` clearly should also raise `Div`, so we get that it is extensionally equivalent to `raise Div * 3`, which is then extensionally equivalent to `raise Div`. What we see is that this raised exception "propagates up" as it subsumes more and more expressions, until eventually it reaches a handler.

While we now see how we can handle different kinds of exceptions, we might want to make a more educated choice about what our next action should be. It might be the case that we raise an exception in some failed branch of the program, but we want to have more information about exactly what happened, or what the program was doing at the time. We will now discuss _information-carrying exceptions_, which are nothing other than an extension of our declarations of exceptions to being more akin to how we declare datatypes.

In a similar vein to how we can declare `datatype Foo = Bar of int` to denote that a value of type `Foo` is the constructor `Bar` wrapping a value of type `int`, we can declare values of type `exn` to also be constructors wrapping values. This takes the form:

```sml
exception Crash of int
```

which denotes that `Crash 1` and `Crash 5`, among others, are values of type `exn`, and can thus be `raise`d. Note that `Crash` thus has type `int -> exn`.

Concretely, we can "pattern match" on the data contained by the exception handler by doing something like the following:

```sml
exception Return of int

fun factException 0 = raise Return 1
  | factException n = factException (n - 1) handle (Return res) => raise Return
  (n * res)
```

**NOTE:** It is not clear why anyone would want to define `fact` this way.

This example makes use of an exception, `Return : int -> exn`, which wraps the return value of `fact`. `fact`, at each step, simply raises an exception containing its return value, which (in a future recursive call) is handled, the value unwrapped (bound to `res`), then multiplied by the current value of `n` to generate the next value, which is simply raised again. This is very similar to a `case` expression - we simply pattern match on the raised exception's constructor using the handler (you can pattern match on exception constructors with `case` as well, though not _raised_ exceptions). Thus, the behavior of `factException n` is to be extensionally equivalent to `raise Return (fact n)`.

For an abstract idea of a potential use case, consider some recursive function `f` that carries out some sequence of calculations, with a potential for error. We might be interested in how many recursive calls such a function makes when it ultimately fails - however, if we were to return the number of recursive calls, we would constrain the return type to be `int`, or barring that, some datatype that could be either a valid result (say, `Valid res`) or a signal for failure, with a line number (say, `Fail line`). We might desire that on a fail, execution actually stops, however. We could then simply raise the exception `Crash line`, which, as a raised exception, has a polymorphic type. As such, exceptions allow us to propagate back information _without altering types_, which can be convenient for our purposes.

For a concrete example of using such exceptions, see the next section.

## Exception Handling Style

In the previous section, we discussed how continuation passing style could be used to devise complicated control flow schemas, in some instances being based around the idea of a _success_ and _failure_ continuation, which could both potentially execute disjoint sets of instructions. With continuations, we can relate them to a common other construct in programming languages, that being a _goto_. With a goto, we abandon whatever we are currently in the process of doing in favor of something else. In this, we can see that continuations and exceptions share similar characteristics, of being able to just "stop" execution in favor of some other route.

Consider the knapsack example from the previous section. We will now implement a solution to the knapsack problem using exception handling style.

```sml
exception Failure

type weight = int
type value = int

(* knapsackEHS :
 *            (value * weight) list ->
 *            value ->
 *            weight ->
 *            ((value * weight) list -> 'a) ->
 *            'a
 * REQUIRES: The weights and values of the elements in L are strictly positive.
 * ENSURES: knapsackEHS L minVal maxWeight sc fc ~= sc L' for some L' that only
 * contains elements of L, such that the total value of L' >= minVal and the
 * total weight of L' <= maxWeight, if such an L' exists. If no such L' exists,
 * then it should be equivalent to raise Failure.
 *)

fun knapsackEHS
  (L : (value * weight) list)
  (minVal : value)
  (maxWeight : weight)
  (sc : (value * weight) list -> 'a)
  : 'a =
  case L of
    [] => if minVal <= 0 andalso maxWeight >= 0 then sc []
                                                else raise Failure
  | (v, w)::xs => if maxWeight < 0 then raise Failure
                                   else
    knapsackEHS ((v, w)::xs) (minVal - v) (maxWeight - w)  (fn L' => sc ((v, w)::L'))
    handle Failure => knapsackEHS xs minVal maxWeight sc
```

It should be apparent that this function shares very close similarities to `knapsackCPS`, with the exception[^1] of omitting the failure continuation for raising the `Failure` exception. In fact, we can claim that `knapsackCPS L minVal maxWeight sc fc ~= knapsackEHS L minVal maxWeight sc handle Failure => fc ()`, for all relevant values. Take a moment to assure yourself that this is the case. The code does not look very different, with the largest change being the recursive case, where the failure continuation has instead been offloaded to a handler.

Recall that we can think of the recursive call in the knapsack problem as a "choice" to "keep" or "not keep" the item at the head of the list. We said previously that, arbitrarily, we could commit to the choice of "keep", with a provision in the failure continuation to instead "not keep", should that failure continuation ever be executed. When evaluating the expression `knapsackEHS ((v, w)::xs) (minVal - v) (maxWeight - w) (fn L' => sc ((v, w)::L'))`[^2], we know that one of two things can happen - it can either _succeed_ or _fail_. Now, however, our definition of failure is different - instead of calling its failure continuation, an instance of `knapsackEHS` which fails should instead raise `Failure`. Thus, it is exactly the right thing to do to do what we would ordinarily do upon a failure, should our call to `knapsackEHS` raise `Failure`.

Note, however, that in this implementation we put a slight amount more burden on the user, since the ill-defined behavior of this function now results in a raised `Failure`, instead of just invoking `fc ()`, for some pre-defined `fc` that we input. This offers us the same advantages, however, since the return types of `sc` and `fc` in `knapsackCPS` must be the same. As such, if we want `knapsackCPS` to return some indicative value (without using an option type), we might not have an appropriate return value for the failure case. Thus, `knapsackEHS` might have the behavior we're looking for, since the type of `raise Failure` allows us to "unconstrain" the type of our success. In the general case, however, we will not make heavy usage of exception handling style, in favor of continuation passing style, which can be cleaner.

This is not the most committed that we could have made `knapsackEHS`, when converting to exception handling style - we could have also represented _success continuations_ with a raised exception, an `exception Success of (int * int) list`. We will not cover such an implementation in this chapter, but we invite the reader to try it out.

## Conclusions

In this chapter, we explored _exceptions_, which allow us to have quick transfers of control flow, albeit in a less "controlled" fashion than ways that we have seen in the past. The success of so-called _exception handling style_ is heavily contingent on intelligent placement and consideration of _handlers_, which decide where control is transferred to. We also have seen that we have a way of passing information back _through_ the raised exception, which allows us to have a more powerful manner of communication than just an indicator of failure. Exceptions ultimately allow us a robust and type-safe way to deal with run-time errors in our programs.

[^1]: We're funny.
[^2]: Say that five times fast.
