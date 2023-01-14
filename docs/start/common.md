---
sidebar_position: 4
---

# Common Tasks in SML

_By Thea Brick, December 2021_

## Looping and Iterating

Often times we want to iterate through each element in a list. The main way we want to implement this in SML is via recursion. We can define this at on an extremely abstract level as taking some base accumulator and combining it with an element to make a new accumulator.

```sml
(* some base accumulator *)
val acc = ...

(* some function which takes an element of the list and
 * and a accumulator and outputs an updated accumulator
 *)
fun combine (x, acc) = ...

fun iterate ([]) = acc
  | iterate (x::xs) =
    let
      val new_acc = iterate xs
    in
      combine (x, new_acc)
    end
```

To make this more concrete, we can imagine we are trying to sum an int list. The base accumulator would be what the sum of the empty list is. The combine function would be simply adding the element onto the accumulator.

```sml
val acc : int = 0

fun combine (x : int, acc : int) : int = x + acc

fun iterate ([] : int list) : int = acc
  | iterate (x::xs : int list) =
    let
      val new_acc = iterate xs
    in
      combine (x, new_acc)
    end
```

Now iterate will sum up a list for us. Generally we simply our functions a bit, so it might be more common to see something along the lines of:

```sml
fun sum ([] : int list) : int = 0
  | sum (x::xs : int list) : int = x + (sum xs)
```

Observe that these are same, just we are removing the let expression and simplifying some things for the sake of readability.

## Searching

Often times we may be given a list and we'd like to see if an element is in said list. In this case we want `search (L, y)`to evaluate to `true` if `y` is in `L` and `false` otherwise. We can do this with this same idea of iteration.

```sml
fun search ([] : int list, y : int) : bool = false
  | search (x::xs : int list, y : int) : bool =
    if x = y
    then true (* we can stop iterating if we find the value *)
    else search (xs, y)
```

Alternatively we can write this as:

```sml
fun search ([] : int list, y : int) : bool = false
  | search (x::xs : int list, y : int) : bool =
    (x = y) orelse (search (xs, y))
```

If we require that the list is sorted, then we can alter our function to stop looking through the list once we pass where `y` should be:

```sml
fun sortedSearch ([] : int list, y : int) : bool = false
  | sortedSearch (x::xs : int list, y : int) : bool =
    (x = y) orelse ((x < y) andalso (sortedSearch (xs, y)))
```

## Runtime checks

If we ever wanted to ensure that we have some property at runtime, we can write some thing of the following form:

```sml
val _ = (condition_that_should_be_true) orelse (raise Fail "Condition False!")
```

So for instance, suppose we wanted to enforce that our sortedSearch function from before actually sorted int lists.

```sml
fun isSorted ([] : int list) : bool = true
  | isSorted ([_]) = true
  | isSorted (x::y::xs) = (x < y) andalso (isSorted (y::xs))

fun sortedSearch (L, y) =
  let
    val _ = (isSorted L) orelse (raise Fail "Unsorted List!")
    (* we define a recursive helper function so that the runtime check
     * is only checked once rather than at every step. *)
    fun helper ([] : int list) : bool = false
      | helper (x::xs : int list) : bool =
        (x = y) orelse ((x < y) andalso (helper xs))
  in
    helper L
  end
```

Importantly, we generally just assume that a function has an assumed property when passed into the function (and we don't care about inputs that don't satisfy this), so inserting runtime checks like these are mainly useful for debugging.

## Print-line Debugging

SMLNJ defines the function `print : string -> unit` which outputs the passed string. We can use val declarations in let expressions to print out a message while we are computing some result:

```sml
let
  ...
  val () = print "some message"
  ...
in ... end
```

In our search example, we can use the `Int.toString : int -> string` function to print every element we visit while we are searching:

```sml
fun search ([] : int list, y : int) : bool = false
  | search (x::xs : int list, y : int) : bool =
    let
      val () = print (Int.toString x)
    in
      (x = y) orelse (search (xs, y))
    end
```

Alternatively, we can use the sequencing operator `;` to put the prints in line.

```sml
fun search ([] : int list, y : int) : bool = false
  | search (x::xs : int list, y : int) : bool =
    (print (Int.toString x); (x = y) orelse (search (xs, y)))
```

It should be noted that `;` often doesn't "play nice" with many things in SML, so it is best to enclose every sequence of expressions with parentheses as we did above.
