# Types

Types are a very fundamental concept to Standard ML (SML), and indeed, to functional programming in general. Most programming languages have some notion of type, with `int`, `float`, and data structures such as `array` being common examples, however they tend to be weakly enforced, only being verified at runtime. In SML we employ a system of _strong typing_ consisting of stricter typing rules — which allows us to catch errors earlier in program execution — at compile time.

## Type Safety
Oftentimes, data is separated into types so that we can differentiate different kinds of data from each other. For instance, it makes no sense to add a `string` and an `int`, though certain programming languages will try to make sense of it. Usually when different data types are haphazardly intermingled, it is because someone wrote a bug. The philosophy behind SML's type system is to disallow such intermingling. In SML every expression and every function has a specified type, which governs what interactions are possible with other expressions.

Consider the following code fragment in Python:
```python
def foo(x):
    if x == 2:
        return 1
    elif x == "bar":
        return True
    return None
```
What is the type of its output? The answer is "it depends", as it is dependent on the value of `x` that is passed in. We could give `foo` any type of argument, and we can see that in the cases that we pass in `2` or `"bar"`, we could obtain an `int` or a `bool` as output, or even a `None` in any other case.

Consider the expression `foo(y) + 3`. Is it safe to evaluate? Again, the answer depends on what the value of `y` is, but we see the same answer of "it depends". In some cases, depending on what the program has done up to this point, it may be safe; this is in the case where `y` is `2`, in which case `foo(y) + 3` would just be `4`. But if it wasn't, we may end up trying to add `True` or `None` to `3`, which clearly doesn't make sense. If we tried to add `None` to `3` we would encounter a _type error_. While a contrived piece of code, type errors such as this spring up in code all the time. Whoever wrote this program likely didn't intend to try and add a non-`int` to `3`, but it can be tricky to reason about whether or not such an outcome is truly possible.

In SML, our philosophy will be to make such uncertainties impossible. We impose a certain degree of _determinism_ on our programs, such that the types of each expression and each step of evaluation throughout our program have a definite type that is known to the program. If a program tries to execute some computation that would use the wrong type somewhere, or otherwise cause types to mismatch, then we would call the program _ill-typed_, and it would be rejected before any evaluation. This process of verifying types is called _type-checking_, and occurs at _compile-time_, which stands opposed to _run-time_. Compile-time type-checking happens before any actual evaluation — before the program's run-time — and only upon passing the type-checking phase will the program actually execute. At this point, we say the program _type-checks_.

## Type-Checking

The most fundamental rule for type-checking is during function application, or the act of applying a function to its arguments. This is elaborated on further in the chapter on functions.

> __[APP]__ An expression `e1 e2` has type `t2` if and only if `e1 : t1 -> t2` and `e2 : t1`.

More specifically, for a function `f : t1 -> t2`, if `x : t3` where `t3` is not the same type as `t1`, then the expression `f x` is ill-typed. In words, giving a function an argument that is not of the corresponding type to its input type is ill-typed, and will cause a program to reject at compile-time. We call an expression that does not encounter a type error _well-typed_.

The majority of type errors will occur as a consequence of this rule. Since functions have definite return types, it is very simple to check if a program type-checks - simply evaluate the _types_ of the expressions and see if a type error is reached. The type-checking phase is agnostic to the specific values of expressions - when given an expression such as `1 + 2`, it simply sees two expressions of type `int` being passed into a function of type `int * int -> int`, and thus knows that the result must be of type `int`, and that the entire expression is well-typed.

Because of this, the well-typedness of expressions is independent of any run-time errors that may occur. For instance, the expression `1 div 0` clearly cannot give back a value of type `int`, as division by 0 is undefined. Instead, during execution, `1 div 0` will raise the exception `Div`, and try to terminate execution of the program. From the perspective of type-checking, however, it has no way of knowing that the second argument of `div` is `0`, since it only looks at the types. As such, even though it will not return a value, the expression `1 div 0` is well-typed, and has type `int`.

## Conclusion
SML's type system is a very powerful tool for ensuring the correctness of programs. The philosophy behind Standard ML is to push errors to compile-time, before a program is even run - in doing this, we can ensure that unexpected errors do not arise during run-time, long after we've already concluded that our code is correct. With strong typing and type-checking, we can guarantee that our code will be free of type errors, reducing the possibility of making mistakes. Later in this section, we will discuss some concrete types.
