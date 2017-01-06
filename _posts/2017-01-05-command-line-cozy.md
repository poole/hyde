---
layout: post
title: "Command line: getting cozy"
category: articles
tags: shell intermediate
---

How to be comfortable in the shell.
This guide is intended for people who already use the shell, and want to make their experience more comfortable and convenient.
If you have suggestions, make them [here](https://github.com/fredhutchio/fredhutch.io/issues/4).

* [Finding things](#finding-things)
* [Terminal multiplexing](#terminal-multiplexing)
* [History](#history)
* [Interacting with the web](#interacting-with-the-web)
* [Git prompt](#git-prompt)
* [Moving around](#moving-around)
* [Fuzzy finding](#fuzzy-finding)
* [Making friends with vi (and vim)](#making-friends-with-vi-and-vim)


## Finding things

With desktop OS's, we are used to being able to see where we are and search easily by filenames and content.
Let's see some linux commands to stay oriented.


### tree
The `tree` command shows the nested directory structure as a tree:

```
.
├── buckle
│   └── shoe
│       └── file.txt
└── one
    └── two
```

This can get pretty lengthy when we have a big directory tree, so we can limit it with `-L`, say in this case `tree -L 2`:

```
.
├── buckle
│   └── shoe
└── one
    └── two
```


### find

[GNU Find](https://www.gnu.org/software/findutils/manual/html_mono/find.html) is an incredibly powerful command.
It is generally used for finding files by their characteristics, such as name or size, rather than by their contents (more on that later).
It is complex enough to get its own [Wikipedia page](https://en.wikipedia.org/wiki/Find), which in fact has a nice collection of examples.

I mostly just use it for a few simple things, illustrated by the following examples:

* `find .`: list all files and directories descending from the current one (recall that `.` is the current directory)
* `find some/directory -name "*.py"`: find all files and directories in descending from `some/directory` ending in `.py`
* `find . -name "*nofonts.svg" -exec /bin/rm {} \;`: remove every file ending in `nofonts.svg` contained in the current directory.


### grep & friends

Moving on to finding files by their content, the first step is the classic `grep`.

To find occurrences of the string "smooshable" in any file contained in the current directory, just write

```
grep -R smooshable
```

where the `-R` is for recursive search across the directory tree.

I don't actually use recursive grep much.
If I'm looking for something in a git repository I use `git grep`:

```
git grep smooshable
```

which is fast and tidier because it doesn't find things in the `.git` directory, etc.

If I have a lot of big files to search through, [ag, the silver searcher](https://github.com/ggreer/the_silver_searcher) is a great tool.
It searches recursively by default, so in this example

```
ag smooshable
```

will get you a nicely formatted list of instances.
Note that ag also has lots of nice editor integrations.


## Terminal multiplexing

When working on a modern desktop computer, it's easy to arrange multiple windows side by side, to switch between applications, etc.
On the command line this is achieved by use of a "terminal multiplexer".
This is absolutely essential for working on remote machines, where one can detach and re-attach sessions with all their attendant windows.

We've covered this in detail [in our bioinformatics intro class slides](http://fredhutchio.github.io/intro-bioinformatics/01-gestalt.html#/tmux---terminal-multiplexer)
and in an [intro article](http://www.fredhutch.io/articles/2014/04/27/terminal-multiplex/)
so I'm not going to go into detail beyond that.


## History

Your "history" is the list of commands you have entered.
The easiest way to get back in your history is just to hit the up arrow.
Repeatedly hitting up arrow will take you back in time, while down arrow takes you forward in time.
When we see a command that we like, we can hit `Return` to execute that command, or use the left and right arrow keys to move to a place where we can edit it.

Here are some commands to help you browse that history:

* `history`: gives the full history; likely to be too much too be useful
* `history | tail`: the history truncated to the most recent commands
* `history | less`: history made more navigable

You can also search through your history.
Hitting `Ctrl-r` brings up reverse interactive search.
In this example, I typed `tags`, which brings up the most recent command containing the string `tags`:

```
$ git describe --tags --long
bck-i-search: tags_
```

You can cycle through earlier commands by hitting `Ctrl-r` again.
If you want to cancel your reverse search, use `Ctrl-g`.

It appears that OS X truncates your history at a measly 500 lines.
Phooey on that!
Put this in your `.bashrc` to get an unlimited history:

```
export HISTFILESIZE=
export HISTSIZE=
```

Note that [this isn't a perfect solution and a better one exists](http://superuser.com/a/664061), but it's good enough.

### The last word in history

There is a very handy trick to go cycle through the last words in your history.
Say I'm doing the following:

```
git add horribly/long/path/to/file.txt
git status
```

and now I remember I wanted to make one more modification to `horribly/long/path/to/file.txt`.
One can hit the up arrow two times and then replace `git add` with an invocation of an editor.

But there's something slicker.
`Alt-.` cycles through the previous last words in the command history and puts them on the command line.
In this example, I could say `vi ` `Alt-.` `Alt-.` and `vi horribly/long/path/to/file.txt` would result.

For the OS X fans out there, you will use `Option` in place of `Alt`, which may require [some configuration](http://osxdaily.com/2013/02/01/use-option-as-meta-key-in-mac-os-x-terminal/) (note `Meta` is another name for `Alt` in this context).


## Interacting with the web

To get something off the web, use `wget` and then the web address.
This is handy in combination with the "raw" address for files on GitHub (available as a button on the right hand side of a file's page), e.g.:

```
wget https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh
```

Another related tool is [curl](https://curl.haxx.se/docs/manual.html), which is quite powerful.

If you actually have to interact with the web via the command line, you can always use `lynx`.
If you want to watch nyan cat, you can do so by executing

```
telnet nyancat.dakko.us
```


## Git prompt

I don't mind what shells or editors people in my group use, but I really feel strongly that everyone should use a shell prompt that displays information about git status.
Not having this inevitably leads to confusion with partial commits.

The git folks understand this and have made a [git prompt script](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh).
Bash folks: you can grab this using the wget command above, move it to `~/.git-prompt.sh`, and throw this in your `.bashrc`:

```
source ~/.git-prompt.sh
export GIT_PS1_SHOWDIRTYSTATE=1
export GIT_PS1_SHOWUNTRACKEDFILES=1
PS1='[\u@\h \W$(__git_ps1 " (%s)")]\$ '
```

If you use zsh you probably have all of this configured, but I'd suggest trying out [antigen](https://github.com/zsh-users/antigen) which has a plugin system making all this trivial.


## Moving around

We all know and love `cd`, but moving around with raw `cd` can get tedious.
First a few little tricks:

* `cd`: moves you back to your home directory
* `cd -`: moves you back to your previous location

But still, getting deep in a directory tree takes a lot of typing and/or tab completion.
For this reason, I use [autojump](https://github.com/wting/autojump), which remembers where you've been so you can move around more quickly.
Before you install that tool, though, take a look at the next section, which also offers a faster way to navigate deep in directory trees.


## Fuzzy finding

We all love tab completion.
But sometimes it too can be painful.
Consider this list of files, which is the various posts that have appeared on fredhutch.io:

```
2014-04-24-command-line.md        2015-04-06-R-sequence-analysis.md
2014-04-27-terminal-multiplex.md  2015-04-23-ucsc-xena-workshop.md
2014-05-09-galaxy.md              2015-04-24-third-galaxy-101.md
2014-05-11-editing.md             2015-05-04-spring-2015-r.md
2014-05-17-git.md                 2015-05-20-spring-2015-unix-hpc.md
2014-05-20-R.md                   2015-06-03-summer-bioinfo.md
2014-07-13-toolbox.md             2015-08-26-data-center-tour.md
2014-07-16-aws.md                 2015-08-27-cloud-computing.md
2014-08-13-synapse.md             2015-12-02-galaxy-rna-seq.md
2014-09-19-R-course.md            2016-01-21-cds-git.md
2014-10-20-introductory-r-.md     2016-02-25-immunespace.md
2014-10-22-shippable.md           2016-03-01-i-heart-pandas.md
2014-10-27-bioconductor.md        2016-03-28-gizmo-brownbag.md
2014-11-03-labkey.md              2016-06-14-scicomp-unix-hpc.md
2014-11-07-intermediate-R.md      2016-07-28-galaxy-101.md
2014-12-09-hidra.md               2016-08-23-chipseq-class.md
2014-12-15-scicomp-unix-hpc.md    2016-08-31-rnaseq-class.md
2015-02-11-scicomp-unix-hpc.md    2016-09-08-inkscape.md
2015-03-09-introductory-R.md      2016-09-27-intro-r.md
2015-03-12-rollout-galaxy-101.md  2016-10-03-introbio.md
2015-04-02-april-galaxy-101.md    2017-01-05-command-line-cozy.md
```

to tab-complete through these files is a pain, because I actually want to say something about the content, which is past the date.

Thus we can use _fuzzy finding_, which allows us to use arbitrary substrings to find what I want.
This is available [in GitHub](https://github.com/blog/793-introducing-the-file-finder) for finding files, and actually even in the Chrome address bar.
With fuzzy finding, you can just type substrings of your desired string and the matcher will find items that contain those substrings.

For example, if I want the posts from 2015 that contain `galaxy`, I could type `2015galaxy`, and :boom:

```
  2015-03-12-rollout-galaxy-101.md
  2015-04-24-third-galaxy-101.md
  2015-04-02-april-galaxy-101.md
  2014-05-09-galaxy.md
> 2015-12-02-galaxy-rna-seq.md
  5/41
> 2015galaxy
```

we get a list of the files that contain `2015` and `galaxy`.
In fact, I could have typed `15axy` and gotten the same result, because it matches the same set of files.

There are lots of fuzzy finding tools and extensions for editors.
I suggest giving [fzf](https://github.com/junegunn/fzf) a try.
You can do all sorts of fancy things, but to get started the three basic command overrides should be useful:

* `Ctrl-t` finds files
* `Ctrl-r` does reverse search on your history
* `Alt-c` finds and enters directories


## Making friends with vi and vim

Vi is a wonderful, powerful, but completely arcane editor.
It's worth being able to use because even the sparsest linux install will have some variant of vi.
Also, when working with remote machines, it's nice to be able to edit text in a powerful editor directly on that machine.
Finally, sometimes another program (e.g. git) will plop you into vim without you realizing it, so it's nice to know what to do in this situation.

Your first encounter with vi is likely to mostly be concerned with how to exit.
So, here we go (you can execute `vi` at the command line to test this out in a vi session):

### Exiting vi

* Hit `Esc` to leave insert mode
* Type `:q`
* If that didn't work, and if you see `[Command Line]` at the bottom of your window then hit `Return` then `:q`.
* If it says "No write since last change", then it's asking if you want to save. If you do want to save, type `:wq`, and if not, `:q!`.

### The simplest vi session

Now, say you have a single file and want to make a simple modification to it.

* Invoke vi with `vi my-file.txt`
* Type `i` to enter insert mode
* Move around with your arrow keys, editing as needed
* When you like some edits, hit `Esc` to exit insert mode and type `:w` to save
* When you are done editing, type `:q`

That wasn't so bad, was it?

### Using the command mode

So far the only real action has been in insert mode.
The other mode in vi is the command mode.
In this mode you can quickly navigate and modify your file using key commands.

Also, I'm going to assume now that you have [vim](http://www.vim.org/) installed, which is a safe assumption (generally `vi` redirects you to `vim`).

#### Moving around quickly

There are lots of ways to move around beyond the arrow keys, but I'm just going to describe three:

* `0` moves to the beginning of the line, and `$` moves to the end of the line
* `b` moves back one word, and `w` moves forward one word
* `{` moves back one paragraph, and `}` moves forward one paragraph

You can prefix these commands with numbers to move faster, e.g. `3w` moves you forward three words.
If you want more, see the documentation, [this wallpaper](https://github.com/LevelbossMike/vim_shortcut_wallpaper) and [this poster](http://vimcheatsheet.com/).

#### Cutting and pasting

There is a simple way to cut and paste using vim which is exactly analogous to a word processor: highlight a block of text, then copy or cut, then paste.

* Move to where you want to start your highlight
* Press `v` (this places you in "visual mode")
* Move to the end of your highlighted region
* Press `d` to cut, `y` to copy
* Move to where you want to paste
* Press `p` to paste

You can also cut and paste using `d` and `y` together with a motion key (e.g. `dw` cuts a word, and `d2w` cuts two); `dd` and `yy` cut or copy an entire line, respectively.

#### Undo/redo

If you ever mess anything up (which is easy to do in command mode), `u` is undo and `Ctrl-r` is redo (from command mode).

#### Vim resources

* [Ben Crowder's vim tips](http://bencrowder.net/files/vim-fu/)
* The `vimtutor` command, available wherever you find `vim`
* [An online vim tutorial](http://www.openvim.com/)

Note that these guides insist that you can't use the arrow keys.
You certainly can, though it's not considered hip (because vim is all about efficiency, and moving your hands from home position to the arrow keys is not efficient.)
