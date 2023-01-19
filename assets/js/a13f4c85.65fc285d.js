"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[3397],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>c});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},m=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,m=r(e,["components","mdxType","originalType","parentName"]),d=s(n),c=i,k=d["".concat(l,".").concat(c)]||d[c]||u[c]||o;return n?a.createElement(k,p(p({ref:t},m),{},{components:n})):a.createElement(k,p({ref:t},m))}));function c(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,p=new Array(o);p[0]=d;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=e,r.mdxType="string"==typeof e?e:i,p[1]=r;for(var s=2;s<o;s++)p[s]=n[s];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},3937:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>p,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>s});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_position:7},p="Option",r={unversionedId:"types/options",id:"types/options",title:"Option",description:"By Jacob Neumann, June 2021",source:"@site/docs/types/options.md",sourceDirName:"types",slug:"/types/options",permalink:"/book/docs/types/options",draft:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"defaultSidebar",previous:{title:"List",permalink:"/book/docs/types/list"},next:{title:"SML/NJ Basis",permalink:"/book/docs/libs/basis"}},l={},s=[{value:"Values",id:"values",level:2},{value:"Production",id:"production",level:2},{value:"Elimination",id:"elimination",level:2},{value:"From the Structure",id:"from-the-structure",level:2},{value:"Basic Functions",id:"basic-functions",level:3},{value:"&quot;Options-as-containers&quot; HOFs",id:"options-as-containers-hofs",level:3},{value:"&quot;Options-as-partiality&quot; HOFs",id:"options-as-partiality-hofs",level:3}],m={toc:s};function u(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"option"},"Option"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"By Jacob Neumann, June 2021")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"option")," is a SML datatype for handling potential undefined values. Formally, the option type is parametrized by a single polymorphic type variable, so for every SML type ",(0,i.kt)("inlineCode",{parentName:"p"},"t"),", there is a type ",(0,i.kt)("inlineCode",{parentName:"p"},"t option"),"."),(0,i.kt)("p",null,"The type ",(0,i.kt)("inlineCode",{parentName:"p"},"t option"),' represents the construction of "either a value of ',(0,i.kt)("inlineCode",{parentName:"p"},"t"),', or nothing". For instance, a value of type ',(0,i.kt)("inlineCode",{parentName:"p"},"bool option")," is either true, false, or neither. A value of type ",(0,i.kt)("inlineCode",{parentName:"p"},"int option")," is either some integer, or none. A function will return ",(0,i.kt)("inlineCode",{parentName:"p"},"t option")," to represent the possibility that no acceptable value of type ",(0,i.kt)("inlineCode",{parentName:"p"},"t"),' can be identified to return, and have a value to return to signal this circumstance. See the "Options-as-partiality" HOFs section below for some functions elaborating on this understanding of options.'),(0,i.kt)("p",null,'Options also function as a kind of "container": a value ',(0,i.kt)("inlineCode",{parentName:"p"},"x : t option"),' either "contains" a value of type ',(0,i.kt)("inlineCode",{parentName:"p"},"t")," (",(0,i.kt)("inlineCode",{parentName:"p"},"x = SOME(z)"),') or is an "empty container" with no values (',(0,i.kt)("inlineCode",{parentName:"p"},"x = NONE"),"). We can therefore view ",(0,i.kt)("inlineCode",{parentName:"p"},"t option")," as a degenerate version of ",(0,i.kt)("inlineCode",{parentName:"p"},"t list"),', where the "list" is constrained to be length at most one. The notion of a "container" is made precise in functional programming with the idea of a "monad". In Haskell (which makes much more explicit use of monads), options are known as the "Maybe monad".'),(0,i.kt)("h2",{id:"values"},"Values"),(0,i.kt)("p",null,"The type ",(0,i.kt)("inlineCode",{parentName:"p"},"t option")," has exactly one more value than the type ",(0,i.kt)("inlineCode",{parentName:"p"},"t")," itself. Formally,"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"datatype 'a option = NONE | SOME of 'a\n")),(0,i.kt)("p",null,"So for each value ",(0,i.kt)("inlineCode",{parentName:"p"},"v : t"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME(v) : t option"),". And ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE")," is a value of type ",(0,i.kt)("inlineCode",{parentName:"p"},"t option")," for each type ",(0,i.kt)("inlineCode",{parentName:"p"},"t"),", as required by the surrounding context. Options can be nested, e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME(SOME(3)) : int option option"),"."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"SOME")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE")," are the two constructors of the ",(0,i.kt)("inlineCode",{parentName:"p"},"t option")," type, so, in addition to the constructs generally available in pattern matching (e.g. wildcards and identifier binding), we can pattern match against ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun defaultToThree (NONE : int option):int = 3\n  | defaultToThree (SOME x) = x\n\nval 2 = defaultToThree(SOME 2)\nval 3 = defaultToThree(NONE)\n\nfun searchForEven [] = NONE\n  | searchForEven (x::xs) = if (x mod 2)=0 then SOME(x) else searchForEven xs\n\nval (SOME _) = searchForEven [1,2,3,4]\nval NONE = searchForEven [1,3,5]\n")),(0,i.kt)("p",null,"If ",(0,i.kt)("inlineCode",{parentName:"p"},"t")," is pretty-printed by the ",(0,i.kt)("inlineCode",{parentName:"p"},"smlnj")," REPL (like ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),",",(0,i.kt)("inlineCode",{parentName:"p"},"bool"),",",(0,i.kt)("inlineCode",{parentName:"p"},"string list"),", etc.), so too is ",(0,i.kt)("inlineCode",{parentName:"p"},"t option"),". This is demonstrated by the following ",(0,i.kt)("inlineCode",{parentName:"p"},"smlnj")," REPL snippet."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"- val k = SOME(SOME 5);\nval k = SOME (SOME 5) : int option option\n")),(0,i.kt)("h2",{id:"production"},"Production"),(0,i.kt)("p",null,"There are some basic SML functions which produce ",(0,i.kt)("inlineCode",{parentName:"p"},"option"),"s:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Int.fromString : string -> int option\nBool.fromString : string -> bool option\n")),(0,i.kt)("p",null,"Both of these functions are partial inverses to their respective ",(0,i.kt)("inlineCode",{parentName:"p"},"toString")," functions (e.g. ",(0,i.kt)("inlineCode",{parentName:"p"},"Int.fromString(Int.toString(7)) == SOME 7"),"), but return an option so they can return ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE")," on strings which do not encode an ",(0,i.kt)("inlineCode",{parentName:"p"},"int")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"bool"),", respectively."),(0,i.kt)("h2",{id:"elimination"},"Elimination"),(0,i.kt)("p",null,"Another option for casing on options is the function (provided in the ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," structure - see below)"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.getOpt : 'a option * 'a -> 'a\n")),(0,i.kt)("p",null,"which behaves as follows: ",(0,i.kt)("inlineCode",{parentName:"p"},"Option.getOpt(SOME x,y)")," will evaluate to ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"Option.getOpt(NONE,y)")," will evaluate to ",(0,i.kt)("inlineCode",{parentName:"p"},"y"),'. When writing functions operating on options, it is still generally preferable that you use clausal pattern matching to break into the "',(0,i.kt)("inlineCode",{parentName:"p"},"SOME"),' case" and "',(0,i.kt)("inlineCode",{parentName:"p"},"NONE"),' case", but there are situations where ',(0,i.kt)("inlineCode",{parentName:"p"},"Option.getOpt")," is an elegant solution."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),' structure also provides the "join" function'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.join : 'a option option -> 'a option\n")),(0,i.kt)("p",null,"which sends ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME(X)")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"X")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE")," to ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE"),"."),(0,i.kt)("h2",{id:"from-the-structure"},"From the Structure"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," structure (part of the SMLNJ basis) provides a number of useful utilities for working with ",(0,i.kt)("inlineCode",{parentName:"p"},"option"),"s."),(0,i.kt)("p",null,"In addition to the datatype ",(0,i.kt)("inlineCode",{parentName:"p"},"option")," itself being available at top-level, the exception"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"exception Option\n")),(0,i.kt)("p",null,"is available at top-level as well."),(0,i.kt)("h3",{id:"basic-functions"},"Basic Functions"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Option")," structure provides ",(0,i.kt)("inlineCode",{parentName:"p"},"bool"),"ean-valued functions for detecting whether a given option value is ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME"),", and for extracting values from ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.isSome : 'a option -> bool\nOption.isNone : 'a option -> bool\nOption.valOf : 'a option -> 'a\n")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Option.valOf NONE")," raises the exception ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),". ",(0,i.kt)("strong",{parentName:"p"},"NOTE:")," Do ",(0,i.kt)("em",{parentName:"p"},"not")," use these fuctions in place of pattern-matching on an option value. Expressions like ",(0,i.kt)("inlineCode",{parentName:"p"},"if Option.isSome(X) then Option.valOf(X) else e2")," are bad style."),(0,i.kt)("h3",{id:"options-as-containers-hofs"},'"Options-as-containers" HOFs'),(0,i.kt)("p",null,"Options are an instance of a more general structure in functional programming known as a ",(0,i.kt)("em",{parentName:"p"},"monad"),". Accordingly, there are a number of higher-order functions which we can define on options. In particular, ",(0,i.kt)("inlineCode",{parentName:"p"},"option")," comes equipped with a ",(0,i.kt)("em",{parentName:"p"},"map")," operation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.map : ('a -> 'b) -> 'a option -> 'b option\n")),(0,i.kt)("p",null,"which does what you might expect, given its type: ",(0,i.kt)("inlineCode",{parentName:"p"},"Option.map f (SOME x)")," evaluates to ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME(f(x))"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"Option.map f NONE")," produces ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE"),'. As usual with "map" functions, we generally require ',(0,i.kt)("inlineCode",{parentName:"p"},"f")," to be total."),(0,i.kt)("p",null,'Options, as a "container" of data, also admit a ',(0,i.kt)("em",{parentName:"p"},"filtering")," operation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.filter : ('a -> bool) -> 'a option -> 'a option\n")),(0,i.kt)("p",null,"Which is implemented as"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun filter p opt =\n  case opt of\n    NONE => NONE\n  | SOME x => if p x then SOME x else NONE\n")),(0,i.kt)("p",null,'i.e. it "filters" out the value ',(0,i.kt)("inlineCode",{parentName:"p"},"x")," if ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),' does not "satisfy" ',(0,i.kt)("inlineCode",{parentName:"p"},"p")," (",(0,i.kt)("inlineCode",{parentName:"p"},"p(x) == false"),'). As usual with "filter" functions, we generally require ',(0,i.kt)("inlineCode",{parentName:"p"},"p")," to be total."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),' structure also provides a utility for "folding" an option:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.fold : ('a * 'b -> 'b) -> 'b -> 'a option -> 'b\n")),(0,i.kt)("p",null,"which we might implement as"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun fold g z NONE = z\n  | fold g z (SOME x) = g(x,z)\n")),(0,i.kt)("p",null,"We often assume that ",(0,i.kt)("inlineCode",{parentName:"p"},"g")," is total. In certain situations, we also want the two arguments of ",(0,i.kt)("inlineCode",{parentName:"p"},"g")," to be the same type, and might assume that ",(0,i.kt)("inlineCode",{parentName:"p"},"g"),' is "associative" (in the sense that ',(0,i.kt)("inlineCode",{parentName:"p"},"g(x,g(y,z)) == g(g(x,y),z)")," for all ",(0,i.kt)("inlineCode",{parentName:"p"},"x,y,z"),") or that ",(0,i.kt)("inlineCode",{parentName:"p"},"z"),' is a "unit" for ',(0,i.kt)("inlineCode",{parentName:"p"},"g")," (i.e. ",(0,i.kt)("inlineCode",{parentName:"p"},"g(x,z) == x == g(z,x)")," for all ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),")."),(0,i.kt)("h3",{id:"options-as-partiality-hofs"},'"Options-as-partiality" HOFs'),(0,i.kt)("p",null,"As mentioned above, options provide a way to represent partial functions: a function ",(0,i.kt)("inlineCode",{parentName:"p"},"f : t1 -> t2 option")," can be thought of as a function which is defined on some inputs (",(0,i.kt)("inlineCode",{parentName:"p"},"f(x) == SOME(z)"),") and not on others (",(0,i.kt)("inlineCode",{parentName:"p"},"f(y) == NONE"),"). The ",(0,i.kt)("inlineCode",{parentName:"p"},"Option"),' structure provides several utilities consistent with this interpretation. First is composition of these "partial functions".'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.compose : ('a -> 'c) -> ('b -> 'a option) -> 'b -> 'c option\nOption.composePartial : ('a -> 'c option) -> ('b -> 'a option) -> 'b -> 'c option\n")),(0,i.kt)("p",null,"So ",(0,i.kt)("inlineCode",{parentName:"p"},"(Option.compose (g,f))(x)")," will return ",(0,i.kt)("inlineCode",{parentName:"p"},"NONE")," if ",(0,i.kt)("inlineCode",{parentName:"p"},"f(x) == NONE"),", and will return ",(0,i.kt)("inlineCode",{parentName:"p"},"SOME(g(y))")," if ",(0,i.kt)("inlineCode",{parentName:"p"},"f(x) == SOME(y)"),". ",(0,i.kt)("inlineCode",{parentName:"p"},"Option.composePartial")," will behave similarly, except it will return ",(0,i.kt)("inlineCode",{parentName:"p"},"g(y)")," in the ",(0,i.kt)("inlineCode",{parentName:"p"},"f(x) == SOME(y)")," case, since ",(0,i.kt)("inlineCode",{parentName:"p"},"g")," returns an option."),(0,i.kt)("p",null,'It also provides a "partial" version of its map function:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"Option.mapPartial : ('a -> 'b option) -> 'a option -> 'b option\n")))}u.isMDXComponent=!0}}]);