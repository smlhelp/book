"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[248],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),d=p(n),c=i,h=d["".concat(s,".").concat(c)]||d[c]||m[c]||o;return n?a.createElement(h,l(l({ref:t},u),{},{components:n})):a.createElement(h,l({ref:t},u))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=d;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var p=2;p<o;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6743:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>r,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_position:9},l="Lazy Evaluation",r={unversionedId:"concepts/lazy",id:"concepts/lazy",title:"Lazy Evaluation",description:"By Len Huang, Cooper Pierce, and Brandon Wu, January 2021. Rewritten by Thea Brick, April 2022.",source:"@site/docs/concepts/lazy.md",sourceDirName:"concepts",slug:"/concepts/lazy",permalink:"/book/docs/concepts/lazy",draft:!1,tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"defaultSidebar",previous:{title:"Sequences",permalink:"/book/docs/concepts/sequences"},next:{title:"Imperative Programming",permalink:"/book/docs/concepts/imperative"}},s={},p=[{value:"Eager vs Lazy",id:"eager-vs-lazy",level:2},{value:"Eager Evaluation",id:"eager-evaluation",level:3},{value:"Introducing Laziness with Thunks",id:"introducing-laziness-with-thunks",level:3},{value:"Lazy Lists",id:"lazy-lists",level:2},{value:"Thunks and Continuations",id:"thunks-and-continuations",level:2}],u={toc:p};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"lazy-evaluation"},"Lazy Evaluation"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"By Len Huang, Cooper Pierce, and Brandon Wu, January 2021. Rewritten by Thea Brick, April 2022.")),(0,i.kt)("p",null,"In programming languages, there's a few different strategies by which arguments of a function call are evaluated. One you should be familiar with is ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"eager"))," evaluation. SML is an ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"eager")),' language. In other words, we evaluate the arguments first. We\'ll be discussing how to "implement" the exact opposite form of evaluation: ',(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"lazy"))," evaluation. In ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"lazy"))," evaluation, arguments are evaluated as needed. To implement this, we'll make use of an idea called ",(0,i.kt)("strong",{parentName:"p"},"thunks"),"."),(0,i.kt)("h2",{id:"eager-vs-lazy"},"Eager vs Lazy"),(0,i.kt)("h3",{id:"eager-evaluation"},"Eager Evaluation"),(0,i.kt)("p",null,"Let's say I have the function ",(0,i.kt)("inlineCode",{parentName:"p"},"double : int -> int")," which doubles a number, and ",(0,i.kt)("inlineCode",{parentName:"p"},"square : int -> int"),", which squares a number. In both ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"lazy"))," and ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"eager"))," evaluation, ",(0,i.kt)("inlineCode",{parentName:"p"},"double (square (double 2)) ==>* 32"),'. However, they differ in the way which they "arrive" at ',(0,i.kt)("inlineCode",{parentName:"p"},"32"),". SML is an eager language, so the code (eagerly) steps as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"val double : int -> int = fn n => 2 * n\nval square : int -> int = fn n => n * n\n\n(* Eager *)\n    double (square (double 2))\n==> double (square 4)\n==> double 16\n==> 32\n")),(0,i.kt)("p",null,"You can see that we evaluated the arguments first. However, when doing things lazily, arguments will be evaluated as ",(0,i.kt)("em",{parentName:"p"},"needed"),". The notion of ",(0,i.kt)("em",{parentName:"p"},"need")," will be subjective relative to what's being implemented. The question now remains, since SML is eager, how do we do things lazily?"),(0,i.kt)("h3",{id:"introducing-laziness-with-thunks"},"Introducing Laziness with Thunks"),(0,i.kt)("p",null,"Since SML is an eager language, to have lazy evaluation we must simulate it in some way. To do this, we need a way to wait until we ",(0,i.kt)("em",{parentName:"p"},"need")," an argument to evaluate it. This is where ",(0,i.kt)("strong",{parentName:"p"},"thunks")," come into play. A ",(0,i.kt)("strong",{parentName:"p"},"thunk")," is a function of type ",(0,i.kt)("inlineCode",{parentName:"p"},"unit -> t")," for some type ",(0,i.kt)("inlineCode",{parentName:"p"},"t"),'. They help us represent this notion of "evaluation by need" by wrapping an expression in a function, which delays the computation of that expression.'),(0,i.kt)("p",null,"Let's say we have some function ",(0,i.kt)("inlineCode",{parentName:"p"},"f")," and argument ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),". When we run ",(0,i.kt)("inlineCode",{parentName:"p"},"f x"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"x")," will get evaluated immediately. However, by wrapping ",(0,i.kt)("inlineCode",{parentName:"p"},"x")," inside a function, we can delay its computation ",(0,i.kt)("em",{parentName:"p"},"(assume ",(0,i.kt)("inlineCode",{parentName:"em"},"f"),"'s type is correct)"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"f (fn () => x)"),". Since ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"functions are values")),", this lambda function is already fully evaluated. However, ",(0,i.kt)("inlineCode",{parentName:"p"},"x")," has yet to be evaluated! Now we can wait to evaluate ",(0,i.kt)("inlineCode",{parentName:"p"},"x")," by passing in ",(0,i.kt)("inlineCode",{parentName:"p"},"() : unit")," to the lambda function at some point. A lambda expression is like a lawn mower on a cord - it has the potential to start doing some kind of work, but not until its cord is pulled."),(0,i.kt)("p",null,"Let's see how that changes things in our earlier example. Here, we change ",(0,i.kt)("inlineCode",{parentName:"p"},"square")," into a lazy version that accepts a ",(0,i.kt)("strong",{parentName:"p"},"thunk")," instead of an ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"val double : int -> int = fn n => 2 * n\nfun square (f : unit -> int) : int = f () * f ()\n\n(* Lazy *)\n    double (square (fn () => double 2))\n==> double ((fn () => double 2) () * (fn () => double 2) ())\n==> double (double 2 * double 2)\n==> double (4 * 4)\n==> double 16\n==> 32\n")),(0,i.kt)("p",null,"You can see that with lazy evaluation, we put off the computation of ",(0,i.kt)("inlineCode",{parentName:"p"},"double 2"),' until we "needed it". That "need" is subjective, but the key idea is that we delayed the computation of ',(0,i.kt)("inlineCode",{parentName:"p"},"double 2")," by wrapping it a ",(0,i.kt)("strong",{parentName:"p"},"thunk"),". Lets see what this looks like in normal algebra."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"NOTE"),': You can see that the computation was "put off" since we had to recompute the value of ',(0,i.kt)("inlineCode",{parentName:"p"},"double 2")," twice. This seems rather inefficient, since we don't want to have to recompute every time we use the value of some expression multiple times. In other ",(0,i.kt)("em",{parentName:"p"},"lazy languages")," that use a primarily lazy evaluation strategy, there tends to be a sophisticated system of ",(0,i.kt)("em",{parentName:"p"},"memoization")," (or, remembering values) so that values do not have to be recomputed."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"(* Eager *)                  (* Lazy *)\n    2 * (2 * 2)^2                2 * (2 * 2)^2\n==> 2 * (4)^2                ==> 2 * ((2 * 2) * (2 * 2))\n==> 2 * (4 * 4)              ==> 2 * (4 * 4)\n==> 2 * 16                   ==> 2 * 16\n==> 32                       ==> 32\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"NOTE"),": In another sense, in a lazy setting, the final computed value of ",(0,i.kt)("inlineCode",{parentName:"p"},"2 * (2 * 2)^2")," is just the computation of ",(0,i.kt)("inlineCode",{parentName:"p"},"2 * (2 * 2)^2")," itself. Lazy evaluation is lazy because it does not move until it is forced to - thus, in this example, we have shown how algebraically we can obtain the final value of ",(0,i.kt)("inlineCode",{parentName:"p"},"2 * (2 * 2)^2")," ",(0,i.kt)("em",{parentName:"p"},"when forced"),', where we use the term "forcing" to refer to forcing a lazy expression to evaluate to a traditional "value".'),(0,i.kt)("p",null,"Since ",(0,i.kt)("inlineCode",{parentName:"p"},"square")," is now the lazy function, we are delaying the evaluation of ",(0,i.kt)("inlineCode",{parentName:"p"},"square"),"'s arguments. That's why in eager evaluation, we just do ",(0,i.kt)("inlineCode",{parentName:"p"},"2 * 2 ==> 4")," before we square that value, whereas in lazy evaluation, we square the unevaluated arguments by doing ",(0,i.kt)("inlineCode",{parentName:"p"},"(2 * 2) * (2 * 2)"),"."),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"Note, we let the type of a ",(0,i.kt)("strong",{parentName:"em"},"thunk")," be ",(0,i.kt)("inlineCode",{parentName:"em"},"unit -> 'a")," just because it's convenient.")," ",(0,i.kt)("em",{parentName:"p"},"Theoretically we could use a different type to represent thunks since all we need")," ",(0,i.kt)("em",{parentName:"p"},"is a way to wrap an expression in a function to delay its computation.")),(0,i.kt)("h2",{id:"lazy-lists"},"Lazy Lists"),(0,i.kt)("p",null,"Now that we have established this notion of ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"laziness"))," in SML, we can do even fancier things, like create ",(0,i.kt)("em",{parentName:"p"},"infinite data structures"),"! Unlike regular data structures, infinite data structures have the potential to encode an ",(0,i.kt)("em",{parentName:"p"},"unbounded")," amount of data. Let's first look at a lazy list and compare it to a normal list."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"datatype 'a list     = nil |  ::  of 'a * 'a list\ndatatype 'a lazylist = Nil | Cons of 'a * (unit -> 'a lazylist)\n")),(0,i.kt)("p",null,"You'll see that a ",(0,i.kt)("inlineCode",{parentName:"p"},"lazylist")," is very similar to normal ",(0,i.kt)("inlineCode",{parentName:"p"},"list"),"s. The only difference is that the computation of the list's tail has been delayed with a thunk. Just like before where we delayed computation of arguments for functions, we are now delaying the computation of arguments for constructors. You can sort of think of it like instead of having ",(0,i.kt)("inlineCode",{parentName:"p"},"x::xs"),", we now have ",(0,i.kt)("inlineCode",{parentName:"p"},"x::(fn () => xs)"),". This can help us create infinite lists since the true computation of the list tail is always delayed."),(0,i.kt)("p",null,"For example, if I wanted to represent a list of fibonacci numbers, I could do:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"val fibs : int lazylist =\n    let\n        fun fib' x y = Cons(x, fn () => fib' y (x + y))\n    in\n        fib' 0 1\n    end\n\n(* Iterate through lazy list *)\nval Cons(a1, f1) = fibs\nval Cons(a2, f2) = f1 ()\nval Cons(a3, f3) = f2 ()\nval Cons(a4, f3) = f3 ()\nval Cons(a5, f5) = f4 ()\n\n(* Test cases *)\nval 0 = a1\nval 1 = a2\nval 1 = a3\nval 2 = a4\nval 3 = a5\n")),(0,i.kt)("p",null,"Here, we have a value ",(0,i.kt)("inlineCode",{parentName:"p"},"fibs : int lazylist")," that represents the entire list of fibonacci numbers. Instead of immediately evaluating the tail of the list, the lazy list allows us to wait until a later time to continue iterating the list. We can exploit this by later triggering the evaluation of ",(0,i.kt)("inlineCode",{parentName:"p"},"fib' y (x + y)"),"."),(0,i.kt)("p",null,"Note that if you tried to do this with normal lists, we would get some circular evaluation since the computation is not being delayed. For example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"(* Example REPL Output *)\n\n- fun fib x y = x::(fib' y (x + y));\n\nval fib = fn : int -> int -> int list\n\n- fib 0 1;\n\nuncaught exception Overflow [overflow]\n  raised at: <file stdIn>\n")),(0,i.kt)("p",null,"We get an ",(0,i.kt)("inlineCode",{parentName:"p"},"exception Overflow")," since SML is trying to eagerly evaluate the arguments passed into the constructor ",(0,i.kt)("inlineCode",{parentName:"p"},"::"),". This causes it to go into an infinite loop and eventually overflow."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},"\"What's the tail of the list? I'm eager and I evaluate the arguments of the constructor first! Why it's ",(0,i.kt)("inlineCode",{parentName:"p"},"fib y (x + y)"),"! How exciting. Let's evaluate this. Well ",(0,i.kt)("inlineCode",{parentName:"p"},"fib y (x + y) ==> y::(fib (x + y) (y + (x + y)))"),". What's the tail of the list? I'm eager and I evaluate the arguments of the constructor first! Why it's ",(0,i.kt)("inlineCode",{parentName:"p"},"fib (x + y) (y + (x + y))"),"! How exciting. Let's evaluate this..."),(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("em",{parentName:"p"},"a few steps later...")),(0,i.kt)("p",{parentName:"blockquote"},"Why it's ",(0,i.kt)("inlineCode",{parentName:"p"},"fib ((y + (x + y)) + ((x + y + (y + (x + y))))) (((x + y + (y + (x + y)))) + ((y + (x + y)) + ((x + y + (y + (x + y))))))"),"! dang this is one thicc expression. It's time to surrender and ",(0,i.kt)("inlineCode",{parentName:"p"},"raise exception Overflow [overflow]"),". We'll get em next time \ud83d\ude1e"),(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("em",{parentName:"p"},"- The inner dialogue of the SML Compiler"))),(0,i.kt)("h2",{id:"thunks-and-continuations"},"Thunks and Continuations"),(0,i.kt)("p",null,"Another way to think of ",(0,i.kt)("strong",{parentName:"p"},"thunks")," is in relation to continuations. We've seen before continuations being passed into functions as a way to represent ",(0,i.kt)("em",{parentName:"p"},"what instructions need to be executed"),". Here, we are using the same idea but rather than forcing all those instructions to be executed now, we are passing them off so that they can be done when and if they are needed."),(0,i.kt)("p",null,"In the ",(0,i.kt)("inlineCode",{parentName:"p"},"fibs")," example we can see this where the ",(0,i.kt)("inlineCode",{parentName:"p"},"lazylist")," is defined to be the specific element of the fibonacci sequence, and a continuation (thunk) to produce the next element (along with a new continuation to compute the next next element, and so on infinitely)."),(0,i.kt)("p",null,"Another example that may be more enlightening is the function that tries to find all elements in a list that satisfy some predicate ",(0,i.kt)("inlineCode",{parentName:"p"},"p"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun listFind (p : 'a -> bool) ([] : 'a list) : 'a lazylist = Nil\n  | listFind p (x::xs) =\n        if p x\n        then Cons (x, fn () => listFind p xs)\n        else listFind p xs\n\nval p = fn x => x mod 2 = 0\nval res : int lazylist = listFind p [1,2,3,4]\n")),(0,i.kt)("p",null,"Here, ",(0,i.kt)("inlineCode",{parentName:"p"},"res")," would be bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"Cons(2, fn () => listFind p [3,4])"),". Our program is basically saying \"I found this element, 2, that satisfies your predicate, and if you'd like to find another element: here's a continuation/thunk that will do that for you\". So rather than having to evaluate a predicate (with a potentially large cost-bound) over a potentially huge list, we can be lazy, and only look at what we need."),(0,i.kt)("h1",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"Even though SML is an eager language, we can utilize ",(0,i.kt)("strong",{parentName:"p"},"thunks")," to delay the computation of arguments. This allows us to simulate and represent a more ",(0,i.kt)("strong",{parentName:"p"},"lazy")," style of evaluation, where we evaluate arguments ",(0,i.kt)("em",{parentName:"p"},"as needed"),". Using this idea, we can even represent things like infinite lists in SML!"))}m.isMDXComponent=!0}}]);