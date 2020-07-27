---
layout: post
title: Karplus-Strong Algorithm
description: Simple digital feedback algorithm to synthesize musical sounds
tags: maths blog
last_modified: 2020-07-27 17:30:00 +0000
---

## Introduction
We might want to have a little background on what discrete signals are, then we need to know what finite signals, infinite signals, recursive signals & its frequency are. Discrete signals are photographs of signals taken in certain time interval $$T_s$$, with corresponding sampling frequency $$F_s = 1 / T_s$$. These signals can have a frequency $$f$$ with which it is repeating. Say, if $$M$$ samples for one unique sequence, then $$f = 1 / M T_s$$ or $$f = F_s / M$$.

Let us take a look at the feedback system:

![Karplus-Strong-Feedback-System](/public/images/Karplus-Strong-digital-feedback.png)

Now let us take a finite signal $$x[n]$$ which has $$M$$ samples as input to our feedback system.

## Coding Karplus-Strong Algorithm


## Applications


#### References
1. [Coursera's DSP course](https://www.coursera.org/learn/dsp/home/welcome)
