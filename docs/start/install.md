---
sidebar_position: 1
---

# Installing SML/NJ

_By Brandon Wu, May 2020_, _updated by Zach Battleman, April 2022_

## Installing SML/NJ on AFS

To set up your SML/NJ environment on the Andrew File System (AFS), first you will need to log in to AFS.

You can do this by executing the command

```
ssh <andrew_id>@unix.andrew.cmu.edu
```

You can do this from a terminal very straightforwardly on a Mac. If you are on a Windows machine, you may need to use an application such as Visual Studio Code or MobaXTerm to access a terminal.

Once you are in AFS, execute the command

```
/afs/andrew/course/15/150/bin/setup-path
```

Once the script has finished running, type in the command that it tells you to. It should look something like

```
. '/afs/andrew.cmu.edu/usrc/<andrew_id>/.bashrc
```

**IMPORTANT:** _Do not forget the . at the beginning!_ This will cause the script to not work.

After finishing this, you should be able to type in `smlnj` from the command line and access the SML/NJ REPL.

## Making SML/NJ a bit prettier

Now that you've set up SML/NJ, you might want to make it a bit nicer to work with.

### VSCode

Simply install the Millet plugin. From the extensions window in VS Code, just type "Millet" in the search and it should come up. If it does not, you can manually download the extension [here](https://marketplace.visualstudio.com/items?itemName=azdavis.millet) and install from the `.vsix` file. This can be done by clicking the three dots in the top right of the extensions menu and clicking "install from vsix". From there, simply provide the `.vsix` file you downloaded and now you're all set up!

### Vim

For the purposes of this document, I will provide instructions as if you are using regular Vim. If you are using neovim or some other vim derivative, I'll provide links to the repositories I use, but _don't_ run the exact commands - they are for vim users specifically. Furthermore, this guide is for unix based machines - not Windows. If you are on Windows, please check the associated repositories for instructions. (Note, this will Work on WSL if you are using that, just not pure Windows)

### The quick and easy version

If all you care about is syntax highlighting outside of what the 15150 setup script provides, simply add

```vim
autocmd BufNewFile,BufRead *.fun set ft=sml
autocmd BufNewFile,BufRead *.sig set ft=sml
```

to your `.vimrc` file. You can find this file at `~/.vimrc`. You should now have syntax highlighting on your `.sig` and `.fun` files!

### The nitty gritty (but totally worth it) version

#### Step 1) Installing a Plug-In manager

If you already have one, feel free to skip this step!

There are many many choices for a Vim plugin manager, but I recommend using [Vim-Plug](https://github.com/junegunn/vim-plug). You can install it with:

```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

#### Step 2) Modifying your .vimrc

Just slap this mess into your `.vimrc` (which can be found at `~/.vimrc`)

```vim
call plug#begin()
Plug 'jez/vim-better-sml'

call plug#end()

augroup vimbettersml
  au!

  " ----- Keybindings -----

  au FileType sml nnoremap <silent> <buffer> <leader>t :SMLTypeQuery<CR>
  au FileType sml nnoremap <silent> <buffer> gd :SMLJumpToDef<CR>

  " open the REPL terminal buffer
  au FileType sml nnoremap <silent> <buffer> <leader>is :SMLReplStart<CR>
  " close the REPL (mnemonic: k -> kill)
  au FileType sml nnoremap <silent> <buffer> <leader>ik :SMLReplStop<CR>
  " build the project (using CM if possible)
  au FileType sml nnoremap <silent> <buffer> <leader>ib :SMLReplBuild<CR>
  " for opening a structure, not a file
  au FileType sml nnoremap <silent> <buffer> <leader>io :SMLReplOpen<CR>
  " use the current file into the REPL (even if using CM)
  au FileType sml nnoremap <silent> <buffer> <leader>iu :SMLReplUse<CR>
  " clear the REPL screen
  au FileType sml nnoremap <silent> <buffer> <leader>ic :SMLReplClear<CR>
  " set the print depth to 100
  au FileType sml nnoremap <silent> <buffer> <leader>ip :SMLReplPrintDepth<CR>

  " ----- Other settings -----

  " Uncomment to try out conceal characters
  "au FileType sml setlocal conceallevel=2

  " Uncomment to try out same-width conceal characters
  "let g:sml_greek_tyvar_show_tick = 1
augroup END
```

This configuration will setup a plugin called [vim-better-sml](https://github.com/jez/vim-better-sml) with default keybindings (I'll put notes on this at the bottom)

#### Step 3) Open vim and actually install

When you open vim, type `:PlugInstall` and it should pop up a window where you see the plugin install. If so, congrats! You have syntax highlighting (and other cool features)

#### Step 4) Optional Cool stuff

Conceal characters allow you to replace `fn` and `'a` with actual lambdas an alphas! It's kind of hard to explain, but it's a really cool feature so try it! Just uncomment the line (remove the quote at the front):

```
"au FileType sml setlocal conceallevel=2
```

#### Step 5) Keybindings

If you want to use some of the other features, just look at the keybind config. The most useful, in my opinion, is opening the REPL within vim which is by default `<leader> is`. I believe `<leader>` is `\` by default, so in order to open the REPL type `\is`. If this doesn't work, you probably have a custom leader key which you can check with `:let mapleader`. Likewise, to close the REPL is `<leader> ik`.
