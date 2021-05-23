---
layout: post
title: Uninstall Az Powershell Module forcefully and completely
date: 2020-06-08 10:00:00.000000000 +05:30
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories:
- Scripts
- VSCode
tags:
- Azure
- Powershell
meta:
  timeline_notification: '1591591880'
  _publicize_done_21581598: '1'
  publicize_linkedin_url: ''
  _publicize_job_id: '45201916849'
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:12858665;s:57:"https://twitter.com/ajo_mathew/status/1269854505111347200";}}
  _publicize_done_12865681: '1'
  _wpas_done_12858665: '1'
  publicize_twitter_user: ajo_mathew
  _wpas_done_22216010: '1'
author: ajo_mathew
---

I'm mostly using powershell to address Azure automation activitites be it from running from local or from Azure itself. The most painful task encountered is about upgrading powershell Az modules and keeping them work with VsCode.


After lot of trial and error this is the best method I could recommend to uninstall powershell Az module 

``` powershell
Get-installedmodule Az.*| foreach-object{Uninstall-Module -Name $_.Name -Verbose -AllVersions -force}
```

If you encounter issue with running above code snippet from no-Admin account switch to Admin account. Incase Az.Accounts is adamant in getting uninstalled, open a cmd - As Administrator and run below command. This will rid your system of Az modules.

``` powershell
powershell -NoProfile -NonInteractive -Command "Uninstall-Module Az.Accounts"
```

Few things learned the hard way when using Powershell extension with VSCode

- Always install under user scope - never install from an Admin console unless you require it. This will make sure that vscode does not consume much of resource.
- If you are using a company machine and it has Admin Privilege escalation control software , installing under user scope can help very much- can avoid lot of force exists on vscode side.

``` powershell
if ($PSVersionTable.PSEdition -eq 'Desktop' -and (Get-Module -Name AzureRM -ListAvailable))
{
  Write-Warning -Message ('Az module not installed. Having both the AzureRM and ' +'Az modules installed at the same time is not supported.')
} else{
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}
  ```
