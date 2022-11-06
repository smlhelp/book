---
sidebar_position: 6
---

# Control Flow

Programs inherently are composed of a series of _steps_. Depending on the context, syntax, and semantics of the programming language in general, we arrive at a certain _prescribed order_ in which instructions are executed (at least for sequential programs). It is often the case that, according to small differences in state or environment, _control_ may be affected, causing different instructions to be executed. In this chapter, we will discuss two control flow constructs, namely continuations and exceptions, that can allow us to more easily and cleanly write functions that need to have complex control flow behavior, or in other words, complicated decision-making.
