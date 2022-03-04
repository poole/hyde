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

And this is my actual `main.yaml` looks like

```yaml
stages:
  - stage: deployLogAnalytics
    displayName: "Deploying Basic component - OMS"
    pool:
      name: DP-DevTest
    jobs:
      - job:
        displayName: "Deploy Standard Components"
        variables:
          - group: 'Test-Infra-Pipeline'
        steps:
          - template: .\templates\deployARM.yaml
            parameters:
              azRMConnection: $(serviceConnection)
              subscriptionID: $(subscriptionID)
              resourceGroupName: $(resourceGroup)
              deploymentLocation: $(deploymentLocation)
              armTemplateFilePath: $(Build.Repository.LocalPath)\ARMTemplates\AzureLogAnalytics\logAnalytics.json
              armTemplateParameterFilePath: $(Build.Repository.LocalPath)\ARMTemplates\AzureLogAnalytics\logAnalytics.parameters.json
              overrideParameters: -envId $(envId) -vnetName $(vnetName) -subnetName $(subnetName) -networkResourceGroup $(networkResourceGroup)

```
Variable `serviceConnection` is defined in Variable groups and referenced by pipeline yaml file. While the pipeline runs it does not transform to actual value.

Azure DevOps is unable to parse the variable `$(serviceConnection)` but directly pass the value to task. This issue or similar reported as a bug in [github](https://github.com/microsoft/azure-pipelines-tasks/issues/14365)

As a work around we have to hard code the connection string name in our main or azure-pipeline yaml file as shown below 


And this is my actual `main.yaml` looks like

```yaml
variables:
  - group: 'Pipeline-vars'
  - name: serviceConnection
    value: $[replace(replace(eq(variables['azServiceConnection'],'prod'), 'True', 'prod-connection'), 'False', 'dev-connection')]

stages:
  - stage: deployLogAnalytics
    displayName: "Deploying Basic component - OMS"
    pool:
      name: DP-DevTest
    jobs:
      - job:
        displayName: "Deploy Standard Components"
        variables:
          - group: 'Test-Infra-Pipeline'
        steps:
          - template: .\templates\deployARM.yaml
            parameters:
              azRMConnection: $(serviceConnection)
              subscriptionID: $(subscriptionID)
              resourceGroupName: $(resourceGroup)
              deploymentLocation: $(deploymentLocation)
              armTemplateFilePath: $(Build.Repository.LocalPath)\ARMTemplates\AzureLogAnalytics\logAnalytics.json
              armTemplateParameterFilePath: $(Build.Repository.LocalPath)\ARMTemplates\AzureLogAnalytics\logAnalytics.parameters.json
              overrideParameters: -envId $(envId) -vnetName $(vnetName) -subnetName $(subnetName) -networkResourceGroup $(networkResourceGroup)

```

