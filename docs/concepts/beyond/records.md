---
sidebar_position: 1
---

# Records

_By Thea Brick, January 2023_

In the prior chapters we've used tuples as a method to carry around multiple,
distinct pieces of information. Using tuples for this is perfectly reasonable
for simple programs or places where we are only passing around a couple of
things, but often we need to handle much more than a couple things. We may also
want to convey information about what is being passed in (for readability).


## The Type

To support this, SML provides the record type, which can be thought of as a
labeled tuple. This means we can have a record of any length[^1] but each field
has an additional label that we can use for accessing it (rather than just
using the position). Here's an example of creating and using one:

```sml
type version = { id : int, name : string, date : string }
```

Any value of the `version` type must have the fields `id : int`,
`name : string`, and `date : string` importantly with no additional fields. We
may already see why this may be desired. If we had just used a tuple (e.g.
`int * string * string`) then there is no distinction (without documentation)
between the `name` and the `date`.

You don't need to use a type declaration to define a record though. You can use
it anywhere, just like a tuple.

```sml
datatype 'a tree = Empty
                 | Node of { left : 'a tree, value : 'a, right : 'a tree }

val example : { tree : int tree, size : int } = (* omitted *)
```


## The Expression

To create values of these record types, we follow a very similar syntax:

```sml
val version : version = {id=150, name="SMLhelp", date="Oct 23"}
```

Every field must be defined in order for the type to match (with no additional
ones), but the ordering does not matter.

Now that we have these records how do we use them. There are two methods to go
about this, accessors and pattern-matching. An accessor is simply the `#` with
the name of the field desired immediately after[^2]. For instance:

```sml
val getName : version -> string = fn version => #name version
```

Alternatively we can pattern-match instead. There are numerous different ways
to pattern match, which you can use for various situations. For instance, the
most basic method is as follows:

```sml
val getName : version -> string =
  fn {name = n, id = i, date = d} => n
```

We don't care about the `id` and `date` fields for this function, so we can use
`...` to omit those any field we don't care about from our record pattern:
```sml
val getName : version -> string = fn {name = n, ...} => n
```

Finally, `name` is the name of our field, but it would also be fine as the name
for our variable. So we can not include an `=`s and SML will bind the field to a
variable of the same name:
```sml
val getName : version -> string = fn {name, ...} => name
```


## The Pitfalls

From above, we have the following declaration:

```sml
val getName : version -> string = fn version => #name version
```

You may see this and think "hmmm... I can simplify this a bit," And write
something along the lines of:

```sml
val getName = fn v => #name v
val getName = fn {name, ...} => name (* alternatively *)
```

If you try and compile this, you'll get a type error, specifically an
"unresolved flex record," SML is able to determine what the `getName` function
should take in a record with at least the field `name`, but it can't infer
anything else. It could reasonably be `{ name : 'a }` or
`{ name : 'a, id : 'b}`, or
`{ name : 'a, id : 'b, ijoergnq : 'c list list list}`, or any other
possibility. The `getName` function can only be one type, so this isn't allowed.

There are two common workarounds for this. This first is just to annotate your
types! If we specifically say `getName` must take in a value of type `version`,
then there is no abiguity, so no error. The other workaround involves wrapping
a record in a constructor, which enforces the type of the record. To implement
this we might change our code to the following:

```sml
datatype version = Version of { id : int, name : string, date : string }

val getName = fn Version v => #name v
```

Thus, we know what fields `v` has, since the type can be infered by the
constructor it is associated with.

[^1]: If you were curious, the empty record `{}` is equivalent to `()`, thus
has type `unit`.

[^2]: The same can be done for tuples, where `#1` accesses the first value in
the tuple, `#2` for the second, etc.

