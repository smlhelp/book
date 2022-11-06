"use strict";(self.webpackChunksmlhelp=self.webpackChunksmlhelp||[]).push([[926],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=i,d=u["".concat(l,".").concat(m)]||u[m]||h[m]||o;return n?a.createElement(d,r(r({ref:t},c),{},{components:n})):a.createElement(d,r({ref:t},c))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:i,r[1]=s;for(var p=2;p<o;p++)r[p]=n[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9754:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>s,toc:()=>p});var a=n(7462),i=(n(7294),n(3905));const o={sidebar_position:2},r="Exceptions",s={unversionedId:"concepts/control-flow/exn",id:"concepts/control-flow/exn",title:"Exceptions",description:"By Brandon Wu, June 2020. Revised June 2022",source:"@site/docs/concepts/control-flow/exn.md",sourceDirName:"concepts/control-flow",slug:"/concepts/control-flow/exn",permalink:"/book/docs/concepts/control-flow/exn",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"defaultSidebar",previous:{title:"Continuation Passing Style",permalink:"/book/docs/concepts/control-flow/cps"},next:{title:"Modules",permalink:"/book/docs/concepts/modules/"}},l={},p=[{value:"Built-In Exceptions",id:"built-in-exceptions",level:2},{value:"Fail",id:"fail",level:3},{value:"Div",id:"div",level:3},{value:"Match",id:"match",level:3},{value:"Examples",id:"examples",level:4},{value:"Bind",id:"bind",level:3},{value:"Examples",id:"examples-1",level:4},{value:"Defining Exceptions: Basic",id:"defining-exceptions-basic",level:2},{value:"Exceptional Control Flow",id:"exceptional-control-flow",level:2},{value:"Exception Handling Style",id:"exception-handling-style",level:2},{value:"Conclusions",id:"conclusions",level:2}],c={toc:p};function h(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"exceptions"},"Exceptions"),(0,i.kt)("p",null,(0,i.kt)("em",{parentName:"p"},"By Brandon Wu, June 2020. Revised June 2022")),(0,i.kt)("p",null,"So far, we have seen how we can manipulate the constructs of SML to create unique control flow behavior in the form of continuation passing style. In this section, we will discuss ",(0,i.kt)("em",{parentName:"p"},"exceptions"),", which are themselves a builtin feature of the language. With exceptions, we can cover cases where continuing to evaluate an expression does not make sense or is ill-defined at run-time."),(0,i.kt)("h2",{id:"built-in-exceptions"},"Built-In Exceptions"),(0,i.kt)("p",null,"We have seen how SML interprets computation as evaluation, and how we can reduce our entire notion of program execution to application of simple reduction rules. Sometimes, however, we run into cases where attempting to apply some rule results in an error, or in some output that we cannot actually express. In such cases, it is necessary to actually ",(0,i.kt)("em",{parentName:"p"},"halt")," evaluation with some manner of effect - this is the behavior that exceptions will introduce."),(0,i.kt)("p",null,"While we would like to be able to push as many of these errors as possible to compile time, it is not always the case that this is possible - this is usually when dealing with cases where computation is made infeasible by the ",(0,i.kt)("em",{parentName:"p"},"values")," that are bound to identifiers, which cannot be determined ",(0,i.kt)("em",{parentName:"p"},"a priori")," at compile time. As such, we have no way of telling beforehand if such errors will occur - forcing us to define some notion of a ",(0,i.kt)("em",{parentName:"p"},"run-time error"),"."),(0,i.kt)("p",null,"There are numerous examples of built-in SML exceptions, however, you will encounter some far more than others. The following is a brief overview of what they are, when you will encounter them, and how to deal with them."),(0,i.kt)("h3",{id:"fail"},"Fail"),(0,i.kt)("p",null,"Whether you knew it or not, you have certainly seen ",(0,i.kt)("inlineCode",{parentName:"p"},"Fail")," before! Whenever you have a homework problem where we give you an unimplemented function in the form ",(0,i.kt)("inlineCode",{parentName:"p"},'fun myFunction x = raise Fail "Unimplemented"')," you are using the power of exceptions! ",(0,i.kt)("inlineCode",{parentName:"p"},"Fail")," can be thought of as an all-purpose exception, nothing super special, but quite useful!"),(0,i.kt)("h3",{id:"div"},"Div"),(0,i.kt)("p",null,"This one is fairly straight-forward. ",(0,i.kt)("inlineCode",{parentName:"p"},"Div")," is raised whenever you do a division operation that is mathematically invalid such as ",(0,i.kt)("inlineCode",{parentName:"p"},"1 div 0"),"."),(0,i.kt)("h3",{id:"match"},"Match"),(0,i.kt)("p",null,"The match exception is raised whenever you have a case of nonexhaustive pattern matching. We ",(0,i.kt)("em",{parentName:"p"},"generally")," want our patterns to be exhaustive, meaning that no matter the input, it matches to one of the buckets established by our patterns. Consider the function ",(0,i.kt)("inlineCode",{parentName:"p"},"fn true => 1"),", which is plainly nonexhaustive, not covering the ",(0,i.kt)("inlineCode",{parentName:"p"},"false")," case. Nonetheless, it is a function of type ",(0,i.kt)("inlineCode",{parentName:"p"},"bool -> int")," that can be bound to an identifier. How, then, should we handle the case of attempting to evaluate ",(0,i.kt)("inlineCode",{parentName:"p"},"(fn true => 1) false"),"? This is a well-typed expression, causing it to fly under the radar of our compile-time tests. At run-time, then, we cannot evaluate this expression through function application - the function does not specify what it should return in this case! As such, we will simply raise a ",(0,i.kt)("inlineCode",{parentName:"p"},"Match")," exception, signifying that the function's input was not able to match to any particular clause of the function."),(0,i.kt)("h4",{id:"examples"},"Examples"),(0,i.kt)("p",null,"Lines that cause exceptions will be marked ",(0,i.kt)("inlineCode",{parentName:"p"},"(* ! *)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"fun f 1 = 5\n  | f 5 = 10\n\nval x = f 6 (* ! *)\n\nval y = case [] of x::xs => 17 (* ! *)\n")),(0,i.kt)("h3",{id:"bind"},"Bind"),(0,i.kt)("p",null,'Bind is similar to match, but crucially different. While Match is raised when you are unable to match with any clause, Bind is raised when you try to "force" a binding that cannot happen. An example of this would be ',(0,i.kt)("inlineCode",{parentName:"p"},"val 5 = 4"),". SML we see that you are trying to force the value ",(0,i.kt)("inlineCode",{parentName:"p"},"4")," to be assigned to the value ",(0,i.kt)("inlineCode",{parentName:"p"},"5")," which obviously cannot happen."),(0,i.kt)("p",null,"In pattern matching, while we are attempting to produce a binding in case expressions/function clauses, we aren't \"forcing\" any bindings. Instead, we are simply attempting to find a case that could match our expression (and we only bind to the pattern if we find a successful case). If we aren't able to find a case that works, we raise ",(0,i.kt)("inlineCode",{parentName:"p"},"Match")," to indicate that we tried to find a case that could match with our expression, but couldn't due to non-exhaustive casing."),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Bind")," on the other hand is caused when we don't even try to case to see whether a pattern works or not. Instead, we are saying that our expression ",(0,i.kt)("em",{parentName:"p"},"has")," to bind with some pattern. If that binding cannot happen, then ",(0,i.kt)("inlineCode",{parentName:"p"},"Bind")," is raised."),(0,i.kt)("h4",{id:"examples-1"},"Examples"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},'val () = 5\nval "polly" = "honk" (* could you imagine! :O *)\n')),(0,i.kt)("h2",{id:"defining-exceptions-basic"},"Defining Exceptions: Basic"),(0,i.kt)("p",null,"We have now seen the built-in exceptions that are automatically raised for certain prescribed use cases. Oftentimes, however, we are interested in our own specified use cases, meaning that we likely do not want to use the exceptions ",(0,i.kt)("inlineCode",{parentName:"p"},"Div"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"Match"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"Bind"),", which may be unrelated. In this case, we want to define our own exceptions."),(0,i.kt)("p",null,"The syntax for defining exceptions is as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"exception Error\n")),(0,i.kt)("p",null,"This introduces the constructor named Error, which corresponds to the identically named exception Error. Exception constructors are ",(0,i.kt)("em",{parentName:"p"},"first class"),", meaning that they are themselves values. The type of exception constructors is ",(0,i.kt)("inlineCode",{parentName:"p"},"exn"),", so this line really introduces the value ",(0,i.kt)("inlineCode",{parentName:"p"},"Error : exn"),". The type ",(0,i.kt)("inlineCode",{parentName:"p"},"exn"),' stands for "exception name", but it is also useful to think of it as standing for "extensible", since the type ',(0,i.kt)("inlineCode",{parentName:"p"},"exn")," is ",(0,i.kt)("em",{parentName:"p"},"extensible"),". This means that we can ",(0,i.kt)("em",{parentName:"p"},"extend")," the values that populate ",(0,i.kt)("inlineCode",{parentName:"p"},"exn")," with new constructors, like we did with ",(0,i.kt)("inlineCode",{parentName:"p"},"Error"),"."),(0,i.kt)("p",null,"The value ",(0,i.kt)("inlineCode",{parentName:"p"},"Error")," is not, by itself, an exception, however we can use it to raise exceptions with the ",(0,i.kt)("inlineCode",{parentName:"p"},"raise")," keyword. We can think of the ",(0,i.kt)("inlineCode",{parentName:"p"},"raise"),' keyword as being "like" a function of type ',(0,i.kt)("inlineCode",{parentName:"p"},"exn -> 'a"),', in that it "takes in" a value of type ',(0,i.kt)("inlineCode",{parentName:"p"},"exn")," and has type ",(0,i.kt)("inlineCode",{parentName:"p"},"'a"),". It is important to remember that ",(0,i.kt)("inlineCode",{parentName:"p"},"raise")," is ",(0,i.kt)("em",{parentName:"p"},"not")," a function really, though - it merely has similar behavior when used to raise exceptions, but it is not first class."),(0,i.kt)("p",null,'The polymorphic "return type" of the ',(0,i.kt)("inlineCode",{parentName:"p"},"raise")," keyword is so that raising exceptions can be compatible with our type system. Suppose we want to write a factorial function that, instead of looping forever on negative inputs, raises an exception."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"exception Negative\n\nfun fact' 0 = 1\n  | fact' n =\n      if n < 0 then raise Negative\n               else n * fact' (n-1)\n")),(0,i.kt)("p",null,"This code fragment should carry out our desired behavior. Consider the type of ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Negative")," - we would like to raise an exception, but we know that the expressions in both branches of an if then else expression must be the same type. In the positive case, this has type ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),", corresponding to just calculating the actual factorial. Therefore the negative case must also be ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),", though we also want to raise an exception. To be compatible with this, ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Negative")," must have type ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),"."),(0,i.kt)("p",null,"We would not like ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Negative")," to have type ",(0,i.kt)("inlineCode",{parentName:"p"},"int")," in ",(0,i.kt)("em",{parentName:"p"},"general"),", however - this depends on our use case! We want raising exceptions to be able to just ",(0,i.kt)("em",{parentName:"p"},"work"),", type-wise, since we know that it never returns a well-defined value anyways. As such, we define raising exceptions to have a ",(0,i.kt)("em",{parentName:"p"},"polymorphic")," return type, so that it fits within our type system correctly, no matter the use case. This is also the reason why we can write ",(0,i.kt)("inlineCode",{parentName:"p"},'raise Fail "Unimplemented"')," as the output of not-yet defined functions and still pass typechecking, no matter how complicated the function."),(0,i.kt)("h2",{id:"exceptional-control-flow"},"Exceptional Control Flow"),(0,i.kt)("p",null,'At this point, we have seen how exceptions let us implement a very limited form of "control flow", in that we can stop the flow of control entirely - upon encountering a raised exception, computation ceases. This is rather rudimentary in terms of expressiveness - we can only create programs that forcibly terminate! In this section, however, we will explore the usage of ',(0,i.kt)("inlineCode",{parentName:"p"},"handle"),", a keyword that allows us to have more sophisticated behavior with respect to programs deal with raised exceptions."),(0,i.kt)("blockquote",null,(0,i.kt)("p",{parentName:"blockquote"},(0,i.kt)("strong",{parentName:"p"},"[handle]")," For expressions ",(0,i.kt)("inlineCode",{parentName:"p"},"e : t"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"e1 : t")," ... ",(0,i.kt)("inlineCode",{parentName:"p"},"en : t"),", and different values ",(0,i.kt)("inlineCode",{parentName:"p"},"Exn1 : exn")," ... ",(0,i.kt)("inlineCode",{parentName:"p"},"ExnN : exn"),", if the expression ",(0,i.kt)("inlineCode",{parentName:"p"},"e")," raises the exception ",(0,i.kt)("inlineCode",{parentName:"p"},"ExnI"),", then the expression"),(0,i.kt)("pre",{parentName:"blockquote"},(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"e handle Exn2 => e1\n       | Exn2 => e3\n       ...\n       | ExnN => en\n")),(0,i.kt)("p",{parentName:"blockquote"},"reduces to ",(0,i.kt)("inlineCode",{parentName:"p"},"eI"),"."),(0,i.kt)("p",{parentName:"blockquote"},"In other words, the ",(0,i.kt)("inlineCode",{parentName:"p"},"handle")," keyword lets us case on the exception raised by an expression.")),(0,i.kt)("p",null,"It is important to note that all the expressions ",(0,i.kt)("inlineCode",{parentName:"p"},"e"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"e1"),", ... ",(0,i.kt)("inlineCode",{parentName:"p"},"en")," have to be of the same type. Consider what would happen if they were not:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},'e handle Div => "Oh no!"\n')),(0,i.kt)("p",null,"Let ",(0,i.kt)("inlineCode",{parentName:"p"},"e")," be an expression of type ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),". Suppose that, in this case, ",(0,i.kt)("inlineCode",{parentName:"p"},"e")," raises ",(0,i.kt)("inlineCode",{parentName:"p"},"Div"),", so ostensibly this expression should reduce to ",(0,i.kt)("inlineCode",{parentName:"p"},'"Oh no!"'),". However, what would happen if ",(0,i.kt)("inlineCode",{parentName:"p"},"Div")," was not raised? Then, we would have ",(0,i.kt)("inlineCode",{parentName:"p"},"e"),", which is of type ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),"."),(0,i.kt)("p",null,'We\'ve violated type safety here. We cannot "sometimes" have an expression be one type and another time have it be another. We must have ',(0,i.kt)("em",{parentName:"p"},"static type guarantees"),". As such, all the arms of a ",(0,i.kt)("inlineCode",{parentName:"p"},"handle")," must agree, and additionally they must agree with the type of the expression being handled."),(0,i.kt)("p",null,"We say that an exception that is raised can either propagate up to the ",(0,i.kt)("em",{parentName:"p"},"top level")," (in which case the program or expression simply results in an uncaught exception), or to the ",(0,i.kt)("em",{parentName:"p"},"nearest handler"),'. To clarify the meaning of "nearest", take the evaluation of the expression ',(0,i.kt)("inlineCode",{parentName:"p"},"(1 + (1 div 0)) * 3 handle Div => 5"),", for example. We see that ",(0,i.kt)("inlineCode",{parentName:"p"},"1 div 0")," raises the exception ",(0,i.kt)("inlineCode",{parentName:"p"},"Div"),", so the inner expression is extensionally equivalent to ",(0,i.kt)("inlineCode",{parentName:"p"},"(1 + raise Div) * 3"),". Then, applying this logic one more time, ",(0,i.kt)("inlineCode",{parentName:"p"},"1 + raise Div")," clearly should also raise ",(0,i.kt)("inlineCode",{parentName:"p"},"Div"),", so we get that it is extensionally equivalent to ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Div * 3"),", which is then extensionally equivalent to ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Div"),'. What we see is that this raised exception "propagates up" as it subsumes more and more expressions, until eventually it reaches a handler.'),(0,i.kt)("p",null,"While we now see how we can handle different kinds of exceptions, we might want to make a more educated choice about what our next action should be. It might be the case that we raise an exception in some failed branch of the program, but we want to have more information about exactly what happened, or what the program was doing at the time. We will now discuss ",(0,i.kt)("em",{parentName:"p"},"information-carrying exceptions"),", which are nothing other than an extension of our declarations of exceptions to being more akin to how we declare datatypes."),(0,i.kt)("p",null,"In a similar vein to how we can declare ",(0,i.kt)("inlineCode",{parentName:"p"},"datatype Foo = Bar of int")," to denote that a value of type ",(0,i.kt)("inlineCode",{parentName:"p"},"Foo")," is the constructor ",(0,i.kt)("inlineCode",{parentName:"p"},"Bar")," wrapping a value of type ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),", we can declare values of type ",(0,i.kt)("inlineCode",{parentName:"p"},"exn")," to also be constructors wrapping values. This takes the form:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"exception Crash of int\n")),(0,i.kt)("p",null,"which denotes that ",(0,i.kt)("inlineCode",{parentName:"p"},"Crash 1")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Crash 5"),", among others, are values of type ",(0,i.kt)("inlineCode",{parentName:"p"},"exn"),", and can thus be ",(0,i.kt)("inlineCode",{parentName:"p"},"raise"),"d. Note that ",(0,i.kt)("inlineCode",{parentName:"p"},"Crash")," thus has type ",(0,i.kt)("inlineCode",{parentName:"p"},"int -> exn"),"."),(0,i.kt)("p",null,'Concretely, we can "pattern match" on the data contained by the exception handler by doing something like the following:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"exception Return of int\n\nfun factException 0 = raise Return 1\n  | factException n = factException (n - 1) handle (Return res) => raise Return\n  (n * res)\n")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"NOTE:")," It is not clear why anyone would want to define ",(0,i.kt)("inlineCode",{parentName:"p"},"fact")," this way."),(0,i.kt)("p",null,"This example makes use of an exception, ",(0,i.kt)("inlineCode",{parentName:"p"},"Return : int -> exn"),", which wraps the return value of ",(0,i.kt)("inlineCode",{parentName:"p"},"fact"),". ",(0,i.kt)("inlineCode",{parentName:"p"},"fact"),", at each step, simply raises an exception containing its return value, which (in a future recursive call) is handled, the value unwrapped (bound to ",(0,i.kt)("inlineCode",{parentName:"p"},"res"),"), then multiplied by the current value of ",(0,i.kt)("inlineCode",{parentName:"p"},"n")," to generate the next value, which is simply raised again. This is very similar to a ",(0,i.kt)("inlineCode",{parentName:"p"},"case")," expression - we simply pattern match on the raised exception's constructor using the handler (you can pattern match on exception constructors with ",(0,i.kt)("inlineCode",{parentName:"p"},"case")," as well, though not ",(0,i.kt)("em",{parentName:"p"},"raised")," exceptions). Thus, the behavior of ",(0,i.kt)("inlineCode",{parentName:"p"},"factException n")," is to be extensionally equivalent to ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Return (fact n)"),"."),(0,i.kt)("p",null,"For an abstract idea of a potential use case, consider some recursive function ",(0,i.kt)("inlineCode",{parentName:"p"},"f")," that carries out some sequence of calculations, with a potential for error. We might be interested in how many recursive calls such a function makes when it ultimately fails - however, if we were to return the number of recursive calls, we would constrain the return type to be ",(0,i.kt)("inlineCode",{parentName:"p"},"int"),", or barring that, some datatype that could be either a valid result (say, ",(0,i.kt)("inlineCode",{parentName:"p"},"Valid res"),") or a signal for failure, with a line number (say, ",(0,i.kt)("inlineCode",{parentName:"p"},"Fail line"),"). We might desire that on a fail, execution actually stops, however. We could then simply raise the exception ",(0,i.kt)("inlineCode",{parentName:"p"},"Crash line"),", which, as a raised exception, has a polymorphic type. As such, exceptions allow us to propagate back information ",(0,i.kt)("em",{parentName:"p"},"without altering types"),", which can be convenient for our purposes."),(0,i.kt)("p",null,"For a concrete example of using such exceptions, see the next section."),(0,i.kt)("h2",{id:"exception-handling-style"},"Exception Handling Style"),(0,i.kt)("p",null,"In the previous section, we discussed how continuation passing style could be used to devise complicated control flow schemas, in some instances being based around the idea of a ",(0,i.kt)("em",{parentName:"p"},"success")," and ",(0,i.kt)("em",{parentName:"p"},"failure")," continuation, which could both potentially execute disjoint sets of instructions. With continuations, we can relate them to a common other construct in programming languages, that being a ",(0,i.kt)("em",{parentName:"p"},"goto"),'. With a goto, we abandon whatever we are currently in the process of doing in favor of something else. In this, we can see that continuations and exceptions share similar characteristics, of being able to just "stop" execution in favor of some other route.'),(0,i.kt)("p",null,"Consider the knapsack example from the previous section. We will now implement a solution to the knapsack problem using exception handling style."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sml"},"exception Failure\n\ntype weight = int\ntype value = int\n\n(* knapsackEHS :\n *            (value * weight) list ->\n *            value ->\n *            weight ->\n *            ((value * weight) list -> 'a) ->\n *            'a\n * REQUIRES: The weights and values of the elements in L are strictly positive.\n * ENSURES: knapsackEHS L minVal maxWeight sc fc ~= sc L' for some L' that only\n * contains elements of L, such that the total value of L' >= minVal and the\n * total weight of L' <= maxWeight, if such an L' exists. If no such L' exists,\n * then it should be equivalent to raise Failure.\n *)\n\nfun knapsackEHS\n  (L : (value * weight) list)\n  (minVal : value)\n  (maxWeight : weight)\n  (sc : (value * weight) list -> 'a)\n  : 'a =\n  case L of\n    [] => if minVal <= 0 andalso maxWeight >= 0 then sc []\n                                                else raise Failure\n  | (v, w)::xs => if maxWeight < 0 then raise Failure\n                                   else\n    knapsackEHS ((v, w)::xs) (minVal - v) (maxWeight - w)  (fn L' => sc ((v, w)::L'))\n    handle Failure => knapsackEHS xs minVal maxWeight sc\n")),(0,i.kt)("p",null,"It should be apparent that this function shares very close similarities to ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackCPS"),", with the exception",(0,i.kt)("sup",{parentName:"p",id:"fnref-1"},(0,i.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))," of omitting the failure continuation for raising the ",(0,i.kt)("inlineCode",{parentName:"p"},"Failure")," exception. In fact, we can claim that ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackCPS L minVal maxWeight sc fc ~= knapsackEHS L minVal maxWeight sc handle Failure => fc ()"),", for all relevant values. Take a moment to assure yourself that this is the case. The code does not look very different, with the largest change being the recursive case, where the failure continuation has instead been offloaded to a handler."),(0,i.kt)("p",null,'Recall that we can think of the recursive call in the knapsack problem as a "choice" to "keep" or "not keep" the item at the head of the list. We said previously that, arbitrarily, we could commit to the choice of "keep", with a provision in the failure continuation to instead "not keep", should that failure continuation ever be executed. When evaluating the expression ',(0,i.kt)("inlineCode",{parentName:"p"},"knapsackEHS ((v, w)::xs) (minVal - v) (maxWeight - w) (fn L' => sc ((v, w)::L'))"),(0,i.kt)("sup",{parentName:"p",id:"fnref-2"},(0,i.kt)("a",{parentName:"sup",href:"#fn-2",className:"footnote-ref"},"2")),", we know that one of two things can happen - it can either ",(0,i.kt)("em",{parentName:"p"},"succeed")," or ",(0,i.kt)("em",{parentName:"p"},"fail"),". Now, however, our definition of failure is different - instead of calling its failure continuation, an instance of ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackEHS")," which fails should instead raise ",(0,i.kt)("inlineCode",{parentName:"p"},"Failure"),". Thus, it is exactly the right thing to do to do what we would ordinarily do upon a failure, should our call to ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackEHS")," raise ",(0,i.kt)("inlineCode",{parentName:"p"},"Failure"),"."),(0,i.kt)("p",null,"Note, however, that in this implementation we put a slight amount more burden on the user, since the ill-defined behavior of this function now results in a raised ",(0,i.kt)("inlineCode",{parentName:"p"},"Failure"),", instead of just invoking ",(0,i.kt)("inlineCode",{parentName:"p"},"fc ()"),", for some pre-defined ",(0,i.kt)("inlineCode",{parentName:"p"},"fc")," that we input. This offers us the same advantages, however, since the return types of ",(0,i.kt)("inlineCode",{parentName:"p"},"sc")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"fc")," in ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackCPS")," must be the same. As such, if we want ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackCPS")," to return some indicative value (without using an option type), we might not have an appropriate return value for the failure case. Thus, ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackEHS")," might have the behavior we're looking for, since the type of ",(0,i.kt)("inlineCode",{parentName:"p"},"raise Failure"),' allows us to "unconstrain" the type of our success. In the general case, however, we will not make heavy usage of exception handling style, in favor of continuation passing style, which can be cleaner.'),(0,i.kt)("p",null,"This is not the most committed that we could have made ",(0,i.kt)("inlineCode",{parentName:"p"},"knapsackEHS"),", when converting to exception handling style - we could have also represented ",(0,i.kt)("em",{parentName:"p"},"success continuations")," with a raised exception, an ",(0,i.kt)("inlineCode",{parentName:"p"},"exception Success of (int * int) list"),". We will not cover such an implementation in this chapter, but we invite the reader to try it out."),(0,i.kt)("h2",{id:"conclusions"},"Conclusions"),(0,i.kt)("p",null,"In this chapter, we explored ",(0,i.kt)("em",{parentName:"p"},"exceptions"),', which allow us to have quick transfers of control flow, albeit in a less "controlled" fashion than ways that we have seen in the past. The success of so-called ',(0,i.kt)("em",{parentName:"p"},"exception handling style")," is heavily contingent on intelligent placement and consideration of ",(0,i.kt)("em",{parentName:"p"},"handlers"),", which decide where control is transferred to. We also have seen that we have a way of passing information back ",(0,i.kt)("em",{parentName:"p"},"through")," the raised exception, which allows us to have a more powerful manner of communication than just an indicator of failure. Exceptions ultimately allow us a robust and type-safe way to deal with run-time errors in our programs."),(0,i.kt)("div",{className:"footnotes"},(0,i.kt)("hr",{parentName:"div"}),(0,i.kt)("ol",{parentName:"div"},(0,i.kt)("li",{parentName:"ol",id:"fn-1"},"We're funny.",(0,i.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")),(0,i.kt)("li",{parentName:"ol",id:"fn-2"},"Say that five times fast.",(0,i.kt)("a",{parentName:"li",href:"#fnref-2",className:"footnote-backref"},"\u21a9")))))}h.isMDXComponent=!0}}]);