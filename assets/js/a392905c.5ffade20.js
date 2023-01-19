"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[3650],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),o=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},c=function(e){var t=o(e.components);return a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=o(n),m=r,k=d["".concat(u,".").concat(m)]||d[m]||p[m]||l;return n?a.createElement(k,s(s({ref:t},c),{},{components:n})):a.createElement(k,s({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,s=new Array(l);s[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var o=2;o<l;o++)s[o]=n[o];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2457:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>p,frontMatter:()=>l,metadata:()=>i,toc:()=>o});var a=n(7462),r=(n(7294),n(3905));const l={sidebar_position:3},s="SML Module Syntax Cheatsheet",i={unversionedId:"start/module-syntax",id:"start/module-syntax",title:"SML Module Syntax Cheatsheet",description:"By Thea Brick, January 2023",source:"@site/docs/start/module-syntax.md",sourceDirName:"start",slug:"/start/module-syntax",permalink:"/book/docs/start/module-syntax",draft:!1,tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"defaultSidebar",previous:{title:"SML Syntax Cheatsheet",permalink:"/book/docs/start/syntax"},next:{title:"Common Tasks in SML",permalink:"/book/docs/start/common"}},u={},o=[{value:"Signature",id:"signature",level:3},{value:"Specifications",id:"specifications",level:4},{value:"Structures",id:"structures",level:3},{value:"Functors",id:"functors",level:3},{value:"Functor Syntax Sugar",id:"functor-syntax-sugar",level:4},{value:"Transparent and Opaque Ascription",id:"transparent-and-opaque-ascription",level:3},{value:"<code>where</code> Syntax",id:"where-syntax",level:3}],c={toc:o};function p(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"sml-module-syntax-cheatsheet"},"SML Module Syntax Cheatsheet"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"By Thea Brick, January 2023")),(0,r.kt)("h3",{id:"signature"},"Signature"),(0,r.kt)("p",null,"Signatures contain specifications which dictate what declarations a structure\nascribing to said signature must make. A signature declaration appears as\nfollows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"signature YOUR_SIGNATURE_NAME =\nsig\n  (* zero or more specifications here *)\nend\n\nsignature ANOTHER_NAME = YOUR_SIGNATURE_NAME\n")),(0,r.kt)("p",null,"Signatures are generally use all capital letters."),(0,r.kt)("h4",{id:"specifications"},"Specifications"),(0,r.kt)("p",null,"The following may appear in a signature:"),(0,r.kt)("table",null,(0,r.kt)("tr",null,(0,r.kt)("th",null," Specification "),(0,r.kt)("th",null," Explanation ")),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"val x : int\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare a variable called ",(0,r.kt)("inlineCode",{parentName:"p"},"x")," with type ",(0,r.kt)("inlineCode",{parentName:"p"},"int"),"."))),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"val fact : int -> int\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare a variable called ",(0,r.kt)("inlineCode",{parentName:"p"},"fact")," with type ",(0,r.kt)("inlineCode",{parentName:"p"},"int -> int"),"."))),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"(* abstract type specification *)\ntype 'a t\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare a type ",(0,r.kt)("inlineCode",{parentName:"p"},"'a t"),". Called abstract because the structure\ndefines the implementation."))),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"(* concrete type specification *)\ntype 'a t = 'a list\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare a type ",(0,r.kt)("inlineCode",{parentName:"p"},"'a t")," that is ",(0,r.kt)("inlineCode",{parentName:"p"},"'a list"),". Called concrete because\nthe signature defines the implementation."))),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"datatype 'a tree = Empty\n                 | Node of 'a tree * 'a * 'a tree\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare ",(0,r.kt)("inlineCode",{parentName:"p"},"datatype 'a tree = Empty | Node of 'a tree * 'a * 'a tree"),"."))),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"exception Exn\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare an exception ",(0,r.kt)("inlineCode",{parentName:"p"},"Exn"),"."))),(0,r.kt)("tr",null,(0,r.kt)("td",null,(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"structure Str : SIG\n"))),(0,r.kt)("td",null,(0,r.kt)("p",null,"Structure must declare a structure ",(0,r.kt)("inlineCode",{parentName:"p"},"Str")," ascribing to ",(0,r.kt)("inlineCode",{parentName:"p"},"SIG"),".")))),(0,r.kt)("h3",{id:"structures"},"Structures"),(0,r.kt)("p",null,"A structure is a series declaration which ascribe (or match) the signature."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"structure YourStructure : YOUR_SIGNATURE =\nstruct\n  (* zero or more declarations matching YOUR_SIGNATURE *)\nend\n")),(0,r.kt)("p",null,"The structure must at least have every declaration specified in the signature,\nbut may contain more."),(0,r.kt)("p",null,"A structure may not contain ",(0,r.kt)("inlineCode",{parentName:"p"},"signature")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"functor")," declarations."),(0,r.kt)("p",null,"The following syntax allows SML to infer the signature to the structure based\non the declarations made:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"structure YourStructure =\nstruct\n  (* declarations matching YOUR_SIGNATURE *)\nend\n")),(0,r.kt)("h3",{id:"functors"},"Functors"),(0,r.kt)("p",null,"A functor takes a structure ascribing to a signature and outputs a new structure."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"functor YourFunctor(\n  (* zero or more specifications for the input structure *)\n) : YOUR_OUTPUT_SIG =\nstruct\n  (* declarations matching YOUR_OUTPUT_SIG *)\nend\n")),(0,r.kt)("p",null,"Here is an example of using this syntax:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"functor Combine(\n  val x : int\n  val fact : int -> ints\n  structure A : A_SIG\n  structure B : B_SIG\n) =\nstruct\n  (* omitted, x, fact, A, and B may be used in here *)\nend\n")),(0,r.kt)("h4",{id:"functor-syntax-sugar"},"Functor Syntax Sugar"),(0,r.kt)("p",null,"If a functor is taking in only one structure, the following syntax may be used:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"functor YourFunctor(YourStructure : YOUR_SIGNATURE) : YOUR_OUTPUT_SIG =\nstruct\n  (* declarations matching YOUR_OUTPUT_SIG, YourStructure may be used *)\nend\n")),(0,r.kt)("h3",{id:"transparent-and-opaque-ascription"},"Transparent and Opaque Ascription"),(0,r.kt)("p",null,"The symbol ",(0,r.kt)("inlineCode",{parentName:"p"},":")," describes transparent ascription. The symbol ",(0,r.kt)("inlineCode",{parentName:"p"},":>")," describes\nopaque ascription. Both ascriptions only allow things specified to be used.\nOpaque limits this further by not letting the implementation of abstract types\nto be used. Here is an example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"structure Example :> sig\n  type 'a t (* abstract *)\n  val isEmpty : 'a t -> bool\nend = struct\n  type 'a t = 'a list\n  val isEmpty = fn [] => true | _ => false\n  val test = 123\nend\n\n(* does not compile, but would if transparent ascription was used. *)\nval res = Example.isEmpty []\n\n(* will never compile *)\nval res2 = Example.test\n")),(0,r.kt)("h3",{id:"where-syntax"},(0,r.kt)("inlineCode",{parentName:"h3"},"where")," Syntax"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"where")," keyword allows for using opaque ascription while deliberately\nexposing specific abstract types. It appears after the signature where used."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sml"},"signature EXAMPLE =\nsig\n  type 'a t (* abstract *)\n  type 'a u\n  val isEmpty : 'a t -> bool\nend\nstructure Example :> EXAMPLE where type 'a t = 'a list = struct\n  type 'a t = 'a list\n  type 'a u = int\n  val isEmpty = fn [] => true | _ => false\nend\n\n(* this will compile now *)\nval res = Example.isEmpty []\n\n(* this will not compile *)\nval res2 : 'a Example.u = 123\n")))}p.isMDXComponent=!0}}]);