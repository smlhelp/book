---
sidebar_position: 2
---

# SML Syntax Cheatsheet

_By David Sun, February 2021_

#### Built-in Types

Six of the built-in types commonly encountered:

| Expression  |   Type   |
| :---------: | :------: |
|     `0`     |  `int`   |
| `"foo bar"` | `string` |
|   `#" "`    |  `char`  |
|   `true`    |  `bool`  |
|    `1.0`    |  `real`  |
|    `()`     |  `unit`  |

#### Structured Types

Make tuples and lists using built-in types and themselves.

|        Expression         |                 Type                 |
| :-----------------------: | :----------------------------------: |
|        `(15,150)`         |             `int * int`              |
|        `[1,2,3,4]`        |              `int list`              |
| `[["foo","bar"],["baz"]]` |          `string list list`          |
| `((true,1),(false,0,()))` | `(bool * int) * (bool * int * unit)` |
|      `[(0,1),(1,0)]`      |          `(int * int) list`          |
|  `([#"a",#"b"],[3.14])`   |       `char list * real list`        |

Note: 1-tuples don't exist in Standard ML.

#### Operators

Operators have different priority levels. Higher priority operations are performed before lower priority operations. The operators `*`, `+`, and `-` work on both `int` and `real` types.

| Operator | Meaning | Priority | Example Expression | Evaluates To | Notes |
| :-: | :-: | :-: | :-: | :-: | :-: |
| `*` | numeric multiplication | 7 | `8 * 3` | `24` |  |
| `/` | `real` division | 7 | `3.0 / 2.0` | `1.5` | operands must be `real` |
| `div` | integer divison | 7 | `3 div 2` | `1` | operands must be `int` |
| `mod` | "modulo" | 7 | `8 mod 3` | `2` | operands must be `int` |
| `+` | numeric addition | 6 | `3 + 4` | `7` |  |
| `-` | numeric subtraction | 6 | `3 - ~2` | `5` | `~` denotes negative numbers, e.g. `~5` |
| `^` | string combination | 6 | `"foo" ^ "bar"` | `"foobar"` |  |
| `::` | list construction ("cons") | 5 | `1 :: [2,3,4]` | `[1,2,3,4]` | right-associative |
| `@` | list combination ("append") | 5 | `[1,2] @ [3,4]` | `[1,2,3,4]` | right-associative |

Except for `::` and `@`, the remaining built-in operators above are left-associative. Left-associative operations of equal priority implicitly evaluate from left to right. Right-associative operations of equal priority implicitly evaluate from right to left.

| Expression | Implicit Interpretation | Evaluates To |
| :-: | :-: | :-: |
| `3 - ~2 + ~5` | `((3 - ~2) + ~5)` | `0` |
| `1 :: 2 :: 3 :: []` | `1 :: (2 :: (3 :: []))` | `[1,2,3]` |
| `1 :: [] @ 2 :: [] @ 3 :: []` | `1 :: ([] @ (2 :: ([] @ (3 :: []))))` | `[1,2,3]` |

#### Boolean Operation

There are three main ones: `andalso`, `orelse` and `not`.

| Expression | Evaluates To | Notes |
| :-: | :-: | :-: |
| `false andalso true` | `false` | `andalso` short-circuits if left operand evaluates to `false` |
| `true orelse false` | `true` | `orelse` short-circuits if left operand evaluates to `true` |
| `not true` | `false` |  |
| `not false` | `true` |  |

Note: See the page about the `bool` type [here](../types/bool.md) for more information on short-circuiting behavior.

There are built-in equality operators: `=` and `<>`.

| Operator |    Meaning     | Priority | Example Expression | Evaluates To |
| :------: | :------------: | :------: | :----------------: | :----------: |
|   `=`    |   "equal to"   |    4     |    `1+2 = 4-1`     |    `true`    |
|   `<>`   | "not equal to" |    4     |    `"a" <> "b"`    |    `true`    |

