"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[6056],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>b});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=c(n),b=o,d=m["".concat(l,".").concat(b)]||m[b]||u[b]||i;return n?r.createElement(d,a(a({ref:t},p),{},{components:n})):r.createElement(d,a({ref:t},p))}));function b(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},7079:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(7462),o=(n(7294),n(3905));const i={sidebar_position:1},a="SML/NJ Basis",s={unversionedId:"libs/basis",id:"libs/basis",title:"SML/NJ Basis",description:"By Jacob Neumann, June 2021",source:"@site/docs/libs/basis.md",sourceDirName:"libs",slug:"/libs/basis",permalink:"/book/docs/libs/basis",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"defaultSidebar",previous:{title:"Option",permalink:"/book/docs/types/options"},next:{title:"Auxiliary Library",permalink:"/book/docs/libs/aux-lib"}},l={},c=[{value:"Fn",id:"fn",level:2}],p={toc:c};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"smlnj-basis"},"SML/NJ Basis"),(0,o.kt)("p",null,(0,o.kt)("em",{parentName:"p"},"By Jacob Neumann, June 2021")),(0,o.kt)("p",null,"This page collects some documentation of the SML Basis Library produced as part of the development of the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library"},"Auxiliary Library"),". The documents linked below provide documentation of some (but definitely not all) of the SML Basis modules. Unless otherwise stated, the documentation is of the version of the basis implemented in SMLNJ v110.99."),(0,o.kt)("p",null,"This documentation is meant as a more accessible alternate to the more ",(0,o.kt)("a",{parentName:"p",href:"https://smlfamily.github.io/Basis/index.html"},"official documentation"),". In places, it also includes explicit mathematical definitions, proofs by induction, asymptotic analyses, and evaluation traces."),(0,o.kt)("h2",{id:"fn"},"Fn"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"Fn")," module provides basic combinators, including some of the fundamental operations in lambda calculus. This includes the composition operator, ",(0,o.kt)("inlineCode",{parentName:"p"},"o"),", which is available at top-level."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/smlhelp/aux-library/blob/main/documentation/Fn.pdf"},"Documentation")))}u.isMDXComponent=!0}}]);