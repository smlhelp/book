# Signatures and Ascription
As discussed in the previous section, we sometimes will find ourselves working
on large projects, ones that have many different subtasks and subroutines. Other
times, we are implementing something that other programmers might want to use,
in which case we need to clearly and cleanly be able to convey what behaviors
our implementation supports. In such cases, we might be interested in
maintaining a _signature_, or _interface_, through which users have access to our implementation. 

# Motivation
Consider the computer. It is a complicated, convoluted work of machinery and
circuitry - at its most fundamental level being comprised of logic gates and
incredible networks of interacting parts. Although an action as simple as
opening up a notepad seems very intuitive to the user, under the hood it is
anything but. The key, however, is that the user of a computer need not
understand the underlying hardware and circuitry - indeed, they need not even
know what circuitry is! The user of the computer is restricted to an
_interface_, under which they can only interact with the computer with
particular, predefined ways. For the computer, this often takes the form of the
keyboard and mouse - beyond this, the user does not have the ability to reach
into the computer and manually flip the bits.

## Signatures and Structures
In SML, this interface takes the form of a _signature_. A signature packages
types, values, and exceptions, among other things - though it does not have to
specify them. An interface, most of all, specifies what a particular module
should _do_ - at the high level, how it should behave. For an example of this, 
let us consider the interface for a 

## Transparent and Opaque Ascription

##
