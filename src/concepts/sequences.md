# Sequences

In programming, we often need to write fast algorithms that use enumerable collections. Currently we use the list datatype to represent enumerable collections. There are some crucial limitations of lists though.

A great application of SML's modules system is the sequence signature. The implementation of sequences (which is specific to 15150) allows for parallelism and accessing any element in O(1) time; it also comes with some helpful functions.

## Sequences vs. Lists

Here are some advantages / disadvantages of sequences and lists.

| | Sequences | Lists |
| --- | --- | --- |
| Accessing element i | O(1) | O(i) |
| Parallelism | ✅ | ❌ |
| Pattern matching | ❌ | ✅ |
| cons operation | O(n) work | O(1) work |
| Writing proofs | Difficult | Relatively easy |

Considering sequences and lists purely from an algorithm-writing perspective, the only con of sequences is the slow cons operation.

## Important sequence functions

Some frequently used sequence functions are `nth`, `tabulate`, `map`, `filter`, and `reduce`. For a comprehensive documentation of the sequence library, see http://www.cs.cmu.edu/~15150/resources/libraries/sequence.pdf.




ending: exercise about pascal

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