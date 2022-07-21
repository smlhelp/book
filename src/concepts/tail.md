# Tail Recursion

_By Eunice Chen and Brandon Wu, December 2020. Revised March 2022_

In programs, functions often make calls to either themselves (recursive calls) or other functions. There are two types of function calls: non-tail calls, and **tail calls**. A function call is called a **tail call** if the caller does not modify or examine the result of the function call.

If every recursive call made by a function is a **tail call**, that function is called **tail recursive**. Put another way, a function is **tail recursive** if the last operation performed by the function is the recursive call.

Suppose we have the following function to sum the elements of a list:

```sml
fun sum [] = 0
  | sum (x::xs) = x + (sum xs)
```

This function is not tail-recursive, because after the recursive call is evaluated, we add the result to `x`. Similarly, if we were to case on `sum xs` or did any other operation on its result, then this function would not be tail-recursive.

In order to write the `sum` function in a tail-recursive manner, we know that the last computation that we can do is the recursive call to `sum`. But, we also need some way to keep track of the sum of the list elements and add to it, since we no longer can add things after the recursive call. We will make an accumulator variable, `acc`, that will keep track of the sum of list elements we have exposed so far, and pass that down through the recursive calls. In our base case, we know we have seen every element in the list and there are no more elements to add, so our base case looks like this:

```sml
fun tsum ([], acc) = acc
```

In our recursive case, we want to use our accumulator to account for the top element of our list, then pass down that accumulator to the recursive calls. We can do that as follows:

```sml
fun tsum (x::xs, acc) = tsum (xs, x + acc)
```

Because SML evaluates the function arguments before evaluating the function call, `x + acc` is performed before `sum` is called, and then this updated accumulator value is passed down to the recursive `sum` call on `xs`. Thus, the last operation performed is the recursive call, making this a tail-recursive function.

Because we now have the accumulator variable, we must pass in `0` as the accumulator for `tsum` to behave as expected. In addition, because we have changed the type of `sum`, we can rewrite the original `sum` function by using the tail-recursive version as a helper.

Putting these parts together, we have:

```sml
fun tsum ([], acc) = acc
  | tsum (x::xs, acc) = tsum (xs, x + acc)

fun sum L = tsum (L, 0)
```

Why do we care about tail recursion? One reason is that the tail-recursive version of functions uses less space on the call stack. (The call stack is what keeps track of function calls- in this case, the call stack keeps track of the recursive calls and the work left to do after the recursive calls.)

Consider the following stack trace of the `sum` function, which is not tail-recursive:

```sml
sum [3, 2, 1]
=> 3 + (sum [2, 1])
=> 3 + (2 + (sum [1]))
=> 3 + (2 + (1 + (sum [])))
=> 3 + (2 + (1 + (0)))
=> 3 + (2 + (1))
=> 3 + (3)
=> 6
```

In this stack trace, we can see that the sum function takes linear space. (By stack space, we mean the space around the recursive call). Assuming an input list of length `n`, the stack will have `n` additions at its largest, giving us a stack of size `n`.

Now, consider a stack trace of the tail-recursive `sum'` function:

```sml
sum ([3, 2, 1], 0)
=> sum ([2, 1], 3)
=> sum ([1], 5)
=> sum ([], 6)
=> 6
```

Notice that the stack trace does not get any wider: we do not need any memory space to store "what is left to do," so this takes constant space.

## Example

Let's try to turn the function to calculate the nth Fibonacci number into a tail-recursive function.

```sml
fun fib 0 = 1
  | fib 1 = 1
  | fib n = fib (n-1) + fib (n-2)
```

Note that there are two recursive calls that we add together. In order to be tail-recursive, we can only make one recursive call (if there are two recursive calls, then one must be evaluated before the other, making the first recursive call not a tail call).

What if, instead of computing the nth Fibonacci number, we calculate the `n`th and the (`n-1`)th Fibonacci number together? (When `n` is `0`, we can just define the (`n-1`)th Fibonacci number to be `0`).

```sml
fun fib 0 = (1, 0)
  | fib 1 = (1, 1)
  | fib n =
    let
      val (a, b) = fib (n-1)
    in
      (a + b, a)
    end
```

This is closer, but we still are doing computation after the recursive call: we add the results of the recursive call to each other, then return. Let's try to use the accumulator idea we had earlier in the `sum` function, but this time, since we calculate the `n`th and (`n-1`)th Fibonacci number, we will pass in two accumulators. Accumulator `a` will hold the `n`th Fibonacci number, and accumulator `b` will hold the (`n-1`)th Fibonacci number.

```sml
fun fib' (0, a, b) = a
  | fib' (n, a, b) = fib' (n-1, a + b, a)
```

And if we call `fib' (n, 1, 0)`, observe that we will indeed get the correct result.

# Further Practice

For even further practice, try to write a tail-recursive function of the list-reversing function on your own.

```sml
fun rev [] = []
  | rev (x::xs) = (rev xs) @ [x]
```

## Answers

If we want to do this tail-recursively, we add an accumulator variable and proceed as usual. If we want to use the same types as the original `rev` function, we can call our tail-recursive version, as we did in our `sum` example.

```sml
fun trev ([], acc) = acc
  | trev (x::xs, acc) = trev (xs, x::acc)

val rev = fn L => trev (L, [])
```
