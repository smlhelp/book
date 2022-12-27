"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[63],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),f=l(n),d=a,m=f["".concat(c,".").concat(d)]||f[d]||u[d]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5876:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>s,toc:()=>l});var r=n(7462),a=(n(7294),n(3905));const o={sidebar_position:5},i="Higher Order Functions",s={unversionedId:"concepts/hof/README",id:"concepts/hof/README",title:"Higher Order Functions",description:"At this point, we've explored the concept of computation as evaluation, passing around values and reducing expressions to values as well. We have seen how we are allowed a great deal of versatility while maintaining type safety in SML's type system, and how we can construct arbitrary datatypes to be passed around as first class citizens, that is being able to be manipulated the same as any other value. We will now discuss what is considered one of the most powerful tools available in functional programming languages - that is, the exploitation of functions themselves as values, with which we can further parameterize our functions and results.",source:"@site/docs/concepts/hof/README.md",sourceDirName:"concepts/hof",slug:"/concepts/hof/",permalink:"/book/docs/concepts/hof/",draft:!1,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"defaultSidebar",previous:{title:"Parametric Polymorphism",permalink:"/book/docs/concepts/poly"},next:{title:"Currying and Staging",permalink:"/book/docs/concepts/hof/curry"}},c={},l=[],p={toc:l};function u(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"higher-order-functions"},"Higher Order Functions"),(0,a.kt)("p",null,"At this point, we've explored the concept of computation as ",(0,a.kt)("em",{parentName:"p"},"evaluation"),", passing around values and reducing expressions to values as well. We have seen how we are allowed a great deal of versatility while maintaining type safety in SML's type system, and how we can construct arbitrary datatypes to be passed around as ",(0,a.kt)("em",{parentName:"p"},"first class citizens"),", that is being able to be manipulated the same as any other value. We will now discuss what is considered one of the most powerful tools available in functional programming languages - that is, the exploitation of ",(0,a.kt)("em",{parentName:"p"},"functions themselves")," as values, with which we can further parameterize our functions and results."))}u.isMDXComponent=!0}}]);