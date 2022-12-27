"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[839],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),d=a,g=m["".concat(l,".").concat(d)]||m[d]||u[d]||i;return n?r.createElement(g,o(o({ref:t},c),{},{components:n})):r.createElement(g,o({ref:t},c))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1785:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const i={sidebar_position:4},o="String",s={unversionedId:"types/string",id:"types/string",title:"String",description:"By Brandon Wu, May 2020",source:"@site/docs/types/string.md",sourceDirName:"types",slug:"/types/string",permalink:"/book/docs/types/string",draft:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"defaultSidebar",previous:{title:"Real",permalink:"/book/docs/types/real"},next:{title:"Functions",permalink:"/book/docs/types/function"}},l={},p=[{value:"Values",id:"values",level:2},{value:"Production",id:"production",level:2},{value:"Combination",id:"combination",level:2},{value:"From the Structure",id:"from-the-structure",level:2}],c={toc:p};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"string"},"String"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"By Brandon Wu, May 2020")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"string")," is the SML type of ordered collections of characters."),(0,a.kt)("h2",{id:"values"},"Values"),(0,a.kt)("p",null,"Any valid string literal is a value of type ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),". This means that examples such as ",(0,a.kt)("inlineCode",{parentName:"p"},'"functional"'),", ",(0,a.kt)("inlineCode",{parentName:"p"},'"15-150"'),", and ",(0,a.kt)("inlineCode",{parentName:"p"},'"\\n"')," are all valid strings, forming their own constant constructors that can thus be pattern matched upon."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sml"},'fun courseToNum ("15-150" : string) : int = 15150\n  | courseToNum ("15-151" : string) : int = 15151\n  | courseToNum ("15-122" : string) : int = 15122\n')),(0,a.kt)("h2",{id:"production"},"Production"),(0,a.kt)("p",null,"Numerous types have their own ",(0,a.kt)("inlineCode",{parentName:"p"},"toString")," functions that allow them to be easily converted to their string representations, including:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sml"},"Bool.toString : bool -> string\nInt.toString  : int -> string\nReal.toString : real -> string\n")),(0,a.kt)("h2",{id:"combination"},"Combination"),(0,a.kt)("p",null,"Strings can be combined by means of the ",(0,a.kt)("inlineCode",{parentName:"p"},"^"),' operator, or "concatenation". ',(0,a.kt)("inlineCode",{parentName:"p"},"^")," takes two strings and joins them together, without creating any spaces. As such, if neither string contains spaces, then the resulting string will be attached directly. Specifically, the result of an operation such as ",(0,a.kt)("inlineCode",{parentName:"p"},'"functional" ^ "programming"')," will be ",(0,a.kt)("inlineCode",{parentName:"p"},'"functionalprogramming"'),"."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sml"},"(op ^) : string * string -> string\n")),(0,a.kt)("h2",{id:"from-the-structure"},"From the Structure"),(0,a.kt)("p",null,"The structure ",(0,a.kt)("inlineCode",{parentName:"p"},"String")," is bound as part of the SML Basis. It contains several useful functions for dealing with strings, such as:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sml"},"String.explode : string -> char list\nString.implode : char list -> string\n")),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"String.explode")," takes a string and converts it to a list of its constituent characters, in order as they appear in the string. ",(0,a.kt)("inlineCode",{parentName:"p"},"String.implode")," is the opposite, taking in a list of characters and joining them to form a string. This means that:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sml"},'val [#"1", #"5", #"1", #"5", #"0"] = String.explode "15150"\nval "15150" = String.implode [#"1", #"5", #"1", #"5", #"0"]\n')),(0,a.kt)("p",null,"Note that the use of ",(0,a.kt)("inlineCode",{parentName:"p"},"#")," is to denote that each element of the list is a ",(0,a.kt)("inlineCode",{parentName:"p"},"char")," type, as opposed to a ",(0,a.kt)("inlineCode",{parentName:"p"},"string")," of length 1."))}u.isMDXComponent=!0}}]);