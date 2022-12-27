"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[542],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=c(n),d=i,h=m["".concat(l,".").concat(d)]||m[d]||p[d]||r;return n?a.createElement(h,s(s({ref:t},u),{},{components:n})):a.createElement(h,s({ref:t},u))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,s=new Array(r);s[0]=m;var o={};for(var l in t)hasOwnProperty.call(t,l)&&(o[l]=t[l]);o.originalType=e,o.mdxType="string"==typeof e?e:i,s[1]=o;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2372:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:3},s="Common Tasks in SML",o={unversionedId:"start/common",id:"start/common",title:"Common Tasks in SML",description:"By Thea Brick, December 2021",source:"@site/docs/start/common.md",sourceDirName:"start",slug:"/start/common",permalink:"/book/docs/start/common",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"SML Syntax Cheatsheet",permalink:"/book/docs/start/syntax"},next:{title:"Types",permalink:"/book/docs/types/"}},l={},c=[{value:"Looping and Iterating",id:"looping-and-iterating",level:2},{value:"Searching",id:"searching",level:2},{value:"Runtime checks",id:"runtime-checks",level:2},{value:"Print-line Debugging",id:"print-line-debugging",level:2}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"common-tasks-in-sml"},"Common Tasks in SML"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"By Thea Brick, December 2021")),(0,i.kt)("h2",{id:"looping-and-iterating"},"Looping and Iterating"),(0,i.kt)("p",null,"Often times we want to iterate through each element in a list. The main way we want to implement this in SML is via recursion. We can define this at on an extremely abstract level as taking some base accumulator and combining it with an element to make a new accumulator."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"(* some base accumulator *)\nval acc = ...\n\n(* some function which takes an element of the list and\n * and a accumulator and outputs an updated accumulator\n *)\nfun combine (x, acc) = ...\n\nfun iterate ([]) = acc\n  | iterate (x::xs) =\n    let\n      val new_acc = iterate xs\n    in\n      combine (x, new_acc)\n    end\n")),(0,i.kt)("p",null,"To make this more concrete, we can imagine we are trying to sum an int list. The base accumulator would be what the sum of the empty list is. The combine function would be simply adding the element onto the accumulator."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"val acc : int = 0\n\nfun combine (x : int, acc : int) : int = x + acc\n\nfun iterate ([] : int list) : int = acc\n  | iterate (x::xs : int list) =\n    let\n      val new_acc = iterate xs\n    in\n      combine (x, new_acc)\n    end\n")),(0,i.kt)("p",null,"Now iterate will sum up a list for us. Generally we simply our functions a bit, so it might be more common to see something along the lines of:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun sum ([] : int list) : int = 0\n  | sum (x::xs : int list) : int = x + (sum xs)\n")),(0,i.kt)("p",null,"Observe that these are same, just we are removing the let expression and simplifying some things for the sake of readability."),(0,i.kt)("h2",{id:"searching"},"Searching"),(0,i.kt)("p",null,"Often times we may be given a list and we'd like to see if an element is in said list. In this case we want ",(0,i.kt)("inlineCode",{parentName:"p"},"search (L, y)"),"to evaluate to ",(0,i.kt)("inlineCode",{parentName:"p"},"true")," if ",(0,i.kt)("inlineCode",{parentName:"p"},"y")," is in ",(0,i.kt)("inlineCode",{parentName:"p"},"L")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"false")," otherwise. We can do this with this same idea of iteration."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun search ([] : int list, y : int) : bool = false\n  | search (x::xs : int list, y : int) : bool =\n    if x = y\n    then true (* we can stop iterating if we find the value *)\n    else search (xs, y)\n")),(0,i.kt)("p",null,"Alternatively we can write this as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun search ([] : int list, y : int) : bool = false\n  | search (x::xs : int list, y : int) : bool =\n    (x = y) orelse (search (xs, y))\n")),(0,i.kt)("p",null,"If we require that the list is sorted, then we can alter our function to stop looking through the list once we pass where ",(0,i.kt)("inlineCode",{parentName:"p"},"y")," should be:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun sortedSearch ([] : int list, y : int) : bool = false\n  | sortedSearch (x::xs : int list, y : int) : bool =\n    (x = y) orelse ((x < y) andalso (sortedSearch (xs, y)))\n")),(0,i.kt)("h2",{id:"runtime-checks"},"Runtime checks"),(0,i.kt)("p",null,"If we ever wanted to ensure that we have some property at runtime, we can write some thing of the following form:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},'val _ = (condition_that_should_be_true) orelse (raise Fail "Condition False!")\n')),(0,i.kt)("p",null,"So for instance, suppose we wanted to enforce that our sortedSearch function from before actually sorted int lists."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},'fun isSorted ([] : int list) : bool = true\n  | isSorted ([_]) = true\n  | isSorted (x::y::xs) = (x < y) andalso (isSorted (y::xs))\n\nfun sortedSearch (L, y) =\n  let\n    val _ = (isSorted L) orelse (raise Fail "Unsorted List!")\n    (* we define a recursive helper function so that the runtime check\n     * is only checked once rather than at every step. *)\n    fun helper ([] : int list) : bool = false\n      | helper (x::xs : int list) : bool =\n        (x = y) orelse ((x < y) andalso (helper xs))\n  in\n    helper L\n  end\n')),(0,i.kt)("p",null,"Importantly, we generally just assume that a function has an assumed property when passed into the function (and we don't care about inputs that don't satisfy this), so inserting runtime checks like these are mainly useful for debugging."),(0,i.kt)("h2",{id:"print-line-debugging"},"Print-line Debugging"),(0,i.kt)("p",null,"SMLNJ defines the function ",(0,i.kt)("inlineCode",{parentName:"p"},"print : string -> unit")," which outputs the passed string. We can use val declarations in let expressions to print out a message while we are computing some result:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},'let\n  ...\n  val () = print "some message"\n  ...\nin ... end\n')),(0,i.kt)("p",null,"In our search example, we can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"Int.toString : int -> string")," function to print every element we visit while we are searching:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun search ([] : int list, y : int) : bool = false\n  | search (x::xs : int list, y : int) : bool =\n    let\n      val () = print (Int.toString x)\n    in\n      (x = y) orelse (search (xs, y))\n    end\n")),(0,i.kt)("p",null,"Alternatively, we can use the sequencing operator ",(0,i.kt)("inlineCode",{parentName:"p"},";")," to put the prints in line."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun search ([] : int list, y : int) : bool = false\n  | search (x::xs : int list, y : int) : bool =\n    (print (Int.toString x); (x = y) orelse (search (xs, y)))\n")),(0,i.kt)("p",null,"It should be noted that ",(0,i.kt)("inlineCode",{parentName:"p"},";"),' often doesn\'t "play nice" with many things in SML, so it is best to enclose every sequence of expressions with parentheses as we did above.'))}p.isMDXComponent=!0}}]);