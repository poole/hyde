---
layout: post
title: 'Azure Container Groups for hosting ?'
data: 2020-07-25 06:31:31 +0530
categories: azure
author: ajo_mathew
excerpt: Some limitations of Azure Container instances
tag:
    - ACI
    - Azure
    - Azure container instances
---

Few days ago I was in need of a quick and easy option to host few containers with Azure for one of my Demos. I didn't want to go with the headache of having an AKS or VM with docker installed. So I picked ACI ( Azure Container Instance ) with an nginx vm for reverse proxy - Since this was to be presented quick we we went the dirty way.

I could've gone with direct ACI URLs right ? but sadly no since DNS/firewall would mark the URL as malware in five minutes of creation - too great of a protection.

### Why not Webapps '?'

Yea webapps will work as long as your application runs directly at port 80 or 443 anything beyond that is forbidden. Our quick dirty demo was hosted with an `npm mysite.js` against port 3000 with Nro4j database backend.

`Why not webapp with nginx side car ?` no time too lazy. I would probably later look at this option once I've ample time to play further around with it.

As I've layed out the plot with all actors. Let me go into the problem with ACI

### Curious case of Azure Container instance

In my solution I was using nginx reverse proxy to server web application. For that I created a vnet and bound ACI - Azure Container Group to be precise - to the vnet. ACI was given a private IP address so not all my database ports are not exposed to public, a VM existing in the vnet with public IP would proxy pass the request to correct ports of container instance.

#### All is well untill you stop and start ACI

Everything here works untill Azure Container Group/ ACI is stopped and started.
Azure container instance restart was throwing error messages in the time of this writing - a false positive saying containers were not restarted but in actual they were. So I resorted to Azure Support and they've passed the issue to Engineering team as a bug for fixing. All this drama unwind while my deadline was 3 hours ago.
Finally I figured out.

- Restarting ACI would in actual restart ACI even the error is thrown
- While stopping and starting is done private IP address don't change 

There are no reference to any Azure document  about state of private IP address when stopped then started and a restart - if it will change or not change. 
It would be great if we can get a confirmation about this behaviour in Azure documentation so people like us don't have to eat Azure's dog food.

### Take away

- Azure Container instance private IP address changes when stopped and started
- Azure Container instance private IP address does not change when restarted
- `Even if Azure report error while restarting ACI it in actual restarts` - Yet to be updated by Azure Engineering team

## If you want to test

Go ahead and launch An Azure Container instance - easier if you can do it with this [**ARM template**](https://github.com/Azure/azure-quickstart-templates/tree/master/201-aci-wordpress-vnet) to deploy a wordpress blog with application gateway
