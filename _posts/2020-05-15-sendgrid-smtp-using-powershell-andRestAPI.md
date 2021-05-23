---
layout: post
title: "SendGrid SMTP using Powershell and REST API"
date: 2020-05-15 06:31:31 +0530
categories: Sendgrid SMTP REST API
---

Sendgrid stopped accepting `account username` and `password`. I was using powershell cmdlet send-mailmessage to run some of auditing scripts from VM's and it all broken due to this. Final solution with out much modification our script is done by setting username as apikey and password as APIKEYVALUE. Details of the same is available with [SendGrid Support page](https://sendgrid.com/docs/API_Reference/SMTP_API/integrating_with_the_smtp_api.html)

Let me know if this helps you. You can reach me on [twitter](https://twitter.com/ajo_mathew) for any queries.

{% gist a161dbf3b71682e8a69a192ddff1e7d8 %}