These two operate on _equality types_, which include the built-in types mentioned before — and the structured types that can be made from them — **excluding** `real` and function types.

| Expression | Evaluates To |
| :-: | :-: |
| `(true,true) = (true,true)` | `true` |
| `0 = 1 andalso 1 = 1` | `false` |
| `0 <> 0 orelse 1 <> 1` | `false` |
| `[1,2,3,4] = [1,2,3,4]` | `true` |
| `(1,2,"a","b") = (1,2,"a","b")` | `true` |
| `([1,2,3,4],(["a","b"],[()])) = ([1,2,3,4],(["a","b"],[()]))` | `true` |
| `0.0 = 0.0` | N/A: Not Well Typed |

Note: See the page about the `real` type [here](../types/real.md) for more information on why `0.0 = 0.0` is not allowed.

There are built-in comparison operators `>`, `<`, `>=`, and `<=`.

| Operator | Meaning | Priority | Example Expression | Evaluates To |
| :-: | :-: | :-: | :-: | :-: |
| `>` | "greater than" | 4 | `"ba" > "ab"` | `true` |
| `<` | "less than" | 4 | `"ab" < "abc"` | `true` |
| `>=` | "greater than or equal to" | 4 | `#"a" >= #"A"` | `true` |
| `<=` | "less than or equal to" | 4 | `"cab" <= "cba"` | `true` |

These have limited use; they operate on `int`, `string`, `char`, `real`.

To build good habits, please practice using the built-in comparison functions `Int.compare`, `String.compare`, `Char.compare`, and `Real.compare` to compare their corresponding types instead of exclusively using these equality and comparison operators.

#### Comparison Functions

There is an `order` type with three values: `LESS`, `EQUAL`, and `GREATER`.

|    Expression    |            Type            |
| :--------------: | :------------------------: |
|      `LESS`      |          `order`           |
|     `EQUAL`      |          `order`           |
|    `GREATER`     |          `order`           |
|  `Int.compare`   |    `int * int -> order`    |
| `String.compare` | `string * string -> order` |
|  `Real.compare`  |   `real * real -> order`   |

Example use:

|           Expression           | Evaluates To |
| :----------------------------: | :----------: |
|      `Int.compare (~1,0)`      |    `LESS`    |
|      `Int.compare (0,0)`       |   `EQUAL`    |
|      `Int.compare (1,0)`       |  `GREATER`   |
| `String.compare ("abc","bac")` |    `LESS`    |
| `String.compare ("cba","cb")`  |  `GREATER`   |
|    `Real.compare (0.0,0.0)`    |   `EQUAL`    |

Sometimes you want to compare data that is not of basic built-in types, e.g. when sorting lists of tuples. The built-in comparison operators by themselves will not work, but using the `order` type allows you to write a comparison function (perhaps using other comparison functions) that defines your own order over that data.

#### Comments

Comments are denoted using `(* *)`.

```sml
(* This is a comment. *)

(* This is another comment.
   Comments can span multiple lines!
 *)

(* This is (* a comment within *) a comment. *)
```

#### Value Binding

Use the `val` keyword to create variables. It binds values to identifiers (variable names).

```sml
val x : int = 5
val (a,b) : int * int = (1,2)
val L : int list = [3,4]
```

|      Expression       | Evaluates To |
| :-------------------: | :----------: |
|          `x`          |     `5`      |
|          `a`          |     `1`      |
|          `b`          |     `2`      |
|        `3 * x`        |     `15`     |
| `2 * x * (5 + 2 * x)` |    `150`     |
|      `a * x + b`      |     `7`      |
|     `a :: b :: L`     | `[1,2,3,4]`  |

#### Let-Expressions

Create local bindings (local variables) to compute a `let`-expression. Place declarations and bindings between the `let`-`in`; the `let`-expression between the `in`-`end`. Can be nested. The scope of the `let`-`in` declaration is that `let`-expression's expression.

<table>
<tr>
<th> Expression </th>
<th> Evaluates To </th>
</tr>
<tr>
<td>

