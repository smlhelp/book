---
sidebar_position: 7
---

# Modules

_By Eunice Chen and Brandon Wu, December 2020_

Sometimes, we are interested in developing large projects. Large codebases are oftentimes convoluted and impenetrable to outside scrutiny, being solely understandable by the original author. It is thus in our best interest to develop good coding practices - consisting of clean, commented code that communicates its cause clearly, as well as a _modular_ structure that allows understanding what each part of the codebase should do. For instance, we would not want to simply dump all of our code into a single file with thousands of lines - instead, what we oftentimes may do is decompose it into constituent parts, each part of which has a certain purpose, such as parsing, maintaining certain data structures, or other purposes, depending on the use case.

In this chapter, we will discuss SML's _module system_, which allows for safe, powerful abstraction of code. We will discuss the power that _data abstraction_ grants us as code designers, as well as the clean ways that we can compose them in order to encapsulate common design patterns.

## Motivation

Oftentimes as programmers, we are tasked with writing code that matches a specification. This specification can vary in rigor and mathematical formality, but the general idea is that oftentimes it _exists_. When we are asked to write a function to compute the first $n$ Fibonacci numbers, it does not necessarily matter _how_ we go about implementing this function, so long as it exhibits the proper input-output behavior. In other words, we would like it so that all functions implementing a given specification have _extensionally equivalent_ behavior to what we should expect them to do.

**NOTE**: Sometimes, there are constraints beyond simply being the same "mathematical function" - that is, defining the same outputs on the same inputs. Sometimes we are asked for the implementation of a function, running in only less than $O(n^2)$ asymptotic time. Even in cases like these, however, there are always still _superficial_ differences that our implementation allows for - for instance, when writing the Fibonacci function, it is unlikely that it should matter whether we calculate the value of $f(n-1)$ or $f(n-2)$ first.

This should not be an unfamiliar idea - this is exactly the concept of referential transparency, which says that we can swap "equals-for-equals" whenever discussion the equality of expressions. Under the eyes of the language, equal expressions are just that - equal, and there is no need to disambiguate them.

This idea, however, is rather limited in scope. What if we would like to deal with a function that depends upon another function? Then we cannot freely make the swap between functions, and substitute a function into a context where its dependencies do not exist. Indeed, we cannot perform such a substitution at all in the case where a function is in any way defined beyond its own function body itself.

We don't want to outlaw such practices, however - we simply need to make our _abstraction boundaries_ more explicit. When we have a package or otherwise standalone bundle of software, we should be able to use all of its components that are mutually dependent on each other - not just make our distinctions at the function level. We will do so using SML's module system.

## Modules: Basics

SML takes both the ideas of the _specification_ and the _implementation_ and provides a way of codifying both within the language itself. Of course, it is rather difficult to say "implement the list reversal function in $O(n)$ asymptotic time in $n$, the length of the list" in code, so SML will only deal with specifications at the _type-level_. That is, within SML itself, a specification for a function is simply a type for that function.

The term for a specification in SML is called a _signature_. Consider the following specification and implementation of a package for modular arithmetic. Note that the comments are optional.

```sml
signature MOD_ARITH =
sig
    (* ENSURES: mod_add n x y = (x + y) mod n *)
    val mod_add : int -> int -> int -> int

    (* ENSURES: mod_sub n x y = (x - y) mod n *)
    val mod_sub : int -> int -> int -> int

    (* ENSURES: mod_times n x y = (x * y) mod n *)
    val mod_times : int -> int -> int -> int
end
```

This signature defines three functions, all of which have type `int -> int -> int -> int`, which takes in the modulus of the operation, as well as the two operands to the operation to be performed. While we would like an implementation of this signature to also display the behavior outlined in the comments, realistically there is no way to verify that this is true (why?), so the best that we can do is ensure that an implementation provides functions with the correct type.

Note also that this syntax is slightly different than that you have seen before

- we use `val` as if we were going to produce a val binding (with an associated type annotation), however we do not actually give it any definition. In truth, you _cannot_ define a value in the signature itself, since it's impossible in general to check if two values are the same. You can, however, define a `type` within a signature (or leave it definitionless, as we will see later in the chapter).

An implementation of `MOD_ARITH` (called a _structure_, or _module_) might look as follows:

```sml
structure ModArith : MOD_ARITH =
struct
    fun mod_add n x y = (x + y) mod n

    fun mod_sub n x y = mod_add n x (~y)

    fun mod_times n x y =
        case Int.compare (x, 0) of
            LESS => mod_add n (mod_times n (x + 1) y) (~y)
          | EQUAL => 0
          | GREATER => mod_add n (mod_times n (x - 1) y) y
end
```

**NOTE**: By convention, structure names are usually capitalized, and signature names are usually all-capitals. Additionally, it is totally fine to declare a structure's values with `fun` instead of `val`, even if it says `val` in the signature, as `fun` is just shorthand for producing a function value binding anyways.

