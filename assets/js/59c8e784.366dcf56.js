"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[782],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),s=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,c=p(e,["components","mdxType","originalType","parentName"]),u=s(n),d=i,k=u["".concat(l,".").concat(d)]||u[d]||m[d]||r;return n?a.createElement(k,o(o({ref:t},c),{},{components:n})):a.createElement(k,o({ref:t},c))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:i,o[1]=p;for(var s=2;s<r;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},7397:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>r,metadata:()=>p,toc:()=>s});var a=n(7462),i=(n(7294),n(3905));const r={sidebar_position:3},o="Pattern Matching",p={unversionedId:"concepts/basic/patternmatch",id:"concepts/basic/patternmatch",title:"Pattern Matching",description:"By Kaz Zhou, September 2020. Revised May 2021",source:"@site/docs/concepts/basic/patternmatch.md",sourceDirName:"concepts/basic",slug:"/concepts/basic/patternmatch",permalink:"/book/docs/concepts/basic/patternmatch",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"Extensional Equivalence",permalink:"/book/docs/concepts/basic/eeq"},next:{title:"Recursion and Induction",permalink:"/book/docs/concepts/recursion/"}},l={},s=[{value:"Function declarations",id:"function-declarations",level:2},{value:"Lambda expressions",id:"lambda-expressions",level:2},{value:"Case expressions",id:"case-expressions",level:2}],c={toc:s};function m(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"pattern-matching"},"Pattern Matching"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"By Kaz Zhou, September 2020"),". ",(0,i.kt)("em",{parentName:"p"},"Revised May 2021")),(0,i.kt)("p",null,"Patterns take on many appearances, such as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Constants: ",(0,i.kt)("inlineCode",{parentName:"li"},"150")),(0,i.kt)("li",{parentName:"ul"},"Variables: ",(0,i.kt)("inlineCode",{parentName:"li"},"x")),(0,i.kt)("li",{parentName:"ul"},"Wildcard: ",(0,i.kt)("inlineCode",{parentName:"li"},"_")),(0,i.kt)("li",{parentName:"ul"},"Tuples: ",(0,i.kt)("inlineCode",{parentName:"li"},"(true, _)")),(0,i.kt)("li",{parentName:"ul"},"Constructors (which may contain other patterns):",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"Lists: ",(0,i.kt)("inlineCode",{parentName:"li"},"x::xs")),(0,i.kt)("li",{parentName:"ul"},"Other datatypes: ",(0,i.kt)("inlineCode",{parentName:"li"},"Node(L,x,R)"))))),(0,i.kt)("p",null,"Patterns can be matched against values to form bindings. Consider the following declaration:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"val (x,y) = (1,2)\n")),(0,i.kt)("p",null,"The result is that ",(0,i.kt)("inlineCode",{parentName:"p"},"1")," gets bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"2")," gets bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"y"),"."),(0,i.kt)("p",null,"Pattern matching may fail. For example, the following raises exception ",(0,i.kt)("inlineCode",{parentName:"p"},"Bind"),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"val 10 = 9\n")),(0,i.kt)("p",null,"Besides ",(0,i.kt)("inlineCode",{parentName:"p"},"val")," declarations, pattern matching is also used in function declarations, lambda expressions, and case expressions."),(0,i.kt)("h2",{id:"function-declarations"},"Function declarations"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun fact 0 = 1\n  | fact n = n * fact(n-1)\n")),(0,i.kt)("p",null,"The function ",(0,i.kt)("inlineCode",{parentName:"p"},"fact")," is given an ",(0,i.kt)("inlineCode",{parentName:"p"},"int")," as input. If the input successfully matches the pattern ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),", then the function returns ",(0,i.kt)("inlineCode",{parentName:"p"},"1"),". Otherwise, the input is matched with the pattern ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),", binding the input to ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),". For example, if we evaluate ",(0,i.kt)("inlineCode",{parentName:"p"},"fact 5"),", then ",(0,i.kt)("inlineCode",{parentName:"p"},"5")," is bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),", so the expression becomes ",(0,i.kt)("inlineCode",{parentName:"p"},"5 * fact(4)"),"."),(0,i.kt)("p",null,"Each clause of the function declaration tells ",(0,i.kt)("inlineCode",{parentName:"p"},"fact")," what it should do, depending on the input. The bar, ",(0,i.kt)("inlineCode",{parentName:"p"},"|"),", acts as a separator between the two clauses."),(0,i.kt)("p",null,"Note that it's important for your patterns to be ",(0,i.kt)("em",{parentName:"p"},"exhaustive"),". The above function is fine, because all values of type ",(0,i.kt)("inlineCode",{parentName:"p"},"int")," can match with either ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),". However, suppose we had the following function:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun fiction 1 = 1\n  | fiction 2 = 2\n  | fiction 3 = 6\n")),(0,i.kt)("p",null,"There are many inputs which do not match with either ",(0,i.kt)("inlineCode",{parentName:"p"},"1"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"2"),", or ",(0,i.kt)("inlineCode",{parentName:"p"},"3"),". For example, ",(0,i.kt)("inlineCode",{parentName:"p"},"fiction 4")," would raise exception ",(0,i.kt)("inlineCode",{parentName:"p"},"Match"),"."),(0,i.kt)("p",null,"A more subtle bug is when patterns are redundant. The following example has the clauses of ",(0,i.kt)("inlineCode",{parentName:"p"},"fact")," swapped."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun factloop n = n * factloop(n-1)\n  | factloop 0 = 1\n")),(0,i.kt)("p",null,"The second clause of ",(0,i.kt)("inlineCode",{parentName:"p"},"factloop")," never gets executed! When evaluating ",(0,i.kt)("inlineCode",{parentName:"p"},"factloop 0"),", SML will try to match ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," to each pattern, ",(0,i.kt)("em",{parentName:"p"},"in order"),". Therefore, ",(0,i.kt)("inlineCode",{parentName:"p"},"factloop 0")," steps to ",(0,i.kt)("inlineCode",{parentName:"p"},"0 * factloop(-1)"),", because ",(0,i.kt)("inlineCode",{parentName:"p"},"0")," can match to ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),". Convince yourself that ",(0,i.kt)("inlineCode",{parentName:"p"},"factloop k")," will loop forever for any ",(0,i.kt)("inlineCode",{parentName:"p"},"k")," of type ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),"!"),(0,i.kt)("h2",{id:"lambda-expressions"},"Lambda expressions"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"(fn [] => false | x::xs => true) [1,2,3]\n")),(0,i.kt)("p",null,"The lambda expression is similar to a function, as it turns an input into an output. In the example above, ",(0,i.kt)("inlineCode",{parentName:"p"},"[1,2,3]")," is the input. It doesn't match with ",(0,i.kt)("inlineCode",{parentName:"p"},"[]"),", but it does match with ",(0,i.kt)("inlineCode",{parentName:"p"},"x::xs"),". Namely, ",(0,i.kt)("inlineCode",{parentName:"p"},"1")," gets bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),", and the list ",(0,i.kt)("inlineCode",{parentName:"p"},"[2,3]")," gets bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"xs"),". As a result of this successful pattern matching, the lambda expression returns ",(0,i.kt)("inlineCode",{parentName:"p"},"true"),"."),(0,i.kt)("p",null,"You should still make sure your patterns are exhaustive. For example, the following expression raises exception ",(0,i.kt)("inlineCode",{parentName:"p"},"Match"),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"(fn [] => false) [1,2,3]\n")),(0,i.kt)("h2",{id:"case-expressions"},"Case expressions"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun fact' x =\n    case x of\n        0 => 1\n      | n => n * fact' (n-1)\n")),(0,i.kt)("p",null,"First, note that ",(0,i.kt)("inlineCode",{parentName:"p"},"fact'")," does the same thing as ",(0,i.kt)("inlineCode",{parentName:"p"},"fact"),". However, it uses an extra ",(0,i.kt)("inlineCode",{parentName:"p"},"case")," expression."),(0,i.kt)("p",null,"Let's consider what happens when we evaluate ",(0,i.kt)("inlineCode",{parentName:"p"},"fact' 5"),". First, ",(0,i.kt)("inlineCode",{parentName:"p"},"5")," gets bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"x"),". Then, the ",(0,i.kt)("inlineCode",{parentName:"p"},"case")," expression tries to match ",(0,i.kt)("inlineCode",{parentName:"p"},"5")," to a pattern. In this scenario, ",(0,i.kt)("inlineCode",{parentName:"p"},"5")," successfully pattern matches with ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),", so ",(0,i.kt)("inlineCode",{parentName:"p"},"5")," gets bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"n"),". Therefore, ",(0,i.kt)("inlineCode",{parentName:"p"},"fact' 5")," evaluates to ",(0,i.kt)("inlineCode",{parentName:"p"},"5 * fact' 4"),"."),(0,i.kt)("p",null,"As usual, the patterns in ",(0,i.kt)("inlineCode",{parentName:"p"},"case")," expressions should be exhaustive."))}m.isMDXComponent=!0}}]);