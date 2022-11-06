"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[789],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),p=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=p(e.components);return a.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),u=p(n),f=r,b=u["".concat(c,".").concat(f)]||u[f]||m[f]||o;return n?a.createElement(b,i(i({ref:t},l),{},{components:n})):a.createElement(b,i({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2744:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:1},i="Basics",s={unversionedId:"concepts/basic/README",id:"concepts/basic/README",title:"Basics",description:"Standard ML is a functional programming language, meaning that we eschew the use of side effects and state changes to obtain programs that are easy to reason about, analogous to reasoning about mathematical expressions. Similarly to mathematics, we perform operations and view computation as a process of simplification (or reduction, as we will more commonly name it). Seen in this way, computation becomes an elaborate series of expression evaluations, and it is this concept that will permeate the course. In these notes, we will go further in detail about the basic concepts of SML.",source:"@site/docs/concepts/basic/README.md",sourceDirName:"concepts/basic",slug:"/concepts/basic/",permalink:"/book/docs/concepts/basic/",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"defaultSidebar",previous:{title:"Debugging Hints and Strategies",permalink:"/book/docs/debugging/hints"},next:{title:"Evaluation",permalink:"/book/docs/concepts/basic/eval"}},c={},p=[],l={toc:p};function m(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"basics"},"Basics"),(0,r.kt)("p",null,"Standard ML is a ",(0,r.kt)("em",{parentName:"p"},"functional")," programming language, meaning that we eschew the use of ",(0,r.kt)("em",{parentName:"p"},"side effects")," and ",(0,r.kt)("em",{parentName:"p"},"state changes")," to obtain programs that are easy to reason about, analogous to reasoning about mathematical expressions. Similarly to mathematics, we perform operations and view computation as a process of ",(0,r.kt)("em",{parentName:"p"},"simplification")," (or ",(0,r.kt)("em",{parentName:"p"},"reduction"),", as we will more commonly name it). Seen in this way, computation becomes an elaborate series of expression evaluations, and it is this concept that will permeate the course. In these notes, we will go further in detail about the basic concepts of SML."))}m.isMDXComponent=!0}}]);