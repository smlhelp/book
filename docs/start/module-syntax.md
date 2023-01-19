---
sidebar_position: 3
---

# SML Module Syntax Cheatsheet

_By Thea Brick, January 2023_

### Signature

Signatures contain specifications which dictate what declarations a structure
ascribing to said signature must make. A signature declaration appears as
follows:

```sml
signature YOUR_SIGNATURE_NAME =
sig
  (* zero or more specifications here *)
end

signature ANOTHER_NAME = YOUR_SIGNATURE_NAME
```

Signatures are generally use all capital letters.

#### Specifications

The following may appear in a signature:

<table>
<tr>
<th> Specification </th>
<th> Explanation </th>
</tr>
<tr>
<td>

```sml
val x : int
```
</td>
<td>

Structure must declare a variable called `x` with type `int`.
</td>
</tr>

<tr>
<td>

```sml
val fact : int -> int
```
</td>
<td>

Structure must declare a variable called `fact` with type `int -> int`.
</td>
</tr>

<tr>
<td>

```sml
(* abstract type specification *)
type 'a t
```
</td>
<td>

Structure must declare a type `'a t`. Called abstract because the structure
defines the implementation.
</td>
</tr>

<tr>
<td>

```sml
(* concrete type specification *)
type 'a t = 'a list
```
</td>
<td>

Structure must declare a type `'a t` that is `'a list`. Called concrete because
the signature defines the implementation.
</td>
</tr>

<tr>
<td>

```sml
datatype 'a tree = Empty
                 | Node of 'a tree * 'a * 'a tree
```
</td>
<td>

Structure must declare `datatype 'a tree = Empty | Node of 'a tree * 'a * 'a tree`.
</td>
</tr>

<tr>
<td>

```sml
exception Exn
```
</td>
<td>

Structure must declare an exception `Exn`.
</td>
</tr>

<tr>
<td>

```sml
structure Str : SIG
```
</td>
<td>

Structure must declare a structure `Str` ascribing to `SIG`.
</td>
</tr>
</table>


### Structures

A structure is a series declaration which ascribe (or match) the signature.

```sml
structure YourStructure : YOUR_SIGNATURE =
struct
  (* zero or more declarations matching YOUR_SIGNATURE *)
end
```
The structure must at least have every declaration specified in the signature,
but may contain more.

A structure may not contain `signature` and `functor` declarations.

The following syntax allows SML to infer the signature to the structure based
on the declarations made:
```sml
structure YourStructure =
struct
  (* declarations matching YOUR_SIGNATURE *)
end
```

### Functors

A functor takes a structure ascribing to a signature and outputs a new structure.

```sml
functor YourFunctor(
  (* zero or more specifications for the input structure *)
) : YOUR_OUTPUT_SIG =
struct
  (* declarations matching YOUR_OUTPUT_SIG *)
end
```

Here is an example of using this syntax:

```sml
functor Combine(
  val x : int
  val fact : int -> ints
  structure A : A_SIG
  structure B : B_SIG
) =
struct
  (* omitted, x, fact, A, and B may be used in here *)
end
```

#### Functor Syntax Sugar

If a functor is taking in only one structure, the following syntax may be used:

```sml
functor YourFunctor(YourStructure : YOUR_SIGNATURE) : YOUR_OUTPUT_SIG =
struct
  (* declarations matching YOUR_OUTPUT_SIG, YourStructure may be used *)
end
```

### Transparent and Opaque Ascription

The symbol `:` describes transparent ascription. The symbol `:>` describes
opaque ascription. Both ascriptions only allow things specified to be used.
Opaque limits this further by not letting the implementation of abstract types
to be used. Here is an example:

```sml
structure Example :> sig
  type 'a t (* abstract *)
  val isEmpty : 'a t -> bool
end = struct
  type 'a t = 'a list
  val isEmpty = fn [] => true | _ => false
  val test = 123
end

(* does not compile, but would if transparent ascription was used. *)
val res = Example.isEmpty []

(* will never compile *)
val res2 = Example.test
```

### `where` Syntax

The `where` keyword allows for using opaque ascription while deliberately
exposing specific abstract types. It appears after the signature where used.

```sml
signature EXAMPLE =
sig
  type 'a t (* abstract *)
  type 'a u
  val isEmpty : 'a t -> bool
end
structure Example :> EXAMPLE where type 'a t = 'a list = struct
  type 'a t = 'a list
  type 'a u = int
  val isEmpty = fn [] => true | _ => false
end

(* this will compile now *)
val res = Example.isEmpty []

(* this will not compile *)
val res2 : 'a Example.u = 123
```