We will go over the precise meaning of the usage of the colon symbol in the above structure later in the chapter. For now, the meaning of this code snippet is to produce a structure _ascribing_ to the `MOD_ARITH` signature, or in other words, implementing the `MOD_ARITH` specification. We see that it contains three declarations, those being the functions declared in the signature itself. A key note is that ascribing to a signature is akin to a contract - any structure ascribing a signature _must_ implement all the requisite components described by the signature, or it will fail to ascribe, and result in a compile-time error (similar to an ill-typed program).

It is not, however, the case that a structure cannot provide _more_ information than is strictly necessitated by the signature. Additional helper functions and value bindings can be freely instantiated within a structure without affecting ascription. Thus, honoring a contract only entails satisfying the terms agreed to in the signature, without comment on going over. We will explore this idea more later in the chapter when we discuss information hiding.

Using structures should be something that you are already familiar with - you do it every time that you invoke `Int.compare`. To use the fields of a structure, you access them using the name of the module, followed by a dot, followed by the name of whatever you are trying to access. Thus, calling `Int.compare` means to access the function named `compare` implemented within the structure named `Int`, which is provided as part of the Standard ML Basis Library. To use the structure that we have just implemented, we would similarly call `ModArith.mod_add`, for instance.

It is important to know that although a structure may contain values, a structure is _not_ a value. Structures and signatures exist on another "level" of syntax outside that of expressions and values, and should not be mixed interchangeably with them. For instance, it would be nonsense to write `val x = ModArith`, as you cannot bind `ModArith` to a value identifier.

It is often useful when thinking of structures and signatures to think of them as "elevated types and values", as there is a neat correspondence between the two. A structure is really just a _package_ of values (among other things, as we will see later) that must "type-check" in that it must successfully ascribe to its signature. As such, a structure can be regarded as a "bundle of values", and a signature as a "bundle of types". This only skims the surface at what can be done with modules, but it is a handy perspective to have.

## Modules: A Study in Modularity

Ultimately, the main goal that we seek to achieve with modules is, in fact, _modularity_. As alluded to previously in this chapter, we have mentioned how we would like to be able to _swap out_ certain implementations for others as necessary, to enforce clean boundaries of code dependency and produce more maintainable code. As it stands, we have only seen modules used for conveniently wrapping our code, however in this section we are going to discuss how modules allow us to maintain multiple implementations of the same specification.

Consider the following signature for performing geometric operations on the Cartesian plane:

```sml
signature GEOMETRY =
sig
    type point

    val origin : point
    val rotate : point -> real -> point

    val get_x : point -> real
    val get_y : point -> real
    val get_dist : point -> real
end
```

Suppose that we are interested in performing operations on points within the Cartesian plane. Then, we may be interested in a structure ascribing to this signature. The question then becomes - how should this signature be implemented? We have previously discussed swapping out more code for more efficient implementations, however in that case we clearly consider one unilaterally superior to the other.

In this signature, note that we have left the type of `point` _abstract_, meaning that it is up to the structure to define what precisely the type of `point` is - it is not decided by the signature. In this case, there are at least two discrete ways that we can consider points on the Cartesian plane - as rectangular or polar coordinates.

Consider the following structures ascribing to the `GEOMETRY` signature:

```sml
structure RectGeo : GEOMETRY =
struct
    (* pair of (x, y) coordinates *)
    type point = real * real

    val origin = (0.0, 0.0)
    fun rotate (x, y) r = (x * Math.cos r) + (y * Math.sin r)

    fun get_x (x, y) = x
    fun get_y (x, y) = y
    fun get_dist (x, y) = Math.sqrt (Math.pow (x, 2.0) + Math.pow (y, 2.0))
end

structure PolarGeo : GEOMETRY =
struct
    (* pair of (d, theta), where d is distance from origin and theta is angle from 0 degrees *)
    type point = real * real

    (* theoretically here theta could be anything *)
    val origin  = (0.0, 0.0)
    fun rotate (d, theta) r = (d, theta + r)

    fun get_x (d, theta) = d * (Math.cos theta)
    fun get_y (d, theta) = d * (Math.sin theta)
    fun get_dist (d, theta) = d
end
```

It should be relatively clear that these are two perfectly valid ways of representing an (albeit limited) implementation of coordinate geometry. Both have their own strengths and weaknesses, such as rectangular coordinates having more convenient access to computing the x and y coordinates of a given point, and polar coordinates more easily rotating points about the origin and calculating the distance of a point from the origin. As such, it comes down to _context_ to determine which should be used in any given circumstance.

