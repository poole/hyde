---
layout: post
title: 'Pop OS Windows Dual boot support with UIEF'
data: 2021-07-11 06:31:31 +0530
categories: linux
author: ajo_mathew
excerpt: How to Dual boot Windows and POP-OS with UIEF
tag:
    - Linux
    - POP
    - UIEF
    - Windows
    - Dual boot
---

During the first boot Pop OS does not show any boot selection menu. To fix that we can add 

`timeout <Seconds>`

to `sudo gedit /boot/efi/loader/loader.conf` and save.

Still if you are not able to view Windows in boot menu. You can follow instructions from this [page](https://github.com/spxak1/weywot/blob/main/Pop_OS_Dual_Boot.md)

The gist of it is that Copy Microsoft folder from UIEF partition of Windows to Pop OS UIEF partition.  It would looks like something like this

``` bash
root@pop-os:/boot/efi# cd EFI/
root@pop-os:/boot/efi/EFI# ls
BOOT  Linux  Microsoft  Pop_OS-077f0a72-1af9-49ec-94ec-458efccc5654  systemd
root@pop-os:/boot/efi/EFI# 
```

There is another [reddit page](https://www.reddit.com/r/pop_os/comments/gjsr6r/psa_how_to_dual_boot_pop_os_with_windows_with_a/) for your reference to knwo the details.