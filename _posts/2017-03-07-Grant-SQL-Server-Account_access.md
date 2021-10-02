---
layout: post
title: Grant SQL Server account access to Lock Pages in Memory using PowerShell DSC.
date: 2017-03-07 16:54:37.000000000 +05:30
type: post
categories: SQL
excerpt: How to log rotate and upload files Azure blob
tag:
- SQL
- PowerShell
- DSC
meta:
  timeline_notification: '1525798482'
  _rest_api_published: '1'
  _rest_api_client_id: "-1"
  _publicize_job_id: '17626891689'
  _publicize_done_external: a:2:{s:8:"facebook";a:1:{i:1959598;s:38:"https://facebook.com/10211757460713471";}s:7:"twitter";a:1:{i:12858665;s:56:"https://twitter.com/ajo_mathew/status/993896998595170306";}}
  _publicize_done_2350357: '1'
  _wpas_done_1959598: '1'
  _publicize_done_12865681: '1'
  _wpas_done_12858665: '1'
  publicize_twitter_user: ajo_mathew
author: ajo_mathew
---
Lock Pages in Memory is a setting that can be set on 64-bit operating systems that essentially tell Windows not to swap out SQL Server memory to disk.

I was implementing SQL server hardening via PowerShell DSC and one of the requirement was to have Lock Pages In Memory enabled for SQL Service account. There was a powershell script created and available from [blog post](http://keepingitgeek.blogspot.com/2015/01/grant-sql-server-account-access-to-lock.html) by keepingitgeek.

I converted this to a DSC module for my use. The code snippet is added below.

{% gist 4d1f64193d068854227080d5234fd336 %}
