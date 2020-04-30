# Bool

## Values
There are two values of type `bool`: `true` and `false`

## Introduction
Some common functions which produce booleans:
```
(op =)  : ''a * ''a -> bool
(op <>) : ''a * ''a -> bool  (* Inequality *)

(* All of the following are overloaded and also work on values of type real *)
(op <)  : int * int -> bool
(op >)  : int * int -> bool
(op <=) : int * int -> bool
(op >=) : int * int -> bool
```
