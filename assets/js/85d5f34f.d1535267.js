"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[6627],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),m=p(n),c=o,k=m["".concat(s,".").concat(c)]||m[c]||d[c]||l;return n?a.createElement(k,i(i({ref:t},u),{},{components:n})):a.createElement(k,i({ref:t},u))}));function c(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:o,i[1]=r;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4629:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>l,metadata:()=>r,toc:()=>p});var a=n(7462),o=(n(7294),n(3905));const l={sidebar_position:1},i="Bool",r={unversionedId:"types/bool",id:"types/bool",title:"Bool",description:"By Jacob Neumann, May 2020",source:"@site/docs/types/bool.md",sourceDirName:"types",slug:"/types/bool",permalink:"/book/docs/types/bool",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"defaultSidebar",previous:{title:"Types",permalink:"/book/docs/types/"},next:{title:"Int",permalink:"/book/docs/types/int"}},s={},p=[{value:"Values",id:"values",level:2},{value:"Production",id:"production",level:2},{value:"Elimination",id:"elimination",level:2},{value:"Combination",id:"combination",level:2},{value:"From the Structure",id:"from-the-structure",level:2},{value:"Questions to Consider",id:"questions-to-consider",level:2}],u={toc:p};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"bool"},"Bool"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"By Jacob Neumann, May 2020")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"bool")," is the SML type of booleans. The ",(0,o.kt)("inlineCode",{parentName:"p"},"bool"),' type supports the usual constructs of boolean logic and "conditionals" (',(0,o.kt)("inlineCode",{parentName:"p"},"if")," expressions). ",(0,o.kt)("inlineCode",{parentName:"p"},"bool")," is also the type produced when evaluating (in)equality between values of (suitable) types."),(0,o.kt)("h2",{id:"values"},"Values"),(0,o.kt)("p",null,"There are exactly two values of type ",(0,o.kt)("inlineCode",{parentName:"p"},"bool"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"datatype bool = true | false\n")),(0,o.kt)("p",null,"In addition to the constructs generally available in pattern matching (e.g. wildcards and identifier binding), booleans can be pattern-matched against using the constructors ",(0,o.kt)("inlineCode",{parentName:"p"},"true")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"fun firstOrSecond ((x : int,y : int), true):int = x\n  | firstOrSecond ((x,y), false) = y\n\nval 2 = firstOrSecond((3,2),false)\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"bool")," is pretty-printed by the ",(0,o.kt)("inlineCode",{parentName:"p"},"smlnj")," REPL, so the actual values will display. This is demonstrated by the following ",(0,o.kt)("inlineCode",{parentName:"p"},"smlnj")," REPL snippet."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"- val b = true orelse false;\nval b = true : bool\n")),(0,o.kt)("h2",{id:"production"},"Production"),(0,o.kt)("p",null,"Some common functions which produce booleans:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"(op =)  : ''a * ''a -> bool\n(op <>) : ''a * ''a -> bool  (* Inequality *)\n\n(* All of the following are overloaded and also work on values of type real *)\n(op <)  : int * int -> bool\n(op >)  : int * int -> bool\n(op <=) : int * int -> bool\n(op >=) : int * int -> bool\n")),(0,o.kt)("h2",{id:"elimination"},"Elimination"),(0,o.kt)("p",null,"The principal use of booleans is for evaluating one of two possible expressions, conditional on a value of type ",(0,o.kt)("inlineCode",{parentName:"p"},"bool"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"(* Evaluates to 5 *)\nval res1 = if true then 5 else 2\n\n(* Evaluates to 7 *)\nval res2 = if false then 3+3 else 7\n")),(0,o.kt)("p",null,"Note that the expression between ",(0,o.kt)("inlineCode",{parentName:"p"},"then")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"else"),' (the "then branch") has the same type as the expression after the ',(0,o.kt)("inlineCode",{parentName:"p"},"else"),' (the "else branch"). This is necessary: the SML typechecker does not evaluate expressions, and so does not "know" that, for instance, ',(0,o.kt)("inlineCode",{parentName:"p"},"if false then e1 else e2")," will always reduce to ",(0,o.kt)("inlineCode",{parentName:"p"},"e2"),". As far as the typechecker knows, ",(0,o.kt)("inlineCode",{parentName:"p"},"if false then e1 else e2")," could reduce to ",(0,o.kt)("inlineCode",{parentName:"p"},"e1"),". So, in order for the typechecker to be able to assign a type to the expression ",(0,o.kt)("inlineCode",{parentName:"p"},"if false then e1 else e2"),", it must be the case that ",(0,o.kt)("inlineCode",{parentName:"p"},"e1")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"e2")," have the same type. More formally,"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"[If-Then]"," An expression ",(0,o.kt)("inlineCode",{parentName:"p"},"if b then e1 else e2")," is well-typed (with type ",(0,o.kt)("inlineCode",{parentName:"p"},"t"),") if and only if ",(0,o.kt)("inlineCode",{parentName:"p"},"b : bool")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"e1 : t")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"e2 : t"),".")),(0,o.kt)("p",null,"It is worth noting that ",(0,o.kt)("inlineCode",{parentName:"p"},"if b then e1 else e2")," is equivalent to the following expression, written using SML's ",(0,o.kt)("inlineCode",{parentName:"p"},"case")," syntax."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"case b of\n  true => e1\n| false => e2\n")),(0,o.kt)("p",null,"Which is also equivalent to"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"(fn true => e1 | false => e2) b\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"NOTE:")," It's important to note that, in the evaluation of the expression ",(0,o.kt)("inlineCode",{parentName:"p"},"if true then e1 else e2"),", the expression ",(0,o.kt)("inlineCode",{parentName:"p"},"e2")," is ",(0,o.kt)("em",{parentName:"p"},"never")," evaluated (and, analogously, ",(0,o.kt)("inlineCode",{parentName:"p"},"e1")," never is evaluated in ",(0,o.kt)("inlineCode",{parentName:"p"},"if false then e1 else e2"),"). This is most evident when we look at the third syntax (with the lambda function): SML does not evaluate the body of a function ",(0,o.kt)("em",{parentName:"p"},"until the function is called"),". So when ",(0,o.kt)("inlineCode",{parentName:"p"},"(fn true => e1 | false => e2)")," gets applied to, say, ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", then the evaluation steps immediately to ",(0,o.kt)("inlineCode",{parentName:"p"},"e1"),", without ever evaluating ",(0,o.kt)("inlineCode",{parentName:"p"},"e2"),". This point is explored more in a question below."),(0,o.kt)("h2",{id:"combination"},"Combination"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"bool")," is an equality type, and may therefore be compared with ",(0,o.kt)("inlineCode",{parentName:"p"},"="),", producing another ",(0,o.kt)("inlineCode",{parentName:"p"},"bool"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"val true = (true = true)\nval false = (true = false)\nval false = (false <> false)\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"bool")," also comes equipped with the usual boolean operators,"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"val true = true andalso true   (* andalso keyword, logical and *)\nval true = false orelse true   (* orelse keyword, logical or *)\nval false = not true           (* not:bool -> bool, logical negation *)\n")),(0,o.kt)("p",null,"An important note about ",(0,o.kt)("inlineCode",{parentName:"p"},"andalso")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"orelse"),": the evaluation of ",(0,o.kt)("inlineCode",{parentName:"p"},"b1 andalso b2")," has a behavior known as ",(0,o.kt)("em",{parentName:"p"},"short-circuiting"),":",(0,o.kt)("sup",{parentName:"p",id:"fnref-1"},(0,o.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))," when evaluating this expression, SML will first attempt to evaluate ",(0,o.kt)("inlineCode",{parentName:"p"},"b1"),". If ",(0,o.kt)("inlineCode",{parentName:"p"},"b1")," raises an exception or loops behavior, then that will be the behavior of ",(0,o.kt)("inlineCode",{parentName:"p"},"b1 andalso b2")," as a whole. If ",(0,o.kt)("inlineCode",{parentName:"p"},"b1")," reduces down to the value ",(0,o.kt)("inlineCode",{parentName:"p"},"true"),", then SML will then attempt to evaluate ",(0,o.kt)("inlineCode",{parentName:"p"},"b2"),". However, if ",(0,o.kt)("inlineCode",{parentName:"p"},"b1")," evaluates to the value ",(0,o.kt)("inlineCode",{parentName:"p"},"false"),", then SML will ",(0,o.kt)("em",{parentName:"p"},"not evaluate ",(0,o.kt)("inlineCode",{parentName:"em"},"b2")),". This is exhibited in the following code snippet."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"(* loops forever on any input *)\nfun loop (x:int):bool = loop x\n\n(* Evaluates to the value false, and doesn't loop *)\nval false = false andalso (loop 3)\n")),(0,o.kt)("h2",{id:"from-the-structure"},"From the Structure"),(0,o.kt)("p",null,"The structure ",(0,o.kt)("inlineCode",{parentName:"p"},"Bool")," is bound as part of the SML Basis. In addition to what's already been mentioned, it includes the utility function"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"Bool.toString : bool -> string\n")),(0,o.kt)("p",null,"This is useful (for instance) for print-debugging the value of a ",(0,o.kt)("inlineCode",{parentName:"p"},"bool"),"-valued variable."),(0,o.kt)("h2",{id:"questions-to-consider"},"Questions to Consider"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Why are the following expressions ",(0,o.kt)("em",{parentName:"p"},"not")," equivalent?"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"(if b then e1 else e2)\n\n(fn (x,y) => if b then x else y) (e1,e2)\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Why are the following expressions ",(0,o.kt)("em",{parentName:"p"},"not")," equivalent?"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-sml"},"b1 andalso b2\n\n(fn (v1,v2) => v1 andalso v2) (b1,b2)\n")))),(0,o.kt)("div",{className:"footnotes"},(0,o.kt)("hr",{parentName:"div"}),(0,o.kt)("ol",{parentName:"div"},(0,o.kt)("li",{parentName:"ol",id:"fn-1"},"This is why ",(0,o.kt)("inlineCode",{parentName:"li"},"andalso")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"orelse")," are designated as ",(0,o.kt)("em",{parentName:"li"},"keywords")," above: they are ",(0,o.kt)("em",{parentName:"li"},"not")," infixed functions of type ",(0,o.kt)("inlineCode",{parentName:"li"},"bool*bool->bool"),'. Functions cannot exhibit this kind of "shortcircuiting" (evaluating one of their arguments and then deciding whether to evaluate the other): the integer addition ',(0,o.kt)("inlineCode",{parentName:"li"},"(op +) : int*int -> int")," must have both of its arguments fully evaluated before proceeding to add them. The keywords ",(0,o.kt)("inlineCode",{parentName:"li"},"andalso")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"orelse")," must be built-in to the SML evaluator to achieve shortcircuiting.",(0,o.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}d.isMDXComponent=!0}}]);