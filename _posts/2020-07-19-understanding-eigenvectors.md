---
layout: post
title: Understanding Eigen Values and Eigen Vectors
description: Basics of what eigenvectors and eigenvalues are.
tags: maths blog
last_modified: 2020-07-22 17:30:00 +0000
---

## Background
Understanding linear algebra has never been this easy as watching and learning from __[`3blue1brown`](https://www.3blue1brown.com/){:target="_blank"}__. The YouTube series is just perfect with its superb animations which helps one build intuition.
`Vectors` are basically line drawn from origin to a point in the coordinate system. One needs to understand what `basis` of a coordinate system is and how the change of basis affects the vectors. Then we need learn that matrix multiplication with a vector is basically `linear transformation` of the vector. One could also say that, the final vector of this transformation is the vector in current coordinate system, if the initial vector was the vector defined in the coordinate system defined by the linear transformation matrix. Here we can take the columns of the matrix as basis of the _other_ coordinate system.
Basic properties of linear transformation:<br>

$$
\begin{aligned}
 L (\vec{v} + \vec{w}) &= L (\vec{v}) + L(\vec{w}) \\
 L (c\vec{v}) &= cL(\vec{v}) \\
\end{aligned}
$$

`Determinants` basically give us the _area_ of the _parallelogram_ formed by the two vectors derived from columns of the matrix ( $$2D$$ square matrix). If we have two vectors and their area $$A$$, and we transform this using a matrix $$M$$, then the area of the two vectors are scaled by $$det(M)$$, i.e, the area of the transformed vectors would be $$det(M) * A$$.
This concept for $$2D$$ matrix can be extended to $$3D$$, where the determinant would give out the _volume_ of the _parallelopiped_. The scaling explained above would apply here also.
Since determinant gives the area, if the area is zero, that means the vector will be _squished_ to a lower dimension.

## Eigen Values & Vectors
Suppose you transform a vector and it stays in the same line, i.e, the direction will stay same or opposite, and the length may increase or decrease. Then that vector is an `eigen vector`. The line of the vector is not shaken off.<br>

$$A \vec{v} = \lambda\vec{v}$$

Here $$\lambda$$ is the scaling factor which is also called `eigen value`.

## How to calculate
Now that we have the definition, let us see the steps to derive the _eigen vectors_ and _eigen values_.

First let us convert the R.H.S to be _matrix-vector_ multiplication instead of _scalar-vector_ multiplication.<br>

$$A \vec{v} = \lambda I\vec{v}$$

Now that both the sides are similar, let us shift the R.H.S to the left.<br>

$$
\begin{aligned}
    A \vec{v} - \lambda I\vec{v} &= \vec{0} \\
    (A - \lambda I)\vec{v} &= \vec{0}
\end{aligned}
$$

Since, the vector stays in the same line, if the transform $$(A - \lambda I)$$ has the vector to land on the _origin_, then the determinant of this transform has to be zero, then the vector on its line will be squished to the origin, since it won't be shaken off its line. So, the determinant of the transform should be zero.

>
Why I am stressing the part where the eigen vector will be squished to origin is because, if it was any other vectors not on the line of eigen vectors, then they would perhaps be squished to $$1D$$ but not on to origin, they could have value other than zero on the $$1D$$ line. So, for thos vectors to be squished to the origin, the transform vector has to be $$zero$$ $$matrix$$


Finally, we need to solve for $$\lambda$$ <br>
\$$det (A - \lambda I) = 0$$

$$
\begin{aligned}
    where, 
    A &= \left( \begin{array}{c}
      a & b \\
      c & d \\
    \end{array} \right) \\
    \lambda I &= \left( \begin{array}{c}
      \lambda & 0 \\
      0 & \lambda
    \end{array} \right) \\
\end{aligned}
$$

So,

$$
\begin{aligned}
    det (A - \lambda I) &= 0 \\
    det\left( \begin{array}{c}
      a - \lambda & b \\
      c & d - \lambda \\
    \end{array} \right) &= 0 \\
    (a - \lambda)(d - \lambda) -bc &= 0 \\
\end{aligned}
$$

Solving the above equation we get the _eigen values_, which we use to get the _eigen vector(s)_ $$\vec{v}$$. Remember that if we do not get a real solution for $$\lambda$$, then there are _no_ eigen vectors in the real plane.

Sometimes we could also get only a _single_ eigen vector, for example, shear transform $$\left( \begin{array}{c}1 & 1 \\0 & 1 \\ \end{array} \right)$$.

Sometimes we can also get _infinite_ number of eigen vectors, for example, $$\left( \begin{array}{c}3 & 0 \\0 & 3 \\ \end{array} \right)$$, here the all the vectors are scaled by $$3$$.

Sometimes we could also _not_ get any eigen vector, for example, roatation by $$90^o$$ transform $$\left( \begin{array}{c}0 & 1 \\-1 & 0 \\ \end{array} \right)$$.

## Applications

### Eigen Decompostition or Diagonalisation

Say the transformation matrix is a `diagonal matrix`, i.e, all the elements _except_ diagonal elements are zero, then we can conclude that the basis are eigen vectors and the values of diagonal elements are the eigen values corresponding to those eigen vectors. Important take here is that, the transformation does not change the line of the basis vectors, which make them eigen vectors also.
So, if say we have a transformation matrix that is not diagonal, we can choose the basis vectors such a way that these basis vectors do not change their line after the transformation. And, we know that eigen vectors are the vectors that do not change direction when applied transformation. So, if we shift our basis to these eigen vectors, the corresponding transformation matrix in this new coordinate system formed by these basis will be diagonal matrix, as it would just stretch the basis(eigen) vectors, and not change its direction. But not all transformation matrix can have eigen vectors enough to `span` all the vectors. We saw that shear transform has only one eigen vector, due to which we cannot apply the above technique to diagonalise the matrix.
When we change the basis, the new transformation is defined by $$A^{-1} M A$$, where $$M$$ is the transformation matrix in current coordinate system and $$A$$ is the matrix formed by the new basis in the order, where $$x$$ and $$y$$ are transformed.
>
Since, the transformation on the eigen vectors used as basis will always have the eigen vectors in line but stretched by their corresponding eigen values, the new transformation matrix will be diagonal matrix with eigen values as diagonal elements.

Why is diagonal matrix so important? Because if you multiply a diagonal matrix by itself, and continue multiplying, we can generalise the final matrix based on the starting matrix. Example:<br>

$$ \left( \begin{array}{c} a & 0 \\ 0 & d \\ \end{array} \right) \left( \begin{array}{c} a & 0 \\ 0 & d \\ \end{array} \right) = \left( \begin{array}{c} a^2 & 0 \\ 0 & d^2 \\ \end{array} \right) \\$$

So, if $$A$$ is a diagonal matrix, $$A^n$$ is simply the diagonal elements raised to the power of $$n$$. Because of this we use eigen decomposition to calculate the diagonal matrix for a given transformation matrix $$M$$. If $$D$$ is the diagonal matrix, then $$M = A D A^{-1}$$, where $$A$$ is the matrix formed by the eigen vectors.

#### References
1. [YouTube Video about Eigen Values & Vectors with beautiful representation](https://youtu.be/PFDu9oVAE-g)
2. [YouTube playlist of wonderful visual representation of linear algebra which includes the above video](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab)