In this case, modules allow a convenient way of swapping out code without having to bother with poring through to find dependencies. If we are using the `PolarGeo` structure, and instead find ourselves wishing that we were using rectangular coordinates instead - no problem! We can simply load the other structure instead. In this case, we have moved dependencies and code reuse to a static, compile-time check, much in the same way that we moved type-checking to a static, compile-time check. This is a recurring theme, that we can avoid deferring errors to runtime to instead try and catch them earlier, in order to write cleaner and less error-prone code.

## Modules: Transparent and Opaque Ascription

At this point, we have discussed how to use modules for enforcing "contracts" between parties interested in some kind of software, as well as how it can assist in code reuse and statically enforcing code dependencies. Another use of modules in the SML module system is _information hiding_.

It is sometimes said that one of the greatest ideas in computer science is _abstraction_. Whether it is focusing on developing an algorithm to solve a problem, a piece of software for a given client, or trying to interface with some existing computer system, it is often the case that it is only prudent to focus on those details that are _relevant to the problem_. It takes time and mental energy to internalize every last detail of a codebase, and it is a waste of time to try and do so every time that one wants to make a patch. As such, we rely on abstraction in order to keep the amount of relevant information low.

Consider the computer. It is a complicated, convoluted work of machinery and circuitry - at its most fundamental level being comprised of logic gates and incredible networks of interacting parts. Although an action as simple as opening up a notepad seems very intuitive to the user, under the hood it is anything but. The key, however, is that the user of a computer need not understand the underlying hardware and circuitry - indeed, they need not even know what circuitry is! In the general case, the user of a computer does not _really_ know how it functions.

Yet again, it is also unlikely that it is important for you to know. A user of a computer does not need to know precisely how it works to know that they can type a query into Google. The only details that are _relevant to the user_ are the devices that allow interfacing with the inner hardware (the mouse and keyboard, among other things), and less so the precise configuration of the microchips inside of the machine.

When writing code, we would like to maintain the same practice. We would like to write clear, concise, and _maintainable_ code (for the unfortunate souls who have to go back and read it afterwards), so it is important to lessen the burden on the code-reader who comes after (which might be you!). With modules, we will be able to create _enforced abstraction boundaries_ that allow programmers to only consider the _interface_ of a given module, much in the same way that a computer-user needs only consider the physical interface of the device.

The first example of this phenomenon of information hiding is through the contents of a structure that are available for use. We have spoken of signatures as an interface, a sort of lens through which we view the contents of a structure. This metaphor is further strengthened by the fact that a signature literally does dictate what information the user of a structure is able to see. In any structure ascribing to a given signature, the only data able to be used by an outside client are those described within the signature.

Practically, this means that the use of "helper functions" in the implementation of a structure is hidden from the client. This means that in the following signature and structure:

```sml
signature REVERSE =
sig
    val reverse : 'a list -> 'a list
end

structure Reverse : REVERSE =
struct
    fun trev [] acc = acc
      | trev (x::xs) acc = trev xs (x::acc)

    fun reverse L = trev L []
end
```

only the value `reverse` is visible to the user of the `Reverse` structure. This can be convenient in enforcing abstraction, because we could be writing a program that uses helper functions that have certain preconditions. Through restricting the usage of those helper functions, the client is blocked from constructing certain inputs to those functions that may violate those preconditions, resulting in unallowed behavior.

We have used the term "ascription" several times so far in this chapter, referring to how a structure "implements" a signature, similarly to how a value has a certain type. In reality, there are two kinds of ascription: transparent and opaque. To demonstrate the difference, we will consider the following implementation of 2D arrays.

```sml
signature ARRAY =
sig
    type 'a array
    val new : int * int -> 'a -> 'a array
    val get : 'a array -> int * int -> 'a array
    val set : 'a array -> int * int -> 'a -> 'a array
end

structure RectArray : ARRAY =
struct
    type 'a array = 'a list list

    fun row 0 v = []
      | row n v = v :: row (n - 1) v

    fun new (0, width) v = []
      | new (height, width) v =
        row w v :: new (height - 1, width) v

    fun get A (y, x) =
        List.nth (List.nth (A, y), x)

    fun set A (y, x) v =
        let
          val row = List.nth (A, y)
        in
          List.update (A, y, List.update (row, x, v))
        end
end
```

This implementation of arrays uses a 2D list in order to create a rectangular array, with separate access to each row. There is one "creator" function, `new`, which constructs a new array, and get the "getter" and "setters" of `get` and `set`, which allow manipulation of an existing array. The structure `RectArray` thus ascribes to the `ARRAY` signature, and because of its usage of the colon symbol, it _transparently ascribes_ to the `ARRAY` signature. We are now ready to discuss precisely what this means.

> **[Transparent ascription]**: Ascribing a structure to a signature where all abstract types are visible to the user of the structure.

