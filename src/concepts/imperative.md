# Imperative Programming

A fun thing we can do with functional programming in SML is imperative
programming! Does it seem counterintuitive? Perhaps. Is it cool? OF COURSE!
Background knowledge with languages like C, C++, Java, and Python will be
helpful but is not required.

## Reference Cells

The way SML goes about implementing imperative features is by using something
called **_reference types_**. These are **_references_** to a value of a
certain type. This is very similar to how a pointer might point to a certain
place in memory. More formally:

> A value of type `t ref` is a mutable cell capable of holding a value of type
> `t`. For example, an `int ref` is a reference to an `int`.

_Reference Cells, Ref Cells, and Mutable Cells all refer to the same thing in_
_this article._

## Functions / Expressions to Know

There's a few different expressions and functions we can leverage to help us
interface with these **_reference types_**.

### Ref Cells `ref`

First, we need to make something of this reference type. In other words, we
need a way to initialize our pointers. `ref` is also a function that helps us
initializes references (not to be confused with the `'a ref` type.) Below is
how we would make a reference to an `int value`, or, an `int ref`.

```sml
(* ref : 'a -> 'a ref *)
val pointer : int ref = ref 7
```

### Shebang `!`

Next, we need a way to get our values from these references. In other words, we
need a way to dereference our pointers. `!` (called shebang, pronounced "shuh-
bang") can be used on an `'a ref` to retrieve the value being referenced.

```sml
(* ! : 'a ref -> 'a *)
val pointer : int ref = ref 7
val x : int = !pointer
```

Here, the value `7 : int` would be bound to `x`.

### Assignment `:=`

After that, we need a way to update the data in our mutable cells. `:=` (called the assignment operator) can be used to update the values of reference types.
Technically, it's an infix function that takes in the `'a ref` to update and the
`'a` value to update it to.

```sml
(* := : 'a ref * 'a -> unit *)
val pointer : int ref = ref 7
val x : int = !pointer
val () : unit = pointer := 21
val y : int = !pointer
```

Here, the value `7 : int` would be bound to `x`. However, the value `21 : int`
would be bound to `y`. When we dereference our ref-cell the first time, the
value is whatever we initialized it to (`7`). However, after we change what's
inside the ref-cell, we dereference the updated value (`21`). Even though
`x` and `y` are both bound to `!pointer`, they have different values!

Introducing imperative logic causes difficulties like these. It takes away the
confidence we have in our values instilled in us by referential transparency.
It often makes doing formal proofs about imperative code a bit more difficult.

### Sequential Evaluation `;`

Finally, having a way to execute side effects but still return something
meaningful will be useful to use. Generally, `;` (yes this is just a
semicolon lol) lets us "execute" two "programs" in sequential order.
You see this used in the REPL:

```
val x = 2 + 2;
val y = 8 - 4;
```

Where we execute one "program" with the side effect of binding `2 + 2`
to `x`, and then execute the next "program" with the side effect of
binding `8 - 4` to `y`, and continue to wait for the next "program".
If you're familiar with languages like Java and C, you see something
similar:

```java
int x = 2 + 2;
int y = 8 - 4;
```

Where the semicolon `;` is used to mark the end of one program and set up
the next program to sequentially follow. In SML, this is also valid syntax.

```sml
val x = ref 0
val y = ref 0
val () = x := 2 + 2; y := 8 - 4
```

Here, we first initialize the references to `x` and `y`, and then run the
two assignment "programs". One thing to note is that in SML, only the value
of the second expression is returned, and the type of the whole expression
is the type of the last expression. A slightly more practical usage of the
semicolon `;` could be in implementing `fact` imperatively:

```sml
local
    val a = ref 1
in
    fun fact 0 = !a
      | fact n = a := n * !a; fact (n - 1)
end
```

The way this `fact` function works is by continuously updating a reference
`a` we **initialize** with `ref a`. In the recursive case, for some number `n`,
we **assign** `a` to be `n * !a`. In other words, `n * current value of a`
(because we use the **shebang** `!` to dereference `a`). After we run that
program (`a := n * !a`), the **semicolon** then brings us to the next program:
`fact (n - 1)`. Since only value of the second expression is returned, we
essentially are saying that `fact n = fact (n - 1)` with the side effect of
`a := n * !a` being run.

## A Different Notion of "Equality"

No longer guaranteed by values / types

## Staging

Something about staging?

```

```
