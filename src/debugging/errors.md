# Common Errors
## Casing Issues
### Match Nonexhaustive
Though the code will still compile and run with this warning, it often indicates that the logic in your code does not cover all cases. It is always a good idea to check if you are missing some cases in your thinking, or if the warning comes from a scenario that will never happen according to the function specification. Even if there is a case that may not happen according to the function specification, it may be useful to raise an exception in the "impossible" case to get rid of this warning, because if your code somehow violates the specification and ends up in this case, then you can catch the error and debug it.

### Nested Cases
When you nest case expressions within case expressions, it's good to wrap your case statements with parentheses. SML will continue to look for patterns to case on, so using parentheses will let it know when to "stop".

For example, the following code will compile without warnings:
```
case 0 of
     0 => (case "x" of _ => 3)
   | _ => 5
```
but this code will have a match redundant error and a match nonexhaustive error:
```
case 0 of
     0 => case "x" of _ => 3
   | _ => 5
```
Obviously, this example is very contrived, but parens may be a source of error if you have nested case expressions.

## Associativity Issues
Since function application is left associative, making sure you have correct parenthesization is very important. It is almost always a good idea to double check your parenthesization in your code, since it can cause very confusing bugs, but can be fixed with a simple check.

For example, the following code will not compile:
```
fun f [] = 0
  | f x::xs = 1
```
This fails to compile because function application is left-associative, so the SML compiler thinks that `x` is the only argument to the function `f`, and does not know how to parse the extra `::xs`. A fix for this issue would just to put parens around the `x::xs`, like so:
```
fun f [] = 0
  | f (x::xs) = 1
```
Similarly, if some expression is an argument to another function, it is usually good to put parens around that expression. For example, suppose we had some functions `f` and `g` of type `int -> int`, and we would like to apply the function `g` to the value `f 1`. Then, if we wrote `g f 1`, this would not typecheck, since function application is left-associative (writing `g f 1` would be the same thing as writing `((g f) 1)`). To fix this, we would write this as `g (f 1)` to fix the associativity issues.

## Equality Type Warnings (i.e. `''a` vs `'a`)
Sometimes, code will fail to typecheck because it expects something of type `'a` but instead gets something of type `''a` instead. A plain type variable like `'a` can be substituted with any type, but something like type `''a` (with two apostrophes in front) can only be substituted with an _equality_ type. An _equality_ type is a type that can use operators like `=` and `<>` to compare their values (`int`, `string`, and `bool` are good examples of equality types). Thus, if your code has an `''a` instead of an `a`, it is likely that you are using `=` or `<>` to compare values.

For example, the following function has type `''a list * 'a -> bool`:
```
fun contains (x, []) = false
  | contains (x, y::ys) = x = y orelse contains (x, ys)
```
Because `x` and `y` are compared by `=` in the function, then any inputs into the `contains` function must consist of equality types, so the type is `''a list * ''a -> bool`.

However, we might want a function that takes in an `'a list` instead because it is more general. We still need some way of comparing whether two elements are equal or not, so we will pass in an extra parameter to compare two elements. We can rewrite the function as follows:
```
fun contains (cmp, x, []) = false
  | contains (cmp, x, y::ys) =
    case cmp (x, y) of
      EQUAL => true
    | _ => contains (cmp, x, ys)
```
The type of the function will now be `('a * 'a -> order) * 'a list * 'a -> bool`.

In general, using `case` expressions instead of `if-then-else` statements with `=` signs is preferable because of this issue.