We have previously discussed the existence of _abstract types_, which are type declarations in the signature that is being ascribed to. For instance, the type of `'a array` is an abstract type, because it is not concretely defined within the signature. However, if we had instead replaced that line in the `ARRAY` signature with `type 'a array = 'a list list`, it would no longer be abstract (and note that this would have the consequence that any structure ascribing to `ARRAY` _must_ use the representation of a 2D list for its arrays).

What precisely does it mean for the type of `'a array` to be visible to the user of the structure? We know that the user of a structure should only be aware of what is in the signature of a structure, and nothing more. This is not strictly true - if we have a transparently ascribed structure like `RectArray`, then the user of the `RectArray` structure can treat the `'a RectArray.array` type as synonymous with `'a list list`, and thus be privy to the "internals" of the structure, even though it is not explicitly defined within the structure.

We will now compare this to if we had instead used opaque ascription. Consider the following two implementations of the `ARRAY` signature:

```sml
structure ListArray :> ARRAY =
struct
    type 'a array = 'a list * int

    fun gen 0 v = []
      | gen n v = v :: gen (n - 1) v

    fun new (height, width) v =
        (gen (height * width) v, width)

    fun get (A, w) (y, x) = List.nth (A, w * y + x)

    fun set (A, w) (y, x) v = List.update (A, w * y + x, v)
end

structure RectArray :> ARRAY =
struct
    type 'a array = 'a list list

    fun row 0 v = []
      | row n v = v :: row (n - 1) v

    fun new (0, width) v = []
      | new (height, width) v =
        row w v :: new (height - 1, width) v

    fun get A (y, x) =
        List.nth (List.nth (A, y), x)

    fun set A (y, x) v =
        let
          val row = List.nth (A, y)
        in
          List.update (A, y, List.update (row, x, v))
        end
end
```

Note that the latter implementation is exactly the same as the previous `RectArray` structure, with the exception that is now _opaquely ascribed_. This is from using `:>` between the structure and signature names, which signals opaque ascription rather than transparent ascription.

> **[Opaque ascription]**: Ascribing a structure to a signature where all abstract types are hidden to the user of the structure.

By "hidden", we mean precisely in the same way that the abstract types are "visible" in transparent ascription. Abstract types are truly that, _abstract_, and thus the user of either the `RectArray` or `ListArray` structure are incapable of knowing precisely what either the `'a ListArray.array` or `'a RectArray.array` types are. The only way to construct a value of type `'a array`, from either structure, is by using either respective `new` function, and similarly with manipulating an existing array.

Why would we want to have opaque ascription? This is precisely for the reason that we have been motivating for the entire chapter, which is abstraction. A fundamental idea of having a powerful type system is to _make illegal states unrepresentable_. Instead of having a precondition that must be obeyed in a given function, we instead would like it so that the type system enforces these preconditions for us instead - similarly to how for a function of type `int -> int` with precondition "TRUE", if we were to instead write it in a dynamically typed ("typeless") language, we may instead say that it has a precondition that its input is an integer. This is then just an extension of that idea to more general representation invariants.

By _representation invariant_, we typically mean some invariant of a data structure that qualifies it to truly be an "instance" of that data structure. For instance, in the `RectArray` structure, we use a 2D list to represent a given array, however it is not the case that _all_ values of type `'a list list` correspond to an array of `'a` values. For instance, is `[[1, 2, 3], [4, 5]]` a valid `int RectArray.array`?

If `RectArray` were to be transparently ascribed, a client could construct an illegal instance of an `'a RectArray.array`, and thus produce undefined behavior when interfacing with it using functions like `get` and `set`. By opaquely ascribing it to its signature, however, we ensure that the _only_ way that you can produce and manipulate arrays is internally, through the structure itself, so as long as the structure's functions preserve representation invariants, there will be no way of producing an illegal state.

Another motivation is that, ultimately, it isn't important for the client to know how arrays are implemented - this is an example of _information hiding_. If a client wants some implementation of the `ARRAY` signature, it likely isn't that important to them whether or not it is implemented as a one-dimensional or two-dimensional list, so long as it provides certain functionality (which, while limited in this example, could be extended). We can thus ensure that it is completely impossible to distinguish `ListArray` and `RectArray`, at least in terms of their input-output behavior. This benefits abstraction in that now the client does not have to think about the fiddley details of implementation, but instead focus purely on the interface.

We thus see that transparent ascription is useful for cases where knowing a representation is totally fine (or when debugging), but opaque ascription is in general the best approach when constructing a library. To clients of a given software package, it is best to enforce abstraction.

## Conclusions

In this chapter, we have explored the powerful benefits that are given by SML's module system, particularly in terms of _information hiding_, _abstraction_, and _modularization_. While modules are in themselves of significant theoretical interest, there are many practical applications to their use, and they offer a clean and concise way to structure large codebases. In the next chapter, we will explore _functors_, which are like a _higher-order structure_ that allows us a greater degree of freedom in structuring our code.
