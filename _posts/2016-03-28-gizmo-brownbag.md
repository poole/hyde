---
layout: post
title: "How to run 40,000 HPC jobs on Gizmo overnight"
category: events
tags: education external hpc python R
---

From Dirk Petersen, via the [scicomp-announce mailing list](https://lists.fhcrc.org/mailman/listinfo/scicomp-announce):

### *11:30 am&mdash;1:30 pm Monday, March 28th*

During this brownbag we will go through an example we recently worked on with a research group at Fred Hutch.
The task was to break up an R script into 40,000 small jobs and then distribute these jobs across the Gizmo cluster using more than 1,000 cores.

This tutorial will cover the following topics:

* How to use the 'restart' queue/partition
* How to use a scratch file system effectively
* How to have the system automatically re-run erroneous jobs
* How to build an analysis pipeline where multiple jobs depend on each other
* Demo of the centipede (sce) shell tool for simplified access to the Gizmo cluster

Using these techniques you will find it easier to run jobs in the large capacity restart queue on Gizmo.
Using them will also prepare you for running jobs in the low cost Amazon Web Services spot market in the future.

**Audience**: Researchers who are familiar with writing code in R or Python and who have used Gizmo before.

Register via Eventbrite [here](https://www.eventbrite.com/e/how-to-run-40000-restartable-hpc-jobs-on-gizmo-overnight-brown-bag-tickets-23064573761).
If the class is full, there will be an option to add yourself to the waiting list &mdash; please do so if you're still interested!

You can try the [code and tutorial](https://github.com/FredHutch/slurm-examples/tree/master/centipede) now.
The [presentation](http://fredhutch.github.io/slurm-examples/centipede.html) is also available.

To clone the repository:

```
git clone https://github.com/FredHutch/slurm-examples
```
