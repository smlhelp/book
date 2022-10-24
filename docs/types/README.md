---
sidebar_position: 3
---

# Types

_By Brandon Wu, May 2020_

Types are a very fundamental concept to Standard ML (SML), and indeed, to functional programming in general. Most programming languages have some notion of type, with `int`, `float`, and data structures such as `array` being common examples, however they tend to be weakly enforced, only being verified at runtime. In SML, we employ a system of _strong typing_ consisting of stricter typing rules — which allows us to catch errors earlier in program execution — at compile time.

## Type Safety

Oftentimes, data is separated into types so that we can differentiate different kinds of data from each other. For instance, it makes no sense to add a `string` and an `int`, though certain programming languages will try to make sense of it. Usually, when different data types are haphazardly intermingled, it is because someone wrote a bug. The philosophy behind SML's type system is to disallow such intermingling. In SML, every expression and every function has a specified type, which governs what interactions are possible with other expressions.

Consider the following code fragment in Python:

```py
def foo(x):
    if x == 2:
        return 1
    elif x == "bar":
        return True
    return None
```

What is the type of its output? The answer is "it depends", as it is dependent on the value of `x` that is passed in. We could give `foo` any type of argument, and we can see that in the cases that we pass in `2` or `"bar"`, we could obtain an `int` or a `bool` as output, or even a `None` in any other case.

Consider the expression `foo(y) + 3`. Is it safe to evaluate? Again, the answer depends on what the value of `y` is, but we see the same answer of "it depends". In some cases, depending on what the program has done up to this point, it may be safe; this is in the case where `y` is `2`, in which case `foo(y) + 3` would just be `4`. But if it wasn't, we may end up trying to add `True` or `None` to `3`, which clearly doesn't make sense. If we tried to add `None` to `3` we would encounter a _type error_. While a contrived piece of code, type errors such as this spring up in code all the time. Type errors are unsafe. Whoever wrote this program likely didn't intend to try and add a non-`int` to `3`, but it can be tricky to reason about whether or not such an outcome is truly possible.

In SML, our philosophy will be to make such uncertainties impossible. We impose a certain degree of _determinism_ on our programs, such that the types of each expression and each step of evaluation throughout our program have a definite type that is known to the program. If a program tries to execute some computation that would use the wrong type somewhere, or otherwise cause types to mismatch, then we would call the program _ill-typed_ or _not well-typed_, and it would be rejected before any evaluation. This process of verifying types is called _type-checking_, and occurs at _compile-time_, which stands opposed to _run-time_. Compile-time type-checking happens before any actual evaluation — before the program's run-time — and only upon passing the type-checking phase will the program actually execute. At this point, we say the program _type-checks_.

## Type-Checking

The most fundamental rule for type-checking is during _function application_, or the act of _applying_ a function to its arguments. This is elaborated on further in the chapter on functions.

> **[APP]** An expression `e1 e2` has type `t2` if and only if `e1 : t1 -> t2` and `e2 : t1`.

More specifically, for a function `f : t1 -> t2`, if `x : t3` where `t3` is not the same type as `t1`, then the expression `f x` is not well-typed and therefore has no value. In other words, applying a function to an argument that does not match its argument type does not type-check — because doing that creates a type error — which will prompt the compiler to reject the program at compile-time during the type-checking process. We call an expression that does not encounter a type error _well-typed_. A program that passes the type-checking process is one that type-checks.

The majority of type errors will occur as a consequence of this rule. Since functions have definite return types, it is very straightforward to check if a program type-checks or not: simply evaluate the _types_ of the expressions and see if any type errors are encountered. The type-checking phase is agnostic to the specific values of well-typed expressions. When given an expression — such as `1 + 2` — the compiler sees two expressions of type `int` being passed into a function of type `int * int -> int` and knows that the result must be of type `int` — thus the entire expression `1 + 2` is well-typed.

Because of this, the well-typedness of expressions is independent of any run-time errors that may occur. For instance, the expression `1 div 0` clearly cannot give back a value of type `int`, as division by 0 is undefined. Instead, `1 div 0` will raise the exception `Div` during execution and try to terminate the execution of the program. From the perspective of the compiler's type-checking process, it only cares that all arguments to `div` are of the right type — it only cares that the types match. The second argument of `div` being `0` still type-checks. So even though `1 div 0` will not evaluate to a value, it also will not encounter a type error; therefore the expression `1 div 0` is well-typed and has the type `int`.

## Conclusion

SML's strong type system is a very powerful tool for ensuring the correctness of programs. The philosophy behind Standard ML is to push errors to compile-time — before a program is even run. In doing so, we ensure that unexpected errors do not arise during run-time, long after we've already proven that our code is correct. With strong typing and type-checking, we can guarantee that our code will be free of type errors, eliminating those bugs from our code at run-time. Later in this section, we will discuss some concrete types.
