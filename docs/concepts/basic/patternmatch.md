---
sidebar_position: 3
---

# Pattern Matching

_By Kaz Zhou, September 2020_. _Revised May 2021_

Patterns take on many appearances, such as:

- Constants: `150`
- Variables: `x`
- Wildcard: `_`
- Tuples: `(true, _)`
- Constructors (which may contain other patterns):
  - Lists: `x::xs`
  - Other datatypes: `Node(L,x,R)`

Patterns can be matched against values to form bindings. Consider the following declaration:

```sml
val (x,y) = (1,2)
```

The result is that `1` gets bound to `x`, and `2` gets bound to `y`.

Pattern matching may fail. For example, the following raises exception `Bind`.

```sml
val 10 = 9
```

Besides `val` declarations, pattern matching is also used in function declarations, lambda expressions, and case expressions.

## Function declarations

```sml
fun fact 0 = 1
  | fact n = n * fact(n-1)
```

The function `fact` is given an `int` as input. If the input successfully matches the pattern `0`, then the function returns `1`. Otherwise, the input is matched with the pattern `n`, binding the input to `n`. For example, if we evaluate `fact 5`, then `5` is bound to `n`, so the expression becomes `5 * fact(4)`.

Each clause of the function declaration tells `fact` what it should do, depending on the input. The bar, `|`, acts as a separator between the two clauses.

Note that it's important for your patterns to be _exhaustive_. The above function is fine, because all values of type `int` can match with either `0` or `n`. However, suppose we had the following function:

```sml
fun fiction 1 = 1
  | fiction 2 = 2
  | fiction 3 = 6
```

There are many inputs which do not match with either `1`, `2`, or `3`. For example, `fiction 4` would raise exception `Match`.

A more subtle bug is when patterns are redundant. The following example has the clauses of `fact` swapped.

```sml
fun factloop n = n * factloop(n-1)
  | factloop 0 = 1
```

The second clause of `factloop` never gets executed! When evaluating `factloop 0`, SML will try to match `0` to each pattern, _in order_. Therefore, `factloop 0` steps to `0 * factloop(-1)`, because `0` can match to `n`. Convince yourself that `factloop k` will loop forever for any `k` of type `int`!

## Lambda expressions

```sml
(fn [] => false | x::xs => true) [1,2,3]
```

The lambda expression is similar to a function, as it turns an input into an output. In the example above, `[1,2,3]` is the input. It doesn't match with `[]`, but it does match with `x::xs`. Namely, `1` gets bound to `x`, and the list `[2,3]` gets bound to `xs`. As a result of this successful pattern matching, the lambda expression returns `true`.

You should still make sure your patterns are exhaustive. For example, the following expression raises exception `Match`:

```sml
(fn [] => false) [1,2,3]
```

## Case expressions

```sml
fun fact' x =
    case x of
        0 => 1
      | n => n * fact' (n-1)
```

First, note that `fact'` does the same thing as `fact`. However, it uses an extra `case` expression.

Let's consider what happens when we evaluate `fact' 5`. First, `5` gets bound to `x`. Then, the `case` expression tries to match `5` to a pattern. In this scenario, `5` successfully pattern matches with `n`, so `5` gets bound to `n`. Therefore, `fact' 5` evaluates to `5 * fact' 4`.

As usual, the patterns in `case` expressions should be exhaustive.
