---
sidebar_position: 4
---

# Oh No! The Value Restriction

_By Thea Brick, January 2023_

First lets consider the following declaration:

```sml
val example = ref NONE
```

We can ask ourselves, what is the type of `example`. Surely it should be
`'a option ref`. Yet this can yield some problems:

```sml
val () = example := SOME 5
val () = example := SOME "string"
```

The first line requires that `example` must be `int option ref`, but then the
second line requires that `example` be a `string option ref`. This doesn't work,
`example` cannot be both of these types. So something went wrong when we decided
the original type of `example`.

To solve this issue, we can place restrictions on what is allowed to have a
polymorphic type. Specifically, an declaration can only have a polymorphic type
variable if the expression on the right hand side of the declaration is a
"non-expansive expression," Essentially, what this means is that the expression
on the right hand side must be a value and cannot alter the state (or memory) of
the program.

When something is value restricted, this means that we replace it with a unique
dummy type, so the following example above doesn't work because the definition
of `example` gets value restricted (since `ref NONE` is expansive, it modifies
state). So when we try to assign `example` to `SOME 5` or `SOME "string"` it
doesn't work because the dummy type is not a `int` nor a `string`.

Importantly, this still allows us to use most forms of polymorphism:

```sml
val none : 'a option = NONE
val id : 'a -> 'a = fn x => x
val magic : 'a -> 'b = fn _ => raise Fail "Magic"
```

Unfortunately, the rules for the value restriction is pretty blunt, thus some
completely fine expressions get value restricted:

```sml
(* should be `'a -> 'a` but isn't since `id id` isn't a value *)
val id2 = id id
```

Generally, this can be avoided in many cases. If you are working with a function
then you can usually wrap it in another function:

```sml
val id2 = fn x => id id x
```

Although if you are working with `ref`s or other imperative features then be
careful, since this could potentially modify behaviour.
