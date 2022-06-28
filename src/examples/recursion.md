# Recursion & Induction
_By Eunice Chen, June 2020_

## Types
For each of the following expressions, state its type and value.

```sml
fun f (x : int) : int = f x
```
<!-- Need to use rust to support the eyeball thing -->
```rust,ignore
Click the eyeball icon to see the answer --->
# Type:  int -> int
# Value: the function itself, fn x => <body>
```

```sml
val x = []::(150::[])
```
```rust,ignore
Click the eyeball icon to see the answer --->
# Type:  not well typed
# Value: no value, it is not well-typed
```

```sml
val x = [122]::([150]::[])
```
```rust,ignore
Click the eyeball icon to see the answer --->
# Type:  int list list
# Value: [122]::([150]::[])
#  also: [[122], [150]]
#  also: (122::[])::((150::[])::[])
```

```sml
fun f L =
    case L of
      [] => [[]]
    | x::xs => [x + 1] @ []
```
```rust,ignore
Click the eyeball icon to see the answer --->
# Type:  not well-typed
# Value: no value, because it is not well-typed
```

What is the type and value of x?
```sml
fun f (y : int) : int = f y
val x : int = f y
```
```rust,ignore
Click the eyeball icon to see the answer --->
# Type:  int
# Value: No value, because it loops forever
```

What is the type and value of y?
```sml
val x =
    let
      fun incr (n : int) = n + 1
    in
      incr
    end
val y = incr
```
```rust,ignore
Click the eyeball icon to see the answer --->
# Type:  No type, since incr is not in scope
# Value: No value, since incr is not in scope
```

## Recursion


## Induction
Given the following function:
```sml
(* length: int list -> int *)
fun length [] = 0
  | length x::xs = 1 + length(xs)

(* append: int list * int list -> int list *)
fun append ([], L) = L
  | append (x::xs, L) = x :: append(xs, L)
```

Prove that for all `L1, L2 : int list`, `length(append(L1, L2))` = `length(L1) + length(L2)`.

Proof: By structural induction on `L1`.

BC: `L1 = []`

`length(append(L1, L2))`\
= `length(append([], L2))`\
= `length(L2)` [Clause 1 of append]

`length(L1) + length(L2)`\
= `length([]) + length(L2)`\
= `0 + length(L2)` [Clause 1 of length]\
= `length(L2)` [math and totality of length]

IS: `L1 = x::xs` for some `x : int`, `xs : int list`

IH: `length(append (xs, L2))` = `length(xs) + length(L2)`

WTS: `length(append (x::xs, L2))` = `length(x::xs) + length(L2)`

`length(append (L1, L2))`\
= `length(append (x::xs, L2)`\
= `length (x::append(xs, L2))` [Clause 2 of append]\
= `1 + length(append(xs, L2))` [Clause 2 of length, totality of append]\
= `1 + length(xs) + length(L2)` [IH]

`length(L1) + length(L2)`\
= `length(x::xs) + length(L2)`\
= `1 + length(xs) + length(L2)` [Clause 2 of length]

By structural induction, we have shown that for all `L1, L2 : int list`, `length(append(L1, L2))` = `length(L1) + length(L2)`.
