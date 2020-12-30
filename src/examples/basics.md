# SML Basics Examples

## Types
For each of the following declarations, state the type and value of `x`.

```sml
val x = 1 > 5
```
Type: `bool`

Value: `false`

```sml
val x = 15 div 0
```
Type: `int`

Value: Does not reduce to a value because it raises an exception

```sml
val x = 15.0 div 0.0
```
Type: not well-typed (`div` is a function of type `int * int -> int`)

Value: No value, since it is not well-typed

```sml
val x = fn (n : int) => Int.toString n
```
Type: `int -> string`

Value: `fn n => Int.toString n`

```sml
val x = fn n => ("1" ^ "5") ^ (Int.toString n)
```
Type: `int -> string`

Value: `fn (n : int) => ("1" ^ "5") ^ (Int.toString n)`

## Scope
### Example 0
```sml
let
  val y : int = 2
in
  fn (x : int) => z*z
end
```
What is the value of the let-in-end expression?

Value: No value, because `z` is not in scope (will cause an error).

### Example 1
```sml
val y = 0
val z = 
    (let
      val x : int = 1
      fun f (x : int) = x
      val y : int = x + 1
    in
      fn (a : string) => x*2
    end) "150"
val a = y
```

What is the value of `y` before the let-in-end expression?

y = 0

What is the value of `y` within the let-in-end expression?

y = 2

What is the value of `a`?

a = 0

What is the value of `z`?

z = 2

### Example 2
```sml
val x : int = 1 
fun f (x : int) = x + 1
val y : int = 2
val z : int = f y
val a : int = x
```

What are the values of `x`, `y`, `z`, and `a`?

x = 1

y = 2

z = 3

a = 1

### Example 3
```sml
val x = 1
val y = 2
fun f (x, y) = 
    case x of 
      0 => 0
    | y => y
val a = f (y, x)
val b = f (x, y)
```

What are the values of `a` and `b`?

a = 2

b = 1
