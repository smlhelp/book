---
sidebar_position: 4
---

# Parametric Polymorphism

_By Brandon Wu, September 2020_

Type safety is a very powerful concept, one that lets us pin down the space of allowable inputs to only a narrow space of values. In this way, we can ensure that the function is only allowed to be applied to those arguments that we are interested in, making any other computations illegal. Sometimes, however, we are interested in making a function more _general_, with arguments that can somehow _range over types_. We will see how SML achieves this with _parametric polymorphism_, which is a separate concept than other forms of polymorphism that you may have seen before.

## Motivation

Suppose that we wanted to write a length function for lists.

Well first, we might want to specify. What _type_ of list? Let's say that we first have int lists.

Well, the implementation is easy:

```sml
fun lengthInt ([] : int list) : int = 0
  | lengthInt (x::xs : int list) : int = 1 + lengthInt xs
```

But suppose that we don't only want the length of int lists, but also the length of string and char lists. Well then, we'll need to define a few more functions:

```sml
fun lengthString ([] : string list) : int = 0
  | lengthString (x::xs : string list) : int = 1 + lengthString xs

fun lengthChar ([] : char list) : int = 0
  | lengthChar (x::xs : char list) : int = 1 + lengthChar xs
```

This becomes unnecessarily tedious. As we can see, other than the name of the function and the type annotations, these functions have exactly the same code. Nothing about the functions themselves make use of the fact that the lists in question contain ints, strings, or chars - they are merely manipulated as arbitrary elements. We would like to be able to write a `length` function that works on a list of any type.

## The Idea

We've seen something similar to this - we know that lists of all kinds exist. No matter whether it is an `int list`, a `string list`, or a `char list`, we know that `::` is always valid to use when consing an element onto a list of the appropriate type. Indeed, we say that `::` has type `t * t list -> t list` for all types `t`. Cons is thus _polymorphic_, it can be used on many different types (though never two at the same time, for instance `1::["hello"]` is still ill-typed).

This has been something of an alternative definition for what we will be discussing in this chapter - parametric polymorphism. Seen in this way, all polymorphic functions are _parameterized_ by a _type variable_ that ranges over types. We will go more in depth into this idea.

> **[Type variable]** A type variable is a type that is quantified over types - that is, it can specifically take on the form of many types. They are enumerated as `'a`, `'b`, `'c`, and so on, and they are referred to by Greek letters. For instance, `'a` is "alpha", `'b` is "beta", `'c` is "gamma", and so on.

Type variables are themselves valid types. As such, we can rewrite `length` as:

```sml
fun length ([] : 'a list) : int = 0
  | length (x::xs : 'a list) : int = 1 + length xs
```

`'a` is quantified over all types, so _no matter_ what type the input list to `length` is, it will work correctly, as SML will use _type inference_ to determine what the proper type of the `length` function should be, in any given context. Note that `'a` is a _variable_, and as always, in proofs, we must quantify our variables. `'a` and other type variables thus implicitly correspond to having a "for-all" quantifier in front of it - so we say that an expression of type `'a` has type `t`, for all types `t`. We further note that this is really syntactic sugar for the notation:

```sml
fun 'a length ([] : 'a list) : int = 0
  | length (x::xs : 'a list) : int = 1 + length xs
```

This specifies that the length function itself is parameterized over `'a`. Although `'a` is a "parameter" of `length`, it is not truly an argument - we do not explicitly pass in the type to `length`. In an abstract sense, however, we do, as each "instantiation" of `length` has been "supplied" an argument to `'a` to produce a "copy" of the function. You can think of it as if `length` has infinitely many different variations that can be selected, depending on what the given type is inferred to be. Note that the "type" that is chosen does not necessarily need to be a concrete type - it may itself compose of type variables. For instance, consider the following code:

```sml
fun tupleLength [] = 0
  | tupleLength ((x, y)::xys) = 1 + length xys
```

Disregard the rather strange implementation, which is a rather arcane way of rewriting `length` with unnecessary overhead. In this example, we can see that the list `xys` contains tuples of two elements, the types of which are unknown to us. Without knowing a concrete type, we can only conclude that the type of `length` is `('a * 'b) list -> int`. This is because the elements of the tuple do not necessarily have to be correlated with each other - `'a` and `'b` are thus independent, though they _could_ be instantiated to the same type. As such, we have taken a type variable and replaced it with two more type variables, which gives us a little more information but still quite a bit of leeway. `tupleLength` is thus itself still polymorphic, with the same type of `('a * 'b) list -> int`.

