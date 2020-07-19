---
layout: post
title: Understanding Eigen Values and Eigen Vectors
description: Basics of what eigenvectors and eigenvalues are.
tags: maths blog
last_modified: 2020-07-19 17:30:00 +0000
---

## Background
Understanding linear algebra has never been this easy as watching and learning from [`3blue1brown`](https://www.3blue1brown.com/){:target="_blank"}. The YouTube series is just perfect with its superb animations which helps one build intuition.
Vectors are basically line drawn from origin to a point in the coordinate system. One needs to understand what basis of a coordinate system is and how the change of basis affects the vectors. Then we need learn that matrix multiplication with a vector is basically linear transformation of the vector. One could also say that, the final vector of this transformation is the vector in current coordinate system, if the initial vector was the vector defined in the coordinate system defined by the linear transformation matrix. Here we can take the columns of the matrix as basis of the _other_ coordinate system.
Basic properties of linear transformation:<br>

$$
\begin{aligned}
 L (\vec{v} + \vec{w}) &= L (\vec{v}) + L(\vec{w}) \\
 L (c\vec{v}) &= cL(\vec{v}) \\
\end{aligned}
$$

## Eigen Values & Vectors
Suppose you transform a vector and it stays in the same line, i.e, the direction will stay same or opposite, and the length may increase or decrease. Then that vector is an eigen vector.<br>

$$A \vec{v} = \lambda\vec{v}$$


## How to calculate


## Applications


#### References
1. [YouTube Video about Eigen Values & Vectors with beautiful representation](https://youtu.be/PFDu9oVAE-g)
2. [YouTube playlist of wonderful visual representation of linear algebra which includes the above video](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)