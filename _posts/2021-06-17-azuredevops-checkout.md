---
layout: post
title: 'Azure DevOps | CI - Pipeline failing on checkout'
data: 2021-06-17 06:31:31 +0530
categories: azure-devops
author: ajo_mathew
excerpt: Azure DevOps CI failure upon checkout
tag:
    - Git
    - Azure DevOps
    - CI
    - Automation
    - tips
---

I had configured CI build for every pull request, which started failing all of a sudden with below sets of error

``` bash
error: cannot lock ref 'refs/remotes/origin/release': there is a non-empty directory '.git/refs/remotes/origin/release' blocking reference 'refs/remotes/origin/release'
 ! [new branch]      release    -> origin/release  (unable to update local ref)
##[warning]Git fetch failed with exit code 1, back off 9.729 seconds before retry.
git -c http.extraheader="AUTHORIZATION: bearer ***" fetch --force --tags --prune --progress --no-recurse-submodules origin +refs/heads/*:refs/remotes/origin/* +refs/pull/2476/merge:refs/remotes/pull/2476/merge
error: cannot lock ref 'refs/remotes/origin/release': there is a non-empty directory '.git/refs/remotes/origin/release' blocking reference 'refs/remotes/origin/release'

```

I tried clearning the checkout dir in my custom Azure DevOps build agent. After a lot of banging my head I found the root cause.

> I was playing with branching stratagy and created a new `releaes` branch. The name of the branch was `release`

This was causing conflict when the CI build runs.

_Lession learned_ : Don't create a branch named as `release` if you are running CI with Azure DevOps
