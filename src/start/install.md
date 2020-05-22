# Installing SML/NJ

## Installing SML/NJ on AFS

To set up your SML/NJ environment on the Andrew File System (AFS), first you will need to log in to AFS.

You can do this by executing the command
`ssh <andrew_id>@unix.andrew.cmu.edu`

You can do this from a terminal very straightforwardly on a Mac. If you are on a Windows machine, you may need to use an application such as Visual Studio Code or MobaXTerm to access a terminal.

Once you are in AFS, execute the command 
`/afs/andrew/course/15/150/bin/setup-path`

Once the script has finished running, type in the command that it tells you to. It should look something like
`. '/afs/andrew.cmu.edu/usrc/<andrew_id>/.bashrc`

__IMPORTANT:__ _Do not forget the . at the beginning!_ This will cause the script to not work. 

After finishing this, you should be able to type in `smlnj` from the command line and access the SML/NJ REPL.