**NOTE:** We have now reached a point where we will begin to omit explicit type annotations, as they tend to unnecessarily constrain the types of functions. It is also a good exercise to be able to understand conceptually how type inference is carried out, which is covered more in the next section.

An important principle to note, however, is that an `'a` type does not magically "just work" with regards to type safety. For instance, let us consider the following code fragment, which is ill-typed:

```sml
fun inc (x : 'a) : int = 1 + x
```

Note that, in this case, type annotations have actually worked against us! Had we removed the type annotations, this code would compile. The reason why this code is ill-typed is because, while we are allowed to use a type _more generally_ than it actually is, we cannot use a polymorphic type _more specifically_. The reason for this is because if we think about it as if we explicitly passed in some type variable, in the _scope of the function_ `inc`, `inc` has fixed `'a` to be some type. It then attempts to add 1 to `x`, which is a value of that fixed, arbitrary type. However, we cannot add 1 to a value of any type - we can only safely add 1 to `x` if we know that `x` has type `int`. If `'a` were instantiated to be a `string`, it would violate type safety to allow this code to compile. As such, we _cannot_ explicitly type annotate `x` to be of type `'a`, as it is used _more specifically_ than that in the body of the function.

## Other Forms of Polymorphism

A similar idea of extending functions to working on many types is exhibited by _equality types_, which are a behind-the-scenes process that you have already been exposed to. Consider the type of the function `=` - the equality operator. Clearly, it cannot have type `'a * 'a -> bool`, since some types don't make sense to compare for equality. For instance, how would you compare whether or not a real is equal to another? Machine representations are finite, so asking the question is bound to introduce problems. Another difficulty is in _function types_ - determining if two arbitrary functions are extensionally equivalent is an uncomputable problem (closely related to the Halting Problem). As such, we would like `=` to work on a wide spectrum of types, but also not work on another, also very wide spectrum of types.

To do this, SML has a concept of _equality types_. The type variable `''a` (and `''b` and `''c`, as normal) are not quantified over all types, but merely all equality types. This includes `int`, `bool`, `string`, and any datatype built up from non-equality types, among others. Thus, the `=` operator actually has type `''a * ''a -> bool`, so as to only work on compatible types.

**NOTE:** Note that the polymorphism demonstrated by `length` is of a different flavor than that of `+`, `*`, or other overloaded functions. The overloading of basic arithmetic functions to work on ints and reals is more in line with what might be referred to as "ad hoc" polymorphism, which is merely the compatibility of a single operator with several possibly heterogeneous implementations, with the precise implementation being chosen by context (such as type, in this case). It is thus important to note that while parametric polymorphism identifies a single, _general_ implementation with many types, ad hoc polymorphism identifies several different implementations with different use cases. Ad hoc polymorphism is noticeably more inelegant than parametric polymorphism, but it is useful in the cases that you only have a small subset of types to extend an operator to.

## Type Inference

During compilation, SML will often need to determine exactly what the type of the expression that we are looking at. This is not so different of a problem than type-checking, however. On a high level, SML simply assigns everything a very general type, and then begins looking at clues from the context so as to narrow down what the "most general type" is. By "most general type", we usually mean the most general type an expression can have, meaning that we do not use specific instances of polymorphic expressions, but just the polymorphic type itself. It is valid to say that the `length` function has type `int list -> int`, but its most general type is `'a list -> int`.

> **[Type Inference]** A procedure employed by type systems to _infer_ the type of expressions and functions, even when not explicitly given those types.

This is how we can, for instance, determine that the function `fn x => x + 1` must have type `int -> int`. `x` is not deliberately stated to have any type, but we know that it wouldn't make sense for `x` to be any other type than `int`

- it would otherwise not type-check. Note that `x` cannot be `real`, since `+` cannot have an input type of `real * int`.

We might also think of it like this - consider the expression `fn x => x + 1`. Most generally, we know that its type should an instance of type `'a`. Moreover, we see that it is a lambda expression, so it must now be an instance of `'a -> 'b`. The input is `x`, so we assign `x` to be an instance of type `'a`. We then attempt to apply the `+` operator to `x`, so for this to typecheck, `x` must have type `int`. The outcome of an `int` and an `int` with `+` should be an `int`, and that's the entire function body, so the whole expression has type `int -> int`.

## Conclusions

Parametric polymorphism offers us a clean and elegant way to extend _general implementations_ to work across a spectrum of types. In this way, we can still preserve type safety while allowing us to avoid writing out the same implementations for many different types. Type inference also conveniently lets us omit manually determining the type of our code, instead being able to determine it from context. Ultimately, parametric polymorphism is a simple idea that offers us a great deal of versatility.