```sml
let
  val x : int = 25
  val x : int = x + 25 (* Shadows the previous x binding *)
  val y : int = x + 50
in
  x + y
end
```

</td>
<td>

```sml
150
```

</td>
</tr>
<tr>
<td>

```sml
let
  val x : int = 25
in
  let
    val x : int = x + 25 (* Shadows the previous x binding *)
  in
    let
      val y : int = x + 50
    in
      x + y
    end
  end
end
```

</td>
<td>

```sml
150
```

</td>
</tr>
</table>

#### Lambda Expressions

Write lambda expressions using the `fn` keyword — often verbalized as **"lambda"**. A lambda expression is of the form: `fn`, pattern, `=>`, expression. The lambda expression itself is a value [—](https://raw.githubusercontent.com/smlhelp/book/master/static/easteregg.jpg) a value of function type. The `=>` in lambda expressions correspond to the `->` in their types. The `->` arrows are right-associative infix type constructors denoting function types. Apply lambda expressions via prefix application — before the immediate operand.

| Expression | Evaluates To | Type |
| :-: | :-: | :-: |
| `(fn (x : int,y : int) => x + y)` | `(fn (x : int,y : int) => x + y)` | `int * int -> int` |
| `(3,4)` | `(3,4)` | `int * int` |
| `(fn (x : int,y : int) => x + y) (3,4)` | `7` | `int` |

#### Function Binding

Using a lambda expression more than once requires retyping it. We can give it a name instead. The `val` and `fun` keywords bind a lambda expression to an identifier, creating a _named function_. Take note that the `=` for binding differs from the `=>` reserved word.

```sml
(* add : int * int -> int *)
val add : int * int -> int = fn (x,y) => x + y

(* add : int * int -> int *)
fun add (x : int,y : int) : int = x + y
```

Both function bindings for `add` above have the same value: `(fn (x,y) => x + y) : int * int -> int`.

A named function can be thought of as a lambda expression that has been "identified". The bindings to `add` identify (or name) an otherwise anonymous function. Its value is the lambda expression it binds.

|         Expression          |         Value         |        Type        |
| :-------------------------: | :-------------------: | :----------------: |
|            `add`            | `(fn (x,y) => x + y)` | `int * int -> int` |
|    `(fn (x,y) => x + y)`    | `(fn (x,y) => x + y)` | `int * int -> int` |
|         `add (3,4)`         |          `7`          |       `int`        |
| `(fn (x,y) => x + y) (3,4)` |          `7`          |       `int`        |

#### Patterns and Case Expressions

Patterns are present in every lambda expression, `case` expression, `val`, and `fun` binding. Every `fn` clause, `case` clause, and `fun` clause contains a pattern with a corresponding expression. A clause is of the form: pattern, `=>`, expression. Clauses are delimited by pipes `|`.

<table>
<tr>
<th> Expression </th>
<th> Example Clause </th>
<th> Clause Pattern </th>
<th> Clause Expression </th>
</tr>
<tr>
<td>

```sml
(fn (x,y) => x + y)
```

</td>
<td>

`(x,y) => x + y`

</td>
<td>

`(x,y)`

</td>
<td>

`x + y`

</td>
</tr>
<tr>
<td>

```sml
(fn true  => 1
  | false => 0)
```

</td>
<td>

`true => 1`

</td>
<td>

`true`

</td>
<td>

`1`

</td>
</tr>
<tr>
<td>

```sml
(fn 0 => true
  | _ => false)
```

</td>
<td>

`_ => false`

</td>
<td>

`_`

</td>
<td>

`false`

</td>
</tr>
</table>

Lambda expressions and `case` expressions have the same clause syntax. The clausal _patterns_ must be able to match to the type of the expression being cased on. The clausal _expressions_ must all have the same type (which may be different from that of the expression cased on).

<table>
<tr>
<th> Expression </th>
<th> Example Clause </th>
<th> Clause Pattern </th>
<th> Clause Expression </th>
</tr>
<tr>
<td>

```sml
(case () of
      _ => ())
```

</td>
<td>

`_ => ()`

</td>
<td>

`_`

</td>
<td>

`()`

</td>
</tr>
<tr>
<td>

```sml
(case #"A" < #"a" of
      true  => ":)"
    | false => ":(")
```

</td>
<td>

`true => ":)"`

</td>
<td>

`true`

</td>
<td>

`":)"`

</td>
</tr>
<tr>
<td>

```sml
(case Int.compare (1,0) of
      LESS    => false
    | EQUAL   => false
    | GREATER => true)
```

</td>
<td>

`GREATER => true`

</td>
<td>

`GREATER`

</td>
<td>

`true`

</td>
</tr>
</table>

The wildcard pattern `_` will match to any type, but create no bindings (ignore it).

|                                     Candidate | Valid Pattern? |
| --------------------------------------------: | :------------- |
|                                          `()` | Yes            |
|                                           `0` | Yes            |
|                                        `":)"` | Yes            |
|                                        `true` | Yes            |
|                                       `EQUAL` | Yes            |
|                                       `3 + 4` | No             |
|                                   `":" ^ ")"` | No             |
|                                       `3 < 4` | No             |
|                           `Int.compare (0,0)` | No             |
|                                 `Int.compare` | No             |
|                                         `0.0` | No             |
|                                 `(fn x => x)` | No             |
|                                           `x` | Yes            |
| any variable name that is not a reserved word | Yes            |
|                                           `_` | Yes            |
|                                       `(0,1)` | Yes            |
|                                       `(x,y)` | Yes            |
|                                       `(_,_)` | Yes            |
|                                       `(x,x)` | No             |
|                                          `[]` | Yes            |
|                                         `[x]` | Yes            |
|                                      `[[[]]]` | Yes            |
|                                     `([],[])` | Yes            |
|                                     `[] @ []` | No             |
|                                    `[x] @ xs` | No             |
|                                       `L @ R` | No             |
|                                       `x::xs` | Yes            |
|                                    `x::y::xs` | Yes            |
|                                        `_::_` | Yes            |

A pattern that accounts for every possible value of the type it matches to is said to perform an exhaustive match. The match is nonexhaustive if and only if a possible value of that pattern's type is missed.

<table>
<tr>
<th> Expression </th>
<th> Pattern Type </th>
<th> Exhaustive Match? </th>
</tr>
<tr>
<td>

```sml
(fn () => ())
```

</td>
<td>

`unit`

</td>
<td>

Yes

</td>
</tr>
<tr>
<td>

```sml
(fn true => 1)
```

</td>
<td>

`bool`

</td>
<td>

No

</td>
</tr>
<tr>
<td>

```sml
(fn true  => 1
  | false => 0)
```

</td>
<td>

`bool`

</td>
<td>

Yes

</td>
</tr>
<tr>
<td>

```sml
(fn LESS => ~1)
```

</td>
<td>

`order`

</td>
<td>

No

</td>
</tr>
<tr>
<td>

```sml
(fn LESS  => ~1
  | EQUAL => 0)
```

</td>
<td>

`order`

</td>
<td>

No

</td>
</tr>
<tr>
<td>

```sml
(fn LESS    => ~1
  | EQUAL   => 0
  | GREATER => 1)
```

</td>
<td>

`order`

</td>
<td>

Yes

</td>
</tr>
<tr>
<td>

```sml
(fn 0 => true)
```

</td>
<td>

`int`

</td>
<td>

No

</td>
</tr>
<tr>
<td>

```sml
(fn 0 => true
  | _ => false)
```

</td>
<td>

`int`

</td>
<td>

Yes

</td>
</tr>
<tr>
<td>

```sml
(fn x::_ => x + 1)
```

</td>
<td>

`int list`

</td>
<td>

No

</td>
</tr>
<tr>
<td>

```sml
(fn [] => 0
  | x::_ => x + 1)
```

</td>
<td>

`int list`

</td>
<td>

Yes

</td>
</tr>
<tr>
<td>

```sml
(fn (0,b) => true andalso b)
```

</td>
<td>

`int * bool`

</td>
<td>

No

</td>
</tr>
<tr>
<td>

```sml
(fn (0,b) => true andalso b
  | (n,_) => false)
```

</td>
<td>

`int * bool`

</td>
<td>

Yes

</td>
</tr>
</table>

Using a wildcard for the first clause's _entire_ pattern produces an exhaustive match.

#### Recursive Function Binding

The `rec` reserved word enables a lambda expression to self-reference within its body. The `fun` reserved word allows self-reference by default. The clause patterns and expressions in `fun` clauses are separated by `=` instead of `=>`.

```sml
val rec length : int list -> int = fn [] => 0 | _::xs => 1 + length xs

fun length ([]    : int list) : int = 0
  | length (_::xs : int list) : int = 1 + length xs
```

As before, _both_ `length` bindings have the same value. Don't forget about the lambda!

<table>
<tr>
<th> Expression </th>
<th> Value </th>
<th> Type </th>
</tr>
<tr>
<td>

`length`

</td>
<td>

```sml
(fn [] => 0 | _::xs => 1 + length xs)
```

</td>
<td>

`int list -> int`

</td>
</tr>
<tr>
<td>

`length []`

</td>
<td>

`0`

</td>
<td>

`int`

</td>
</tr>
<tr>
<td>

`length [1,2,3,4]`

</td>
<td>

`4`

</td>
<td>

`int`

</td>
</tr>
</table>

#### Conditional Expressions

Require a condition that evaluates to `true` or `false`, after the `if`. Two expressions of the same type — one for the `then`-branch, one for the `else`-branch. Note that `if`-`then`-`else` expressions only evaluate one of its two branches — the one it takes.

| Expression | Evaluates To |
| :-: | :-: |
| `if 0 <> 1 then "foo" else "bar"` | `"foo"` |
| `if 0 = 1 then (if true then 1 else 2) else (if false then 3 else 4)` | `4` |
| `if true then 1 else (1 div 0)` | `1` |
| `if false then (1 div 0) else 0` | `0` |

#### op

The `op` keyword converts a binary infix operator to binary prefix operation. Priorities are kept the same as before.

|       Expression       | Evaluates To |
| :--------------------: | :----------: |
|     `(op *) (8,3)`     |     `24`     |
|     `(op +) (3,4)`     |     `7`      |
| `(op ^) ("foo","bar")` |  `"foobar"`  |
| `(op ::) (1,[2,3,4])`  | `[1,2,3,4]`  |
| `(op @) ([1,2],[3,4])` | `[1,2,3,4]`  |

#### as

If convenient, we can use the `as` keyword between a variable and a structured pattern to reference a structured value both as a whole and by its constituents. The pattern to the left of `as` must be a variable. It can be nested. It is always part of a pattern.

```sml
val tuple as (a,b) : int * int = (1,2)
```

| Variable Name | Bound To |
| :-----------: | :------: |
|      `a`      |   `1`    |
|      `b`      |   `2`    |
|    `tuple`    | `(1,2)`  |

```sml
val outer as (inner as (a,b),c) : (int * int) * int = ((1,2),3)
```

| Variable Name |  Bound To   |
| :-----------: | :---------: |
|    `outer`    | `((1,2),3)` |
|    `inner`    |   `(1,2)`   |
|      `a`      |     `1`     |
|      `b`      |     `2`     |
|      `c`      |     `3`     |

```sml
val L1 as x1::(L2 as x2::(L3 as x3::L4)) : int list = [1,2,3]
```

| Variable Name | Bound To  |
| :-----------: | :-------: |
|     `L1`      | `[1,2,3]` |
|     `x1`      |    `1`    |
|     `L2`      |  `[2,3]`  |
|     `x2`      |    `2`    |
|     `L3`      |   `[3]`   |
|     `x3`      |    `3`    |
|     `L4`      |   `[]`    |
