---
sidebar_position: 1
---

# Bool

_By Jacob Neumann, May 2020_

`bool` is the SML type of booleans. The `bool` type supports the usual constructs of boolean logic and "conditionals" (`if` expressions). `bool` is also the type produced when evaluating (in)equality between values of (suitable) types.

## Values

There are exactly two values of type `bool`, `true` and `false`.

```sml
datatype bool = true | false
```

In addition to the constructs generally available in pattern matching (e.g. wildcards and identifier binding), booleans can be pattern-matched against using the constructors `true` and `false`.

```sml
fun firstOrSecond ((x : int,y : int), true):int = x
  | firstOrSecond ((x,y), false) = y

val 2 = firstOrSecond((3,2),false)
```

`bool` is pretty-printed by the `smlnj` REPL, so the actual values will display. This is demonstrated by the following `smlnj` REPL snippet.

```sml
- val b = true orelse false;
val b = true : bool
```

## Production

Some common functions which produce booleans:

```sml
(op =)  : ''a * ''a -> bool
(op <>) : ''a * ''a -> bool  (* Inequality *)

(* All of the following are overloaded and also work on values of type real *)
(op <)  : int * int -> bool
(op >)  : int * int -> bool
(op <=) : int * int -> bool
(op >=) : int * int -> bool
```

## Elimination

The principal use of booleans is for evaluating one of two possible expressions, conditional on a value of type `bool`:

```sml
(* Evaluates to 5 *)
val res1 = if true then 5 else 2

(* Evaluates to 7 *)
val res2 = if false then 3+3 else 7
```

Note that the expression between `then` and `else` (the "then branch") has the same type as the expression after the `else` (the "else branch"). This is necessary: the SML typechecker does not evaluate expressions, and so does not "know" that, for instance, `if false then e1 else e2` will always reduce to `e2`. As far as the typechecker knows, `if false then e1 else e2` could reduce to `e1`. So, in order for the typechecker to be able to assign a type to the expression `if false then e1 else e2`, it must be the case that `e1` and `e2` have the same type. More formally,

> [If-Then] An expression `if b then e1 else e2` is well-typed (with type `t`) if and only if `b : bool` and `e1 : t` and `e2 : t`.

It is worth noting that `if b then e1 else e2` is equivalent to the following expression, written using SML's `case` syntax.

```sml
case b of
  true => e1
| false => e2
```

Which is also equivalent to

```sml
(fn true => e1 | false => e2) b
```

**NOTE:** It's important to note that, in the evaluation of the expression `if true then e1 else e2`, the expression `e2` is _never_ evaluated (and, analogously, `e1` never is evaluated in `if false then e1 else e2`). This is most evident when we look at the third syntax (with the lambda function): SML does not evaluate the body of a function _until the function is called_. So when `(fn true => e1 | false => e2)` gets applied to, say, `true`, then the evaluation steps immediately to `e1`, without ever evaluating `e2`. This point is explored more in a question below.

## Combination

`bool` is an equality type, and may therefore be compared with `=`, producing another `bool`.

```sml
val true = (true = true)
val false = (true = false)
val false = (false <> false)
```

`bool` also comes equipped with the usual boolean operators,

```sml
val true = true andalso true   (* andalso keyword, logical and *)
val true = false orelse true   (* orelse keyword, logical or *)
val false = not true           (* not:bool -> bool, logical negation *)
```

An important note about `andalso` and `orelse`: the evaluation of `b1 andalso b2` has a behavior known as _short-circuiting_:[^1] when evaluating this expression, SML will first attempt to evaluate `b1`. If `b1` raises an exception or loops behavior, then that will be the behavior of `b1 andalso b2` as a whole. If `b1` reduces down to the value `true`, then SML will then attempt to evaluate `b2`. However, if `b1` evaluates to the value `false`, then SML will _not evaluate `b2`_. This is exhibited in the following code snippet.

```sml
(* loops forever on any input *)
fun loop (x:int):bool = loop x

(* Evaluates to the value false, and doesn't loop *)
val false = false andalso (loop 3)
```

## From the Structure

The structure `Bool` is bound as part of the SML Basis. In addition to what's already been mentioned, it includes the utility function

```sml
Bool.toString : bool -> string
```

This is useful (for instance) for print-debugging the value of a `bool`-valued variable.

## Questions to Consider

1. Why are the following expressions _not_ equivalent?

   ```sml
   (if b then e1 else e2)

   (fn (x,y) => if b then x else y) (e1,e2)
   ```

2. Why are the following expressions _not_ equivalent?

   ```sml
   b1 andalso b2

   (fn (v1,v2) => v1 andalso v2) (b1,b2)
   ```

[^1]: This is why `andalso` and `orelse` are designated as _keywords_ above: they are _not_ infixed functions of type `bool*bool->bool`. Functions cannot exhibit this kind of "shortcircuiting" (evaluating one of their arguments and then deciding whether to evaluate the other): the integer addition `(op +) : int*int -> int` must have both of its arguments fully evaluated before proceeding to add them. The keywords `andalso` and `orelse` must be built-in to the SML evaluator to achieve shortcircuiting.
