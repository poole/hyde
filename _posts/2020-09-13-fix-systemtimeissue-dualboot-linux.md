---
layout: post
title: 'Fix dual booting windows and ubuntu time issue'
data: 2020-09-13 06:31:31 +0530
categories: linux
tag: linux, local time, timedatectl
excerpt: Dual booting windows and linux can show different time in linux and windows. This post shows a fix to that.
author: ajo_mathew
---
# Option One: Make Linux Use Local Time

To force Linux use local time should fix the issue by running below command

```bash
timedatectl set-local-rtc 1 --adjust-system-clock
```

Reference (Link)[https://www.howtogeek.com/323390/how-to-fix-windows-and-linux-showing-different-times-when-dual-booting/] to read more on it
