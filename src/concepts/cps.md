# Continuation Passing Style
We have seen how we can write functions that are _tail recursive_, in that they
only make recursive calls as _tail calls_, where the recursive calls is the last
thing that the function does (i.e. there is no deferred work). This commonly was
realized by implementing the tail-recursive function with an _accumulator_,
which simply stored the intermediate values that were computed. In this section,
we will explore an concept known as _continuation-passing style_, which sees the
use of _functions as accumulators_, which lets us use more explicit logic when
encoding the control flow of our programs, as well as the intermediate results
of our computations.

## Continuation Passing Style: The Idea
Consider the computation of (2 + 3) * 4.

Clearly, there is an ordering to how we should evaluate this. We should sum `2`
and `3` first, then take the _result of that_ and multiply it by `4`. There is
kind of a catch here, that is quickly glossed over by our human brains - we
refer to "the result of that" rather casually. We haven't explicitly named it,
but we nonetheless make an appeal to intuition to get our point across.

How else might we represent this computation? Well, we could use lambda
expressions, and then use the power of function application to compute the
result. Then, we might obtain that this is akin to evaluating `(fn res => res * 4)
(2 + 3)`. This would be a more direct translation of the idea of "add 2 and 3,
then pass the result of that to 4". We note that, in the process, we have
explicitly made clear what we mean by "the result of that" - it is now bound to
a name, that being `res`.

We can take this one step further. If we think about it a bit more, we might
want to consider starting at a "single" value, so that we don't have to consider
the operation of `2 + 3` as one step. Then, we might instead write "take 2, add
the previous result to 3, and then multiply the previous result by 4". Clearly,
we have now made it deliberate that we are passing around a _single value_ that
we are performing operations on at each step. How would we write this as a
lambda expression, however?

We might write `(fn res => (fn res2 => res2 * 4) (res + 3)) 2` to encode the
previous instructions. This essentially makes `res` the _first_ "previous
result", and then the result of `2 + 3` is `res2`, the _second_ "previous
result". Make sure you understand what is happening here - we are binding `2` to
the identifier `res`, then binding the result of `res + 3` to the identifier
`res2`.


