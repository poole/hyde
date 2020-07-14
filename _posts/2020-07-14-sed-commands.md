---
layout: post
title: Useful sed commands
description: <b>sed</b> is a powerful command line editor in linux. I will be listing a few examples of its use.
tags: linux
---

### To remove the string at the end of each line till a character appears.

#### Command
```
sed -E 's/(,.+)(,.+$)/\1/' val_old.list > val_new.list
```

#### What does the command do ?
The regex finds the two expressions, where both start with a comma and the second one ends with _end of line_. This is replaced with the first expression only. The goal was to remove the second expression. Here, the old list will be untouched.

#### Background
I had created a list for my _deep-learning_ model training. This was basically a multi-task training. I was fiddling between two-task training and single-task training, that's when I came across an errand to modify the list used in two-task training to the one to be used in single-task training. Each line of my list basically consisted of image path and label numbers of each of the tasks separated with commas. I wanted to remove the second task's labels, which is the last column.


### References
1. [StackExchange answer explaining how to use regex in sed](https://unix.stackexchange.com/a/78626/351188)
