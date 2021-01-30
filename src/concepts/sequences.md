# Sequences

In programming, we often need to write fast algorithms that use enumerable collections. Currently we use the list datatype to represent enumerable collections. There are some crucial limitations of lists though.

A great application of SML's modules system is the sequence signature. The implementation of sequences (which is specific to 15150) allows for parallelism and accessing any element in O(1) time; it also comes with some helpful functions.

Similar to our notation for lists, our notation for sequences looks like `<x_1, x_2, x_3, ..., x_n>`.

## Sequences vs. Lists

Here are some advantages / disadvantages of sequences and lists. Considering sequences and lists purely from an algorithm-writing perspective, the only con of sequences is the slow cons operation.

| | Sequences | Lists |
| --- | --- | --- |
| Accessing element i | O(1) | O(i) |
| Parallelism | ✅ | ❌ |
| Pattern matching | ❌ | ✅ |
| cons operation | O(n) work | O(1) work |
| Writing proofs | Difficult | Relatively easy |

## Important sequence functions

Some frequently used sequence functions are `nth`, `tabulate`, `map`, `filter`, and `reduce`. For a comprehensive documentation of the sequence library, see http://www.cs.cmu.edu/~15150/resources/libraries/sequence.pdf. The following section will define each of the functions, give examples of their usage, and analyze their work and span.

### `Seq.nth`

The function `Seq.nth` allows for extracting any element from a sequence in O(1) work and span. This is a significant advantage over lists, which could take up to O(n) work and span, in the case of finding the last element of the list. `Seq.nth` has type `'a seq -> int -> 'a seq`.

An example: Let's say the sequence `S` is bound to the value `<0, 1, 2>`, which has type `int seq`. Then,
* `Seq.nth S 0` evaluates to `0`
* `Seq.nth S 2` evaluates to `2`
* `Seq.nth S 5` raises an exception `Range`, which occurs when the index is too large or small.

### `Seq.tabulate`

This is a very common tool for constructing a sequence. The type of `Seq.tabulate` is `(int -> 'a) -> int -> 'a seq`. The first argument is a function which maps an index to a value, and the second argument is an integer specifying the length of the sequence. In general:

```Seq.tabulate f n ==> <f 0, f 1, f 2, ..., f (n-1)>```

As a concrete example:

```Seq.tabulate (fn i => i) 5 ==> <0, 1, 2, 3, 4>```

Let's try writing a function that reverses a sequence. For example,

```reverse <0, 1, 2, 3, 4> ==> <4, 3, 2, 1, 0>```

This function `reverse` would have type `'a seq -> 'a seq`. In the above example, we have a sequence of length 5. The element at index 0 moves to index 4, the element at index 1 moves to index 3, ..., the element at index 4 moves to index 0. Generally, if the sequence has length `n`, the element at index `i` should move to `n - i - 1`. It's pretty easy to make off-by-one errors here, so be careful and test sequence functions thoroughly! The implementation of `reverse` is as follows:

```
fun reverse S =
  let
    val n = Seq.length S
  in
    Seq.tabulate (fn i => Seq.nth S (n-i-1)) n
  end
```

### `Seq.map`

### `Seq.reduce`

### `Seq.filter`

## Examples of functions involving sequences


## Exercise: Pascal's triangle

Our task is to write a function `pascal : int -> int seq seq`. Given a nonnegative integer `n`, `pascal n` evaluates to the first `n+1` rows of Pascal's triangle. For example:
```
pascal 5 =
<<1>,
 <1,1>,
 <1,2,1>,
 <1,3,3,1>,
 <1,4,6,4,1>,
 <1,5,10,10,5,1>>
```


```
fun pascalH 0 = [Seq.singleton 1]
  | pascalH n =
    let
      val (prev::rest) = pascalH (n-1)
      fun rowmaker 0 = 1
        | rowmaker i =
          if i = n then 1
          else Seq.nth prev i + Seq.nth prev (i-1)
      val new = Seq.tabulate rowmaker (n+1)
    in
      new::prev::rest
    end

fun pascal n = Seq.reverse (Seq.fromList (pascalH n))
```