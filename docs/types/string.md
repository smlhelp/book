---
sidebar_position: 4
---

# String

_By Brandon Wu, May 2020_

`string` is the SML type of ordered collections of characters.

## Values

Any valid string literal is a value of type `string`. This means that examples such as `"functional"`, `"15-150"`, and `"\n"` are all valid strings, forming their own constant constructors that can thus be pattern matched upon.

```sml
fun courseToNum ("15-150" : string) : int = 15150
  | courseToNum ("15-151" : string) : int = 15151
  | courseToNum ("15-122" : string) : int = 15122
```

## Production

Numerous types have their own `toString` functions that allow them to be easily converted to their string representations, including:

```sml
Bool.toString : bool -> string
Int.toString  : int -> string
Real.toString : real -> string
```

## Combination

Strings can be combined by means of the `^` operator, or "concatenation". `^` takes two strings and joins them together, without creating any spaces. As such, if neither string contains spaces, then the resulting string will be attached directly. Specifically, the result of an operation such as `"functional" ^ "programming"` will be `"functionalprogramming"`.

```sml
(op ^) : string * string -> string
```

## From the Structure

The structure `String` is bound as part of the SML Basis. It contains several useful functions for dealing with strings, such as:

```sml
String.explode : string -> char list
String.implode : char list -> string
```

`String.explode` takes a string and converts it to a list of its constituent characters, in order as they appear in the string. `String.implode` is the opposite, taking in a list of characters and joining them to form a string. This means that:

```sml
val [#"1", #"5", #"1", #"5", #"0"] = String.explode "15150"
val "15150" = String.implode [#"1", #"5", #"1", #"5", #"0"]
```

Note that the use of `#` is to denote that each element of the list is a `char` type, as opposed to a `string` of length 1.
