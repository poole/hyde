---
layout: post
title: Useful sed commands
description: <b>sed</b> is a powerful command line editor in linux. I will be listing a few examples of its use.
tags: linux
last_modified: 2020-07-14 21:30:00 +0000
---

### To remove the string at the end of each line till a character appears.

#### Command
```
sed -E 's/(,.+)(,.+$)/\1/' val_old.list > val_new.list
```

__Input list__
```
image_train/00084405_0.jpg, 4,-1
image_train/00082250_0.jpg, 2 , -1
image_train/00014450_0.jpg, 0, -1
image_train/00078395_0.jpg, 3,-1
image_train/00048145_0.jpg, 2,  -1
```

__Output list__
```
image_train/00084405_0.jpg, 4
image_train/00082250_0.jpg, 2
image_train/00014450_0.jpg, 0
image_train/00078395_0.jpg, 3
image_train/00048145_0.jpg, 2
```

#### What does the command do ?
The regex finds the two expressions, where both start with a comma and the second one ends with _end of line_. This is replaced with the first expression only. The goal was to remove the second expression. Here, the old list will be untouched.
`\1` suggests the first regex.

#### Background
I had created a list for my _deep-learning_ model training. This was basically a multi-task training. I was fiddling between two-task training and single-task training, that's when I came across an errand to modify the list used in two-task training to the one to be used in single-task training. Each line of my list basically consisted of image path and label numbers of each of the tasks separated with commas. I wanted to remove the second task's labels, which is the last column.


### To append a string at end of each line

#### Command
```
sed 's/$/, -1/' val_old.list > val_new.list
```

__Input list__
```
image_train/00084405_0.jpg, 4
image_train/00082250_0.jpg, 2
image_train/00014450_0.jpg, 0
image_train/00078395_0.jpg, 3
image_train/00048145_0.jpg, 2
```

__Output list__
```
image_train/00084405_0.jpg, 4, -1
image_train/00082250_0.jpg, 2, -1
image_train/00014450_0.jpg, 0, -1
image_train/00078395_0.jpg, 3, -1
image_train/00048145_0.jpg, 2, -1
```

#### What does the command do ?
Appends the string `, -1` to the end of each line.

#### Background
I have a list with the first-task's labels and I needed to add `-1` as class (_to be ignored inside pytorch_) for the second task.


### To add a string before a substring for each line

#### Command
```
sed -E 's/(,.+$)/, -1 \1/' val_old.list > val_new.list
```

__Input list__
```
image_train/00084405_0.jpg,4
image_train/00082250_0.jpg, 2
image_train/00014450_0.jpg,  0
image_train/00078395_0.jpg, 3
image_train/00048145_0.jpg,2
```

__Output list__
```
image_train/00084405_0.jpg, -1 ,4
image_train/00082250_0.jpg, -1 , 2
image_train/00014450_0.jpg, -1 ,  0
image_train/00078395_0.jpg, -1 , 3
image_train/00048145_0.jpg, -1 ,2
```

#### What does the command do ?
Adds the string `, -1` before the substring which starts with comma and goes on till end of the line.

#### Background
I have a list with the second-task's labels and I needed to add `-1` as class (_to be ignored inside pytorch_) for the first task.


### References
1. [StackExchange answer explaining how to use regex in sed](https://unix.stackexchange.com/a/78626/351188)
