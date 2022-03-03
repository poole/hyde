---
layout: post
title: 'Azure DevOpos pipeline Yaml variables not substituting azureResourceManagerConnection'
data: 2022-03-03 06:31:31 +0530
categories: Azure
author: ajo_mathew
excerpt: How to Dual boot Windows and POP-OS with UIEF
tag:
    - Azure
    - DevOps
    - Pipeline
    - YAML
    - Variables
---

While setting up an Azure ARM deployment pipeline using yaml. Below is my `template.yaml` file

``` yaml
parameters:

  - name: azRMConnection
    type: string
  - name: subscriptionID
    type: string
  - name: resourceGroupName
    type: string
  - name: deploymentLocation
    type: string
    default: "[resourceGroup().location]"
  - name: armTemplateFilePath
    type: string
  - name: armTemplateParameterFilePath
    type: string
  - name: overrideParameters
    type: string

steps:
  - task: AzureResourceManagerTemplateDeployment@3
    displayName: "ARM Template Deployment"
    inputs:
      deploymentScope: 'Resource Group'
      azureResourceManagerConnection: '${{parameters.azRMConnection}}'
      deploymentMode: Incremental
      subscriptionId: ${{parameters.subscriptionID}}
      action: 'Create Or Update Resource Group'
      resourceGroupName: ${{parameters.resourceGroupName}}
      location: ${{parameters.deploymentLocation}}
      templateLocation: Linked artifact
      csmFile: ${{parameters.armTemplateFilePath}}
      csmParametersFile: ${{parameters.armTemplateParameterFilePath}}
      overrideParameters: "${{parameters.overrideParameters}}"

```

And this is my actual `main.yaml`
