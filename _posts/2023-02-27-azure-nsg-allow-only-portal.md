---
layout: post
title: 'Use Azure NSG and Azure Service Tags to block internet and allow to Azure Portal'
data: 2023-02-27 06:31:31 +0530
categories: Azure
author: ajo_mathew
excerpt: Azure NSG and Azure Service Tags to block all connection except to Azure Portal, this is an undocumented feature available with Azure
tag:
    - Azure
    - NSG
    - Azure Network Service Tags
---

My Client got a requirement to block internet access inside a Subnet \ Vnet only using NSG and allow exception to Azure Portal.

Client is using Azure Private Endpoints to enable private access to Azure Storage , Databricks and other services.

A requirement from security team is to lock Azure Vnet & Subnet from internet and enable only direct Portal access.

Azure Documentation on Service Tags never mention about `AzurePortal` service tag but I was able to find it while checking outboud NSG rule.

With below combination of Azure Tags I managed to enable Azure Portal access and block internet.

Azure Service Tag combinations used with priority

 * AzurePortal (400)
 * AzureActiveDirectory (410)
 * AzureFrontDoor.Backend (420)
 * AzureTrafficManager (430)
 * AzureFrontDoor.Frontend (440)
 * AzureResourceManager (450)
 
With Priority 500 I have set up a rule to block all internet access from Virtual network

||Priority || Name || Port || Pritocol || Source || Destination || Action ||
| 500 | Block Outbound internet | Any | Any | Virtualnetwork(Tag) | Internet (tag)| Deny|