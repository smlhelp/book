"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[1716],{3905:(e,t,a)=>{a.d(t,{Zo:()=>l,kt:()=>d});var n=a(7294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function r(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var p=n.createContext({}),m=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):r(r({},t),e)),a},l=function(e){var t=m(e.components);return n.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},h=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,i=e.originalType,p=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),h=m(a),d=s,N=h["".concat(p,".").concat(d)]||h[d]||c[d]||i;return a?n.createElement(N,r(r({ref:t},l),{},{components:a})):n.createElement(N,r({ref:t},l))}));function d(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=a.length,r=new Array(i);r[0]=h;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:s,r[1]=o;for(var m=2;m<i;m++)r[m]=a[m];return n.createElement.apply(null,r)}return n.createElement.apply(null,a)}h.displayName="MDXCreateElement"},9454:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>o,toc:()=>m});var n=a(7462),s=(a(7294),a(3905));const i={sidebar_position:2},r="Common HOFs and Partial Evaluation",o={unversionedId:"concepts/hof/common",id:"concepts/hof/common",title:"Common HOFs and Partial Evaluation",description:"By Brandon Wu, June 2020. Revised December 2022",source:"@site/docs/concepts/hof/common.md",sourceDirName:"concepts/hof",slug:"/concepts/hof/common",permalink:"/book/docs/concepts/hof/common",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"defaultSidebar",previous:{title:"Currying and Staging",permalink:"/book/docs/concepts/hof/curry"},next:{title:"Control Flow",permalink:"/book/docs/concepts/control-flow/"}},p={},m=[{value:"Designing Higher-Order Functions",id:"designing-higher-order-functions",level:2},{value:"Map",id:"map",level:3},{value:"Filter",id:"filter",level:3},{value:"Fold",id:"fold",level:3},{value:"Compose",id:"compose",level:2},{value:"Partial Evaluation and Modularity",id:"partial-evaluation-and-modularity",level:2}],l={toc:m};function c(e){let{components:t,...a}=e;return(0,s.kt)("wrapper",(0,n.Z)({},l,a,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h1",{id:"common-hofs-and-partial-evaluation"},"Common HOFs and Partial Evaluation"),(0,s.kt)("p",null,(0,s.kt)("em",{parentName:"p"},"By Brandon Wu, June 2020. Revised December 2022")),(0,s.kt)("p",null,"In this section, we will explore a number of common higher-order functions that we will make use of. These higher-order functions embody ",(0,s.kt)("em",{parentName:"p"},"design patterns")," that are common in programming, and represent a ",(0,s.kt)("em",{parentName:"p"},"generalized notion")," of a large space of potential functions that can be made to solve a myriad of problems. This section focuses on understanding the importance that higher-order functions offer us through increasing ",(0,s.kt)("em",{parentName:"p"},"abstraction"),", as well as ",(0,s.kt)("em",{parentName:"p"},"modularity")," in the structure of our code."),(0,s.kt)("h2",{id:"designing-higher-order-functions"},"Designing Higher-Order Functions"),(0,s.kt)("p",null,"Suppose that we are interested in incrementing all the numbers in a list by one."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},"fun incList [] = []\n  | incList (x::xs) = (x + 1) :: incList xs\n")),(0,s.kt)("p",null,"This is not too bad to do - we simply need to increment each individual element, and then simply cons it back on recursively. Suppose further that, as the arithmetically-minded scholars that we are, we are also interested in negating the sign of each element in a list."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},"fun negateList [] = []\n  | negateList (x::xs) = (~x) :: negateList xs\n")),(0,s.kt)("p",null,"These two look quite similar, which we begin to find unnerving. Hoping to get away from what is surely a wild coincidence, we try and write a function to take a list of strings and append the string ",(0,s.kt)("inlineCode",{parentName:"p"},'"\\n"')," to them (which denotes the newline character)."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},'fun newLineList [] = []\n  | newLineList (x::xs) = (x ^ "\\n") :: newLineList xs\n')),(0,s.kt)("p",null,"We can't seem to escape!"),(0,s.kt)("h3",{id:"map"},"Map"),(0,s.kt)("p",null,"We have seen that these functions we have written all look very similar - they perform a function on each element of a list, then cons the result back on to the recursive call so as to perform that operation on ",(0,s.kt)("em",{parentName:"p"},"every")," element of the list. This is a common ",(0,s.kt)("em",{parentName:"p"},"design pattern"),", or ",(0,s.kt)("em",{parentName:"p"},"template")," for a function that we want to do a particular thing. For each specific operation we want to perform on a list, it seems we would have to write the same sort of function each time, only changing the operation that is performed at the recursive call. To avoid all that work, we will make use of ",(0,s.kt)("em",{parentName:"p"},"higher-order functions"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},"(* map : ('a -> 'b) -> 'a list -> 'b list *)\nfun map f [] = []\n  | map f (x::xs) = (f x) :: map f xs\n")),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"map")," thus both takes in a function (in this instance, the function ",(0,s.kt)("inlineCode",{parentName:"p"},"f"),") and is ",(0,s.kt)("em",{parentName:"p"},"curried"),", meaning that it itself returns a function. ",(0,s.kt)("inlineCode",{parentName:"p"},"map")," takes in the function that you wish to apply to the entire list, and then the list, and then returns the result of applying that function to every element in the list. In other words, ",(0,s.kt)("inlineCode",{parentName:"p"},"map f [x_1, ..., x_n] ==> [f x_1, ..., f x_n]"),"."),(0,s.kt)("p",null,"We also note that ",(0,s.kt)("inlineCode",{parentName:"p"},"map")," is ",(0,s.kt)("em",{parentName:"p"},"polymorphic"),", as we learned earlier, and the function it takes in has type ",(0,s.kt)("inlineCode",{parentName:"p"},"'a -> 'b"),", which is the most general function type. This means that the function we pass in can describe any kind of transformation on some element, which grants us a great deal of versatility."),(0,s.kt)("p",null,(0,s.kt)("inlineCode",{parentName:"p"},"map")," ",(0,s.kt)("em",{parentName:"p"},"describes")," a pattern, or a ",(0,s.kt)("em",{parentName:"p"},"family")," of functions that all follow the same sort of structure. In the same way that ",(0,s.kt)("inlineCode",{parentName:"p"},"'a")," is a variable ranging over all types, where we can describe each type as an ",(0,s.kt)("em",{parentName:"p"},"instance")," of ",(0,s.kt)("inlineCode",{parentName:"p"},"'a"),", we can describe functions like ",(0,s.kt)("inlineCode",{parentName:"p"},"incList"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"negateList"),", and ",(0,s.kt)("inlineCode",{parentName:"p"},"newLineList"),' as being sort of "instances" of ',(0,s.kt)("inlineCode",{parentName:"p"},"map"),". Specifically, we have that ",(0,s.kt)("inlineCode",{parentName:"p"},"incList")," is extensionally equivalent to ",(0,s.kt)("inlineCode",{parentName:"p"},"map (fn x => x + 1)"),", ",(0,s.kt)("inlineCode",{parentName:"p"},"negateList")," is extensionally equivalent to ",(0,s.kt)("inlineCode",{parentName:"p"},"map ~"),", and ",(0,s.kt)("inlineCode",{parentName:"p"},"newLineList")," is extensionally equivalent to ",(0,s.kt)("inlineCode",{parentName:"p"},'map (fn x => x ^ "\\n")'),"."),(0,s.kt)("p",null,"We will now explore some more types of common patterns."),(0,s.kt)("h3",{id:"filter"},"Filter"),(0,s.kt)("p",null,"Quite often, we have a collection of objects and are interested in only some of them - we want to select those that possess the desired property, and get rid of those that do not. In other words, we want to ",(0,s.kt)("em",{parentName:"p"},"filter"),' the list into only those such elements. The property that we desire, however, could be anything. All we need to be able to do is say "yes" or "no" at any given item,'),(0,s.kt)("p",null,"This is embodied in the implementation of ",(0,s.kt)("inlineCode",{parentName:"p"},"filter"),", which abstracts away the specific property in question."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},"(* filter : ('a -> bool) -> 'a list -> 'a list *)\nfun filter p [] = []\n  | filter p (x::xs) = if p x then x :: filter p xs\n                              else filter p xs\n")),(0,s.kt)("p",null,"We describe the function ",(0,s.kt)("inlineCode",{parentName:"p"},"p")," (of type ",(0,s.kt)("inlineCode",{parentName:"p"},"'a -> bool"),") as a ",(0,s.kt)("em",{parentName:"p"},"predicate function"),", or alternatively ",(0,s.kt)("em",{parentName:"p"},"indicator function"),", which simply returns ",(0,s.kt)("inlineCode",{parentName:"p"},"true"),' on those "yes"-cases and ',(0,s.kt)("inlineCode",{parentName:"p"},"no"),' on "no"-cases. Seen in this way, ',(0,s.kt)("inlineCode",{parentName:"p"},"filter")," does something very similar to ",(0,s.kt)("inlineCode",{parentName:"p"},"map"),", where it takes in the function it needs to apply to the elements of the list. In the case where the predicate holds, the element is kept, otherwise the element is discarded."),(0,s.kt)("p",null,"We could, for instance, obtain all the even integers in a list ",(0,s.kt)("inlineCode",{parentName:"p"},"L : int list")," by writing the expression ",(0,s.kt)("inlineCode",{parentName:"p"},"filter (fn x => x mod 2 = 0) L"),"."),(0,s.kt)("h3",{id:"fold"},"Fold"),(0,s.kt)("p",null,'Map is very useful for performing some kind of transformation on a bulk group of data, however it retains the "structure" of the list. It maintains the elements in the same order as they were inputted, and simply transforms each piecewise to produce a final answer. Sometimes, we are interested in simply achieving a final result from a collection of data - not another collection of data itself. This describes a very common pattern known as ',(0,s.kt)("em",{parentName:"p"},"folding"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},"(* foldl : ('a * 'b -> 'b) -> 'b -> 'a list -> 'b *)\nfun foldl g z [] = z\n  | foldl g z (x::xs) = foldl g (g(x, z)) xs\n\n(* foldr : ('a * 'b -> 'b) -> 'b -> 'a list -> 'b *)\nfun foldr g z [] = z\n  | foldr g z (x::xs) = g(x, foldr g z xs)\n")),(0,s.kt)("p",null,"More specifically, ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr")," both describe two ways of combining the elements in a list, given a function ",(0,s.kt)("inlineCode",{parentName:"p"},"g"),". The role of ",(0,s.kt)("inlineCode",{parentName:"p"},"z"),' is that of a "base case" in our accumulated value, so that we have an initial point to start from when using the function ',(0,s.kt)("inlineCode",{parentName:"p"},"g"),". The result of ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl g z [x_1, ..., x_n]")," is to evaluate to ",(0,s.kt)("inlineCode",{parentName:"p"},"g(x_n, ..., g(x_2, g(x_1, z))...)"),", and the result of ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr g z [x_1, ..., x_n]")," is to evaluate to ",(0,s.kt)("inlineCode",{parentName:"p"},"g(x_1, ..., g(x_n-1, g(x_n, z))...)"),". We are thus choosing whether we want to fold from the ",(0,s.kt)("em",{parentName:"p"},"left")," of the list or the ",(0,s.kt)("em",{parentName:"p"},"right"),"."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"NOTE:")," One way to remember which way that that each respective ",(0,s.kt)("inlineCode",{parentName:"p"},"fold")," goes is to identify the corresponding side (left or right) as being the side of the most ",(0,s.kt)("em",{parentName:"p"},"deeply nested")," element in the functions. As such, since ",(0,s.kt)("inlineCode",{parentName:"p"},"x_1")," is the most leftmost element, ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl")," has ",(0,s.kt)("inlineCode",{parentName:"p"},"f(x_1, z)")," as its innermost component, whereas since ",(0,s.kt)("inlineCode",{parentName:"p"},"x_n")," is the most rightmost element, ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr")," has ",(0,s.kt)("inlineCode",{parentName:"p"},"f(x_n, z)"),"."),(0,s.kt)("p",null,"Use cases for ",(0,s.kt)("inlineCode",{parentName:"p"},"fold")," include if you wanted to turn a list of strings into a single string, which you could accomplish with ",(0,s.kt)("inlineCode",{parentName:"p"},'foldr (op^) ""'),", or if you wanted to sum the elements of a list, which could be done with ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl (op+) 0"),". Note that in the case of summing a list, ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr")," would work too. This is because ",(0,s.kt)("inlineCode",{parentName:"p"},"+")," satisfies the property that ",(0,s.kt)("inlineCode",{parentName:"p"},"x + y = y + x"),". In general, ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl f")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr f")," do the same thing when ",(0,s.kt)("inlineCode",{parentName:"p"},"f")," satisfies the property ",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"f"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"a"),(0,s.kt)("mn",{parentName:"msub"},"1")),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("mi",{parentName:"mrow"},"f"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"a"),(0,s.kt)("mn",{parentName:"msub"},"2")),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("mi",{parentName:"mrow"},"b"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,s.kt)("mo",{parentName:"mrow"},"="),(0,s.kt)("mi",{parentName:"mrow"},"f"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"a"),(0,s.kt)("mn",{parentName:"msub"},"2")),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("mi",{parentName:"mrow"},"f"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("msub",{parentName:"mrow"},(0,s.kt)("mi",{parentName:"msub"},"a"),(0,s.kt)("mn",{parentName:"msub"},"1")),(0,s.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,s.kt)("mi",{parentName:"mrow"},"b"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"f(a_1, f(a_2, b)) = f(a_2, f(a_1, b))")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"a"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3011em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"1")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"a"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3011em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"2")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"b"),(0,s.kt)("span",{parentName:"span",className:"mclose"},"))"),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,s.kt)("span",{parentName:"span",className:"mrel"},"="),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"a"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3011em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"2")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord"},(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"a"),(0,s.kt)("span",{parentName:"span",className:"msupsub"},(0,s.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3011em"}},(0,s.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,s.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,s.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,s.kt)("span",{parentName:"span",className:"mord mtight"},"1")))),(0,s.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,s.kt)("span",{parentName:"span",className:"vlist-r"},(0,s.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,s.kt)("span",{parentName:"span"})))))),(0,s.kt)("span",{parentName:"span",className:"mpunct"},","),(0,s.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"b"),(0,s.kt)("span",{parentName:"span",className:"mclose"},"))"))))),". (As a difficult exercise, you can try proving this!)"),(0,s.kt)("p",null,"For many purposes, it will be the case that your ",(0,s.kt)("inlineCode",{parentName:"p"},"z")," will be some ",(0,s.kt)("em",{parentName:"p"},"identity")," value, such as ",(0,s.kt)("inlineCode",{parentName:"p"},"0")," for summing a list, or the empty string for concatenating all the strings in a list. This does not always have to be the case. One of the strengths of the implementation is that we can ",(0,s.kt)("em",{parentName:"p"},"specify")," what our ",(0,s.kt)("inlineCode",{parentName:"p"},"z")," is, and tailor that to our needs. For instance, if we wanted to append a ",(0,s.kt)("inlineCode",{parentName:"p"},'"\\n"')," to our string concatenation, we could use ",(0,s.kt)("inlineCode",{parentName:"p"},'foldr (op^) "\\n"'),". Fold offers us a great deal of flexibility with choosing how we want to reduce a list."),(0,s.kt)("p",null,"It is somewhat important to note the type of the function ",(0,s.kt)("inlineCode",{parentName:"p"},"g")," here. It has type ",(0,s.kt)("inlineCode",{parentName:"p"},"'a * 'b -> 'b"),", where ",(0,s.kt)("inlineCode",{parentName:"p"},"'a")," is the type of the elements in the list that we are folding, and ",(0,s.kt)("inlineCode",{parentName:"p"},"'b")," is the type of the initial accumulator and output. It is useful to think of this ",(0,s.kt)("inlineCode",{parentName:"p"},"'b")," type as the type of the ",(0,s.kt)("inlineCode",{parentName:"p"},"fold"),' function\'s "accumulator", or the information that it stores as it proceeds along its computation. In the case of ',(0,s.kt)("inlineCode",{parentName:"p"},"foldl"),", this accumulator at a given point along the list is simply the folded value of the all the elements to the left - and in ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr"),', it is the folded value of all the elements to the right. The polymorphic nature of this accumulator becomes a major strength, as we can "carry along" any kind of information that we like, so long as we define how it changes when we receive a new ',(0,s.kt)("inlineCode",{parentName:"p"},"'a"),"-typed element from the list that we are folding."),(0,s.kt)("p",null,"So, for instance, the accumulator in ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl (op+) 0")," is simply the sum of all the elements to the left of any given point. The accumulator of ",(0,s.kt)("inlineCode",{parentName:"p"},'foldr (op^) ""')," is the concatenation of all of the strings to the right of a given point (which I hope makes apparent why ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr")," is the right fold for the task, as opposed to ",(0,s.kt)("inlineCode",{parentName:"p"},"foldl"),"!)."),(0,s.kt)("h2",{id:"compose"},"Compose"),(0,s.kt)("p",null,"One of the major examples that we used to motivate totality was that of ",(0,s.kt)("em",{parentName:"p"},"function composition"),", the classic example being ",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"f"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("mi",{parentName:"mrow"},"g"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,s.kt)("mi",{parentName:"mrow"},"x"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,s.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"f(g(x))")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"g"),(0,s.kt)("span",{parentName:"span",className:"mopen"},"("),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal"},"x"),(0,s.kt)("span",{parentName:"span",className:"mclose"},"))"))))),", for some functions ",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"f")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"f")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8889em",verticalAlign:"-0.1944em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.10764em"}},"f")))))," and ",(0,s.kt)("span",{parentName:"p",className:"math math-inline"},(0,s.kt)("span",{parentName:"span",className:"katex"},(0,s.kt)("span",{parentName:"span",className:"katex-mathml"},(0,s.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,s.kt)("semantics",{parentName:"math"},(0,s.kt)("mrow",{parentName:"semantics"},(0,s.kt)("mi",{parentName:"mrow"},"g")),(0,s.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"g")))),(0,s.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,s.kt)("span",{parentName:"span",className:"base"},(0,s.kt)("span",{parentName:"span",className:"strut",style:{height:"0.625em",verticalAlign:"-0.1944em"}}),(0,s.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"g"))))),". This is a very common idea, where we have some form of data that we would like to put through a series of transformations. If our transformations are inherently disparate (such as being bound to identifiers of different functions), we may have to write code that looks like ",(0,s.kt)("inlineCode",{parentName:"p"},"f1 (f2 (f3 (f4 (f5 x))))"),". However, this can only happen if we ",(0,s.kt)("em",{parentName:"p"},"already have access to the element x"),". So then, what happens if we want to give a name to the ",(0,s.kt)("em",{parentName:"p"},"process")," of applying ",(0,s.kt)("inlineCode",{parentName:"p"},"f5"),", then ",(0,s.kt)("inlineCode",{parentName:"p"},"f4"),", then ",(0,s.kt)("inlineCode",{parentName:"p"},"f3"),", then ",(0,s.kt)("inlineCode",{parentName:"p"},"f2"),", and then ",(0,s.kt)("inlineCode",{parentName:"p"},"f1"),"?"),(0,s.kt)("p",null,"We could, of course, write the lambda expression ",(0,s.kt)("inlineCode",{parentName:"p"},"fn x => f1 (f2 (f3 (f4 (f5 x))))"),", however that still can be rather ugly. There is an entire style of programming (named ",(0,s.kt)("em",{parentName:"p"},"point-free"),", or ",(0,s.kt)("em",{parentName:"p"},"tacit")," programming) that tries to eliminate the deliberate identification of the arguments to functions, instead making use of ",(0,s.kt)("em",{parentName:"p"},"combinators"),". In a similar flavor, we would like to eliminate the explicit need to construct the lambda expression that takes in the input ",(0,s.kt)("inlineCode",{parentName:"p"},"x"),". We might then call back to another common mathematical operator, that being of ",(0,s.kt)("em",{parentName:"p"},"function composition"),", or ",(0,s.kt)("inlineCode",{parentName:"p"},"o"),"."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-sml"},"infix o\n(* o : ('b -> 'c) -> ('a -> 'b) -> ('a -> 'c) *)\nfun f o g = fn x => f (g x)\n")),(0,s.kt)("p",null,'Note that the types are constrained to permit the "compatibility" of the functions ',(0,s.kt)("inlineCode",{parentName:"p"},"f")," and ",(0,s.kt)("inlineCode",{parentName:"p"},"g"),". The input type of ",(0,s.kt)("inlineCode",{parentName:"p"},"f")," can be general, as well as the output type of ",(0,s.kt)("inlineCode",{parentName:"p"},"g"),", but the output type of ",(0,s.kt)("inlineCode",{parentName:"p"},"g")," must match the input type of ",(0,s.kt)("inlineCode",{parentName:"p"},"f"),'. In this way, we can "string along" a series of functions in order to produce a single function that performs the "pipeline" of transformations that we desire.'),(0,s.kt)("p",null,"So, for instance, we could write the function that, given a tree of integers, sums all of the elements in the tree by simply writing ",(0,s.kt)("inlineCode",{parentName:"p"},"sum o inord"),". We could, of course, simply write ",(0,s.kt)("inlineCode",{parentName:"p"},"treeSum"),", however this idea is generalizable to more complicated sequences of transformations."),(0,s.kt)("h2",{id:"partial-evaluation-and-modularity"},"Partial Evaluation and Modularity"),(0,s.kt)("p",null,"At this point, we have seen several examples of common higher-order functions, as well as potential use cases. These use cases often look nothing alike, but they all share a fundamental similarity in their ",(0,s.kt)("em",{parentName:"p"},"structure"),", which is specified by the given higher-order function."),(0,s.kt)("p",null,"A key strength of higher-order functions lies in ",(0,s.kt)("em",{parentName:"p"},"partial evaluation"),", where we can use higher-order functions to further derive other functions (and possibly higher-order functions, themselves). It is fine for, in the case of finding the sum of a single list ",(0,s.kt)("inlineCode",{parentName:"p"},"L"),", to simply evaluate ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr (op+) 0 L"),", but in the general case it is a strength that we can bind the function ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr (op+) 0")," to the name ",(0,s.kt)("inlineCode",{parentName:"p"},"sum"),". This comes in handy especially if we want to sum over ",(0,s.kt)("em",{parentName:"p"},"many")," lists, so that we don't continuously have to compute the result of ",(0,s.kt)("inlineCode",{parentName:"p"},"foldr (op+) 0")," (though it has negligible computational cost, admittedly)."),(0,s.kt)("p",null,"Seen in this way, it is as if higher-order functions are at the root of a large ",(0,s.kt)("em",{parentName:"p"},"tree")," of potential functions, where each node in the tree is an increasingly-specialized function, until we arrive at some specific use case. This makes higher-order functions ",(0,s.kt)("em",{parentName:"p"},"modular"),', as we can simply "mix-and-match" the arguments to HOFs such as ',(0,s.kt)("inlineCode",{parentName:"p"},"map")," or ",(0,s.kt)("inlineCode",{parentName:"p"},"fold")," until we arrive at the specific tools that we need."),(0,s.kt)("p",null,'This is only an example of the way that abstraction and modularity grant us strength in programming. Through abstracting away even the specific operations that programs carry out, we can "capture" a large amount of potential functions that we may write.'))}c.isMDXComponent=!0}}]);