---
sidebar_position: 3
---

# Additional Modules Syntax

_By Thea Brick, January 2023_

Modules in general are fairly complex. Due to this, we mostly focused on a
subset of the available syntax. That is not to these things are not useful
though.

## The `open`/`include` Keyword for Modules

These are very simple, but often useful declarations. The `open` declaration
takes a structure and places everything defined within it into scope. For
instance, if you were to write `open Int`, then you could just call `toString`
to get the `Int.toString` function instead.

The `include` keyword is essentially identical, but instead operates on the
signature/specification level. Writing `include SIGNATURE` essentially inserts
all the specification defined in the signature into wherever the `include` is
placed.

## The `where` Keyword for Modules

The `where` syntax allows the sharing of abstract type information for a
structure which otherwise uses opaque ascription. This is useful because we
generally want to always use opaque ascription, as not letting outside programs
mess with internal representations is important, yet there are some instances
where knowledge of the representation is essential, but it doesn't make sense
to make the type concrete.

There `where` keyword appears after the signature which it is being applied to.
Here is an example of what the `where` keyword does.


```sml
signature EXAMPLE =
sig
  type t (* abstract *)
  type u (* abstract *)
  type v (* abstract *)
end

signature EXAMPLE2 = EXAMPLE where type t = int
```

The type `t` is no longer abstract in `EXAMPLE2` rather it is defined to be
`int`. Likewise this can be done for multiple types, either through chaining
`where`s or through the `and` keyword.

```sml
signature EXAMPLE3 = EXAMPLE where type t = int and type u = string
```

Only type `v` remains abstract.

## The `sharing` Keyword for Modules

Sharing (in SML) is stating that two types need to be the same. There are
numerous complexities with this. In general, if one of the types that is
being shared is not abstract, then it cannot be shared.

Here is a really basic example of type sharing:

```sml
signature EXAMPLE =
sig
  type t (* abstract *)
  type u (* abstract *)
  sharing type t = u
end
```

This enforces that in any structure implementing `EXAMPLE`, the types `t` and
`u` must be the same. This might seem a little silly, becaue we could easily
write the following to do the same thing:

```sml
signature EXAMPLE2 =
sig
  type t (* abstract *)
  type u = t
end
```

This does do the same thing. And in fact, it is prefered to the first example,
so sharing should be avoided if possible. Yet, there are some scenarios where
sharing is useful. For instance, enforcing two different structures use the
same type:

```sml
signature EXAMPLE3 =
sig
  type t (* abstract *)
end

signature EXAMPLE4 =
sig
  structure S1 : EXAMPLE3
  structure S2 : EXAMPLE3
  sharing type S1.t = S2.t
end
```

In this case, the two structures `S1` and `S2` must have the same type for `t`,
and without the `sharing` specification this could not be enforced.
