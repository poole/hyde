---
layout: post
title: After (lot of ) Hacks - A working way to deploying  Azure SQL on Virtual Machine
  using terraform
date: 2020-05-25 02:00:00.000000000 +05:30
type: post
parent_id: '0'
published: true
password: ''
status: publish
categories: azure
tags:
- Azure
- azurerm
- SQL
- terraform
meta:
  spay_email: ''
  _publicize_job_id: '44655926183'
  _coblocks_attr: ''
  _coblocks_dimensions: ''
  _coblocks_responsive_height: ''
  _coblocks_accordion_ie_support: ''
  advanced_seo_description: ''
  _publicize_done_external: a:1:{s:7:"twitter";a:1:{i:12858665;s:57:"https://twitter.com/ajo_mathew/status/1264383480500310017";}}
  _publicize_done_12865681: '1'
  _wpas_done_12858665: '1'
  publicize_twitter_user: ajo_mathew
  amp_status: ''
  timeline_notification: '1590372915'
  publicize_linkedin_url: ''
  _publicize_done_21581598: '1'
  _wpas_done_22216010: '1'
author: ajo_mathew
permalink: "/2020/05/25/lot-of-hacks-to-deploy-terraform-azure-sql-vm/"
excerpt: 'This post gives you a method to join ARM template and #terraform to deploy
  a SQL VM in #Azure'
---

I am very new with terraform. I was trying to use terraform to deploy an SQL VM to Azure. SQL VM in Azure has undergone lot of changes recently from using `SqlVmIaasExtension` to manage SQL VM instance to a new resource type [`Microsoft.SqlVirtualMachine/SqlVirtualMachines`](https://github.com/Azure/azure-quickstart-templates/blob/master/101-sql-vm-new-storage/azuredeploy.json)

To implement [best practice](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sql/virtual-machines-windows-sql-performance#disks-guidance) of  SQL we had to fall to PowerShell DSC. Now Azure natively support [disk management(new Storage Type)](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/sql/virtual-machines-windows-sql-server-storage-configuration) via SqlVirtualMachine resource type.

I wanted to get new Storage type implemented via terraform [`azurerm_mssql_virtual_machine`](https://www.terraform.io/docs/providers/azurerm/r/mssql_virtual_machine.html). This resource in terraform under module `azurerm` supports everything except new storage types.

{% gist 791054c21ce09481003956af7c56fb47 %}

As seen above the data disk and other options are configurable - terraform is not yet updated with it. I hope to see that update at the earliest. What I left with is the option to use `template` and [`azurerm_template_deployment`](https://www.terraform.io/docs/providers/azurerm/r/template_deployment.html). What this effectively does is creating an ARM template wit new Storage types and deploy them as part of terraform. I used terraform to define vnet, subnet, nsg, data disks, network interface and public IP. Then used template to read files and `azurerm_template_deployment` for deployment. You can see an detailed examples with code samples can be found from this [blog post](https://blog.dbi-services.com/deploying-sql-server-on-azure-virtual-machine-with-terraform/)

All looks good until you encounter an array object to this ARM templates - be it an NSG rule or lun definition it all start to break up. You can read more on the [ug report with terraform here](https://github.com/terraform-providers/terraform-provider-azurerm/issues/34).

I'm yet to find a work around or easier solution for his. For now I made my ARM template simple without any int, bool or array types and some values and deployed them.

Another down side of this method is terraform **does not destroy resource created by a template deployment** but **only delete the template deployment**. When you run terraform destroy you will get message that so and so resource cannot be destroyed. To work around this create all resources with terraform and use ARM template to link resources.

Another approach I should try is by deploying all resources of SQL VM except [`azurerm_mssql_virtual_machine`](https://www.terraform.io/docs/providers/azurerm/r/mssql_virtual_machine.html) and use ARM templates [`Microsoft.SqlVirtualMachine/SqlVirtualMachines`](https://github.com/Azure/azure-quickstart-templates/blob/master/101-sql-vm-new-storage/azuredeploy.json) to define SQL VM properties. Probably that will work.It worked.

## Working Method

1. Created terraform file with resource and their dependencies
- azurerm_resource_group
- azurerm-virtual_network
  - azurerm_subnet
  - azurerm_network_interface
  - azurerm_network_security_group
    - azurerm_subnet_network_security_group_association
  - azurerm_windows_virtual_machine 
    - azurerm_managed_disk
    - azurerm_virtual_machine_data_disk_attachment

2. Create an ARM template to deploy `Microsoft.SqlVirtualMachine/SqlVirtualMachines` and save it in the same directory as terraform files.

3. Using template provider read file as data

  ```json
  # Refer ARM template file of SQL
  data "template_file" "sqlvm" {
    template = file("${path.module}/sqlvm.json")
  }
  ```

`Use these details to create an ARM template deployment using azurerm_template_deployment resource.`

#### Terraform file reference

{% gist e9bb445bea6382a74e0bac3decf24d0f %}

#### SQL ARM Template referenced in

{% gist a3bf1bc6ce00e9e6967af917ae20c222 %}
