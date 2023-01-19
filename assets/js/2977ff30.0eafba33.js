"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[8337],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=p(n),d=a,h=c["".concat(s,".").concat(d)]||c[d]||m[d]||i;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},7331:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_position:2},o="Auxiliary Library",l={unversionedId:"libs/aux-lib",id:"libs/aux-lib",title:"Auxiliary Library",description:"By Jacob Neumann, June 2021",source:"@site/docs/libs/aux-lib.md",sourceDirName:"libs",slug:"/libs/aux-lib",permalink:"/book/docs/libs/aux-lib",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"defaultSidebar",previous:{title:"SML/NJ Basis",permalink:"/book/docs/libs/basis"},next:{title:"Common Errors",permalink:"/book/docs/debugging/errors"}},s={},p=[{value:"Trees",id:"trees",level:2},{value:"Timing",id:"timing",level:2},{value:"Permute",id:"permute",level:2},{value:"CPS Iterate",id:"cps-iterate",level:2},{value:"Language",id:"language",level:2},{value:"Regular Expressions",id:"regular-expressions",level:2},{value:"Sets",id:"sets",level:2}],u={toc:p};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"auxiliary-library"},"Auxiliary Library"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"By Jacob Neumann, June 2021")),(0,a.kt)("p",null,"This page collects the documentation of the ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library"},"Auxiliary Library"),". The purpose of this library & its documentation is to serve as sample code, proofs, and worked examples for students learning functional programming and/or SML for the first time. Accordingly, this documentation also includes explicit mathematical definitions, proofs by induction, asymptotic analyses, and evaluation traces, as appropriate."),(0,a.kt)("p",null,"Unless otherwise stated, the documentation assumes SMLNJ v110.99. Some features (e.g. modifications of the pretty printer) might not work in other versions of SMLNJ."),(0,a.kt)("p",null,'All the documents & code here should be considered "work-in-progress". If you spot an error in either, you can report it ',(0,a.kt)("a",{parentName:"p",href:"https://forms.gle/yuyc17oBnT4JvG5h9"},"here"),"."),(0,a.kt)("h2",{id:"trees"},"Trees"),(0,a.kt)("p",null,"Provides polymorphic binary trees in a structure ",(0,a.kt)("inlineCode",{parentName:"p"},"Tree"),", with a couple basic methods for working with them."),(0,a.kt)("p",null,"In particular, this includes the functions ",(0,a.kt)("inlineCode",{parentName:"p"},"inord")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"foldr"),", which are used in the ",(0,a.kt)("inlineCode",{parentName:"p"},"OrdTreeSet")," functor (see ",(0,a.kt)("strong",{parentName:"p"},"Sets")," below) and critical to the associated representation independence result."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/Tree.sml"},"Code")),(0,a.kt)("h2",{id:"timing"},"Timing"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Timing")," module includes types for encoding years, months, days, times, time zones, etc., as well as numerous utilities for working with them. This module primarily serves as an extended example of how to use custom SML ",(0,a.kt)("inlineCode",{parentName:"p"},"datatypes")," to encode data, and how to take advantage of pattern matching to write elegant code. This module includes some imperative features (achieved utilizing basis modules unique to SMLNJ), such as stopwatches, countdown timers, and functions which obtain the current time."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/Timing.sml"},"Code")),(0,a.kt)("h2",{id:"permute"},"Permute"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Permute")," module contains utilities for permutating and sorting lists. The functions in this module are polymorphic, and some of the sorting functions furthermore serve as examples of ",(0,a.kt)("em",{parentName:"p"},"currying"),"."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library/blob/main/documentation/permute.pdf"},"Documentation")," -- ",(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/Permute.sml"},"Code")),(0,a.kt)("h2",{id:"cps-iterate"},"CPS Iterate"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"CPSIterate")," module allows for imperative-programming-esque loops, but defined entirely functionally and entirely in continuation passing style."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library/blob/main/documentation/cpsIterate.pdf"},"Documentation")," -- ",(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/CPSIterate.sml"},"Code")),(0,a.kt)("h2",{id:"language"},"Language"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Language"),' module provides combinators for working with "languages": lists of values of some equality type ',(0,a.kt)("inlineCode",{parentName:"p"},"Sigma"),". Connects to some of the classic theory of computation, as well as providing sufficient combinators to capture a fragment of the logic of regular expressions. Good showcase of Higher-Order Functions & Combinators."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library/blob/main/documentation/language.pdf"},"Documentation")," -- ",(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/Language.sml"},"Code")),(0,a.kt)("h2",{id:"regular-expressions"},"Regular Expressions"),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Regexp"),' module implements regular expressions in Standard ML. Parametrizes over an "alphabet" (equality) type ',(0,a.kt)("inlineCode",{parentName:"p"},"Sigma"),", and implements a type ",(0,a.kt)("inlineCode",{parentName:"p"},"''Sigma regexp")," with a CPS/Exn-control-flow function ",(0,a.kt)("inlineCode",{parentName:"p"},"match")," which performs regular expression matching. Includes a method for obtaining the ",(0,a.kt)("em",{parentName:"p"},"language")," of a regular expression, implemented using the ",(0,a.kt)("inlineCode",{parentName:"p"},"Language")," module (above)."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Requires:")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Language.sml")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library/blob/main/documentation/regexp.pdf"},"Documentation")," -- ",(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/Regexp.sml"},"Code")),(0,a.kt)("h2",{id:"sets"},"Sets"),(0,a.kt)("p",null,"An implementation of sets in Standard ML. Includes ",(0,a.kt)("inlineCode",{parentName:"p"},"EQ")," & ",(0,a.kt)("inlineCode",{parentName:"p"},"ORD")," typeclasses, the ",(0,a.kt)("inlineCode",{parentName:"p"},"SET")," signature, and three implementations: ",(0,a.kt)("inlineCode",{parentName:"p"},"ListSet")," (sets are unordered, duplicate free lists), ",(0,a.kt)("inlineCode",{parentName:"p"},"OrdListSet")," (sorted, duplicate-free lists), and ",(0,a.kt)("inlineCode",{parentName:"p"},"OrdTreeSet")," (sorted, duplicate-free trees). The latter two are equivalent (as proven by a representation independence proof), but the superior time bounds of ",(0,a.kt)("inlineCode",{parentName:"p"},"OrdTreeSet")," are not realized unless we can maintain a balance invariant -- providing motivation for ",(0,a.kt)("em",{parentName:"p"},"red-black trees"),"."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Requires:")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Tree.sml")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/SET.sig"},"sig")," -- ",(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/smlhelp/aux-library/main/Set.sml"},"struct")))}m.isMDXComponent=!0}}]);