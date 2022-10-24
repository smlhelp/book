---
sidebar_position: 10
---

# Imperative Programming

_By Len Huang and Cooper Pierce, February 2021_

A fun thing we can do with functional programming in SML is imperative programming! Does it seem counterintuitive? Perhaps. Is it cool? OF COURSE! Background knowledge with languages like C, C++, Java, and Python will be helpful but is not required.

## Reference Cells

The way SML goes about implementing imperative features is by using something called **_reference types_**. These are **_references_** to a value of a certain type. This is very similar to how a pointer might point to a certain place in memory. More formally:

> A value of type `t ref` is a mutable cell capable of holding a value of type `t`. For example, an `int ref` is a reference to an `int`.

_Reference Cells, Ref Cells, and Mutable Cells all refer to the same thing in_ _this article._

## Functions / Expressions to Know

There's a few different expressions and functions we can leverage to help us interface with these **_reference types_**.

### Ref Cells `ref`

First, we need to make something of this reference type. In other words, we need a way to initialize our pointers. `ref` is also a constructor that helps us initializes references (not to be confused with the `'a ref` type.) Below is how we would make a reference to an `int value`, or, an `int ref`.

```sml
(* ref : 'a -> 'a ref *)
val pointer : int ref = ref 7
```

### Bang `!`

Next, we need a way to get our values from these references. In other words, we need a way to dereference our pointers. `!` (called bang) can be used on an `'a ref` to retrieve the value being referenced.

```sml
(* ! : 'a ref -> 'a *)
val pointer : int ref = ref 7
val x : int = !pointer
```

Here, the value `7 : int` would be bound to `x`.

### Assignment `:=`

After that, we need a way to update the data in our mutable cells. `:=` (called the assignment operator) can be used to update the values of reference types. Technically, it's an infix function that takes in the `'a ref` to update and the `'a` value to update it to.

```sml
(* := : 'a ref * 'a -> unit *)
val pointer : int ref = ref 7
val x : int = !pointer
val () : unit = pointer := 21
val y : int = !pointer
```

Here, the value `7 : int` would be bound to `x`. However, the value `21 : int` would be bound to `y`. When we dereference our ref-cell the first time, the value is whatever we initialized it to (`7`). However, after we change what's inside the ref-cell, we dereference the updated value (`21`). Even though `x` and `y` are both bound to `!pointer`, they have different values!

> 💡 Comparison to `void` methods!
>
> Remember that SML is a functional programming language. This means that anything that's not an exception or infinite loop must be a value! As such, when we do things with side effects (like assignment), we can't really have _no value_ being returned. As such, SML implements this by having these side effect functions and operations return `() : unit`. Theoretically, `:=` could return something crazy, like an `'a tree list option` if we really wanted to. It's just that `() : unit` is convenient. So when you see `:= : 'a * 'a ref -> unit`, you can think of it as a `void` method or function in Java, C, and C++.
>
> In other words, returning `() : unit` for the assignment operator is SML's way of implementing `void` methods.

Introducing imperative logic causes difficulties like these. It takes away the confidence we have in our values instilled in us by referential transparency. It often makes doing formal proofs about imperative code a bit more difficult.

### Sequential Evaluation `;`

Finally, having a way to execute side effects but still return something meaningful will be useful to use. Generally, `;` (yes this is just a semicolon lol) lets us "execute" two "programs" in sequential order. You see this used in the REPL:

```sml
val x = 2 + 2;
val y = 8 - 4;
```

Where we execute one "program" with the side effect of binding `2 + 2` to `x`, and then execute the next "program" with the side effect of binding `8 - 4` to `y`, and continue to wait for the next "program". If you're familiar with languages like Java and C, this can also be used to explain why semicolons are required at the end of each line.

The semicolon `;` is used to mark the end of one program and set up the next program to sequentially follow. In SML (not just the REPL), this is also valid syntax.

> For some expressions `exp1 : t1`, `exp2 : t2`, we have that `exp1;exp2 : t2` where `exp1` is evaluated first, and then `exp2` is evaluated thereafter.

One thing to note is that in SML, only the value of the second expression is returned, and the type of the whole expression is the type of the last expression.

```sml
val pointer : int ref = ref 0
val x : int = (pointer := 7; !pointer)
val y : int = (pointer := 21; !pointer)
```

Here, we first initialize `pointer` to a dummy value. After that, we run the program `pointer := 7`, and then right after, return `!pointer`. This would mean that the value `7 : int` is bound to `x`, just like in the above examples. Similarly, we run The program `pointer := 21`, and then right after, return `!pointer`. This would mean that the value `21 : int` is bound to `y`, just like in the above examples.

## Putting it All Together

Here's an example that uses all of the above operations in a meaningful way.

```sml
local
    val a = ref 1
in
    fun fact 0 = !a
      | fact n = a := n * !a; fact (n - 1)
end
```

The way this `fact` function works is by continuously updating a reference `a` we **initialize** with `ref a`. In the recursive case, for some number `n`, we **assign** `a` to be `n * !a`. In other words, `n * current value of a` (because we use the **bang** `!` to dereference `a`). After we run that program (`a := n * !a`), the **semicolon** then brings us to the next program: `fact (n - 1)`. Since only value of the second expression is returned, we essentially are saying that `fact n = fact (n - 1)` with the side effect of `a := n * !a` being run. Finally, once we reach the base case, we use the **bang** `!` to dereference our ref cell which has accumulated all of the side effects up until now.

> 😰 If you try to call this implementation of `fact` more than once, something unexpected might happen. Can you figure out what it is, and why that is?

# Operations

- `ref : 'a -> 'a ref` initializes a new reference cell.
- `! : 'a ref -> 'a` dereferences a reference cell.
- `:= : 'a ref * 'a -> unit` assigns a reference cell a new value. "`void`" method.
- `exp1;exp2` first runs `exp1` and then returns `exp2`, which is useful for side effects.
