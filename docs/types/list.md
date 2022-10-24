---
sidebar_position: 6
---

# List

_By Brandon Wu, May 2020_

Lists are the SML type of ordered collections of objects. Notably, you can create lists of any kind of object, so `int list`, `string list`, and `bool list` are all valid types. `list` on its own is a type constructor (meaning that it makes new types out of old types), so it is not a valid type by itself, however. Lists are not, however, the same as arrays - they do not have constant-time access to any given index of the list. Indeed, they are best thought of as not analogous to arrays in other languages at all. Instead, you only have access to the elements located at the very beginning of the list, the _head_. Additionally, lists are more _restricted_ than data structures in some other languages - a given list has a fixed type for its elements. All of the elements in a list must be of the same type. For the purposes of this document, we will discuss only int lists.

## Values

We write lists as a sequence of integers, separated by commas, all enclosed with two square brackets. So then we have valid int lists as `[1, 2, 3]`, `[1, 5, 1, 5, 0]`, and `[]`, with the latter representing the empty list. We also refer to the empty list as _nil_ (in addition, you can type `nil` instead of `[]` in code).

The other essential component to lists is what is known as the `::` operator, referred to as "cons". Cons can be used as a constructor for any fixed type of list, so we say that for any given type `t`:

```sml
(op ::) : t * t list -> t list
```

Cons takes in a value `v` of type `t` and `t list`, and prepends `v` to the front of the given list. For ints in particular, we have that `1 :: [2, 3]` steps to `[1, 2, 3]`. Additionally, cons is _right-associative_. This means that in a continuous stream of applications of cons, they are evaluated from _right-to-left_. This means that `1 :: 2 :: 3 :: []` is implicitly denoting `1 :: (2 :: (3 :: []))`, as the calls to cons associate to the right. So, similarly to before, a `1 :: [2, 3]`, `[1, 2, 3]`, and `1 :: 2 :: 3 :: []` are exactly equivalent, and denote the same list.

Cons is also a _constructor_, meaning that it can be used to pattern match and deconstruct lists. As such, we can write basic functions to compute the length of a list as follows:

```sml
(* length : int list -> int *)
(* REQUIRES: true *)
(* ENSURES: length L ==> the length of L *)
fun length ([] : int list) : int = 0
  | length (x::xs : int list) : int = 1 + length xs
```

Given a non-empty list, this function simply binds the first element of the list to the identifier `x`, discards it, and then recursively calls `length` to find the length of the remaining list `xs`, adding 1 to the result.

The definition of an int list thus corresponds to:

```sml
datatype int list = [] | :: of int * int list
```

where an int list can either be the empty list `[]`, or it can be `::` of a first element and the rest of the list (where `::` is an infix operator, so instead of being written as `::(x, xs)`, we have `x :: xs`). Note that this is not actually valid syntax, but you can think of the definition of int lists in this way.

## Motivation

Compared to other data structures, lists seem to have numerous disadvantages. As mentioned previously, they do not possess constant-time indexing like arrays in other languages - there is no way to instantly get the ith element of a list easily. Instead, you must "cons off" all the elements in front of that item in order to retrieve it - if you want to remove that item from the list, then you have to put the preceding elements _back_ as well (and in the right order!). Lists are also inherently sequential - you cannot access multiple elements at one time.

The reason why we choose lists is that they have very nice mathematical properties. These "disadvantages" in the previous paragraph become strengths, when viewed in a certain manner. Lists are powerful for their simple, inductive definition (as shown in the previous section), which is sufficiently powerful to characterize many important principles in this class. Additionally, they are _persistent_, meaning that they cannot be mutated - any change to a list simply creates a new one instead, which is a very desirable property to have in functional programs. Though the interfacing behavior with these lists is limited, we will write programs where this limitation matters less. Our hope is that, throughout this course, you can begin to see that there is an elegance in simplicity.

> **[Case Study: Sorted Lists]**
>
> Sorting is an important principle in computer science. Whether it's binary search trees or cataloguing data, sorting is a very prevalent concept when it comes to making algorithms more efficient. It's not always the most easy to reason about, however - how would you be able to formally prove that a sorting algorithm works? In this regard, lists turn out to have some very nice properties.
>
> > **Definition : Sorted Int Lists**
> >
> > 1. `[] : int list` is sorted.
> > 2. The singleton int list is sorted.
> > 3. If `L : int list` is sorted, then if `x : int` is less than or equal to the first element of `L`, then `x :: L` is sorted.
>
> This definition is naturally inductive, and follows very easily from the definition of sorting. In addition, it goes hand-in-hand with how we define lists - building them up from smaller parts one-by-one. Seen in this way, reasoning about and proving whether a list is sorted becomes very easy.

## Combination

We have seen that cons is essential for constructing lists, and for deconstructing the constituent elements that comprise a given list. What about when dealing with multiple lists? We might want to _combine_ the elements from several lists at once. A standard function for doing so is called the `@` operator, or "append".

```sml
infix @
fun ([] : int list) @ (R : int list) : int list = R
  | (l::ls : int list) @ (R : int list) : int list = l :: (ls @ R)
```

(Note that this is valid syntax to declare an infix function `@`, it just looks a little different than what we've seen thus far. In this case, we put the function name _between_ the arguments).

This function essentially just takes off all the elements from the left list, then begins to add them back onto the right list. It is also infix, which means that the result of `[1, 2] @ [3, 4]` is `[1, 2, 3, 4]`, and in the function's code, `ls @ R` just means the resulting list from appending `ls` to `R`.

## Questions to Consider

1. In the code above, why does `@` not reverse the left list?

2. How might you inductively define a list whose elements all satisfy some property _P_?

3. Write an SML function that reverses a list.
