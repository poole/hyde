---
layout: post
title: 'Azure ARM template copy function - Using Objects as parameters with multiple resource properties'
data: 2021-10-30 06:31:31 +0530
categories: Azure
author: ajo_mathew
excerpt: How to Dual boot Windows and POP-OS with UIEF
tag:
    - Azure
    - ARM
    - Function
    - Copy Function
    - multiple resource properties
---
I was following this [Azure Document](https://docs.microsoft.com/en-us/azure/architecture/guide/azure-resource-manager/advanced-templates/objects-as-parameters) to try out Azure ARM copy operation to loop through properties of an azure resource. Looks like the page was not updated correctly so I raised an issue with the [MS Docs github page](https://docs.microsoft.com/en-us/azure/architecture/guide/azure-resource-manager/advanced-templates/objects-as-parameters). This was just minor change - where NSG properties were not correctly reprsented in that example document.
You can follow below correct ARM templates.

### ARM template
{% gist 659a893a3a941d72f824e0f703c13fda %}
### Parameter
{% gist c4bcdc862196719e79c010d1d61dc4d9 %}

## Using Copy to update multiple properties for a resource.
> Note: I am not using full ARM templates but snippets - Assumption is that you know basics of ARM templates.
My requirement was to get Azure ARM copy function to update multiple properties in an ARM template.

For example I am creating an Azure WAF/Application Gateway. The code of the resource would look like below

``` json
{
    "name": "[parameters('applicationGatewayName')]",
    "type": "Microsoft.Network/applicationGateways",
    "apiVersion": "2019-09-01",
    "location": "[parameters('location')]",
    "zones": "[parameters('zones')]",
    "dependsOn": [
        "[concat('Microsoft.Network/virtualNetworks/', parameters('virtualNetworkName'))]",
        "[concat('Microsoft.Network/publicIPAddresses/', parameters('publicIpAddressName'))]"
    ],
    "tags": {},
    "properties": {
        "sku": {
            "name": "[parameters('skuSize')]",
            "tier": "[parameters('tier')]",
            "capacity": "[parameters('capacity')]"
        },
        "gatewayIPConfigurations": [
            {
                "name": "appGatewayIpConfig",
                "properties": {
                    "subnet": {
                        "id": "[variables('subnetRef')]"
                    }
                }
            }
        ],
        "frontendIPConfigurations": [
            {
                "name": "appGwPublicFrontendIp",
                "properties": {
                    "PublicIPAddress": {
                        "id": "[variables('publicIPRef')]"
                    }
                }
            },
            {
                "name": "appGwPrivateFrontendIp",
                "properties": {
                    "subnet": {
                        "id": "[variables('subnetRef')]"
                    },
                    "privateIPAddress": "[parameters('privateIpAddress')]",
                    "privateIPAllocationMethod": "Static"
                }
            }
        ],
        "frontendPorts": [
            {
                "name": "port_80",
                "properties": {
                    "Port": 80
                }
            }
        ],
        "backendAddressPools": [
            {
                "name": "dataikubackendpool",
                "properties": {
                    "backendAddresses": [
                        {


                            "copy": [
                                {
                                    "name": "subnets",
                                    "count": 2,
                                    "input": {

                                        "fqdn": "parameters('backend')[copyIndex('subnets')]"
                                    }

                                }
                            ]
                        }

                    ]
                }

            }
        ],

        "backendHttpSettingsCollection": [
            {
                "name": "httpsettings",
                "properties": {
                    "Port": 80,
                    "Protocol": "Http",
                    "cookieBasedAffinity": "Disabled",
                    "requestTimeout": 20
                }
            }
        ],
        "httpListeners": [
            {
                "name": "dataikulisteneter",
                "properties": {
                    "frontendIPConfiguration": {
                        "id": "[concat(variables('applicationGatewayId'), '/frontendIPConfigurations/appGwPrivateFrontendIp')]"
                    },
                    "frontendPort": {
                        "id": "[concat(variables('applicationGatewayId'), '/frontendPorts/port_80')]"
                    },
                    "protocol": "Http",
                    "sslCertificate": null
                }
            }
        ],
        "requestRoutingRules": [
            {
                "Name": "dataikuroutingrule",
                "properties": {
                    "RuleType": "Basic",
                    "httpListener": {
                        "id": "[concat(variables('applicationGatewayId'), '/httpListeners/this_place_holder')]"
                    },
                    "priority": null,
                    "backendAddressPool": {
                        "id": "[concat(variables('applicationGatewayId'), '/backendAddressPools/this_place_holder')]"
                    },
                    "backendHttpSettings": {
                        "id": "[concat(variables('applicationGatewayId'), '/backendHttpSettingsCollection/httpsettings')]"
                    }
                }
            }
        ],
        "enableHttp2": false,
        "sslCertificates": [],
        "probes": []
    }
}
```

My reqirement is to parameterize `resources[0]."type       : Microsoft.Network/applicationGateways".` properties frontend ports and backend http settings.
I want to  pass below parameters and have Azure Copy to take care of the task - snippet from parameters.json as snow below.
``` json
"frontendPortsAvailable": {
            "value": {
                "frontendPorts": [
                    {
                        "name": "port_80",
                        "Port": 80
                    },
                    {
                        "name": "port_8080",
                        "Port": 8080
                    }
                ]
            }
        },
        "backendHttpSettingsCollection": {
            "value": {
                "backendHttpSettings": [
                    {
                        "name": "http_80Settings",
                        "port": 80,
                        "Protocol": "Http",
                        "cookieBasedAffinity": "Disabled",
                        "requestTimeout": 20
                    },
                    {
                        "name": "http_8080Settings",
                        "port": 8080,
                        "Protocol": "Http",
                        "cookieBasedAffinity": "Disabled",
                        "requestTimeout": 20
                    },
                    {
                        "name": "http_8081Settings",
                        "port": 8081,
                        "Protocol": "Http",
                        "cookieBasedAffinity": "Disabled",
                        "requestTimeout": 20
                    }
                ]
            }
        }
```
I have my templates.json variables as 
``` json
        "frontendPortsAvailable": {
            "type": "object"
        },
        "backendHttpSettingsCollection": {
            "type": "object"
        }
```

When I tried to use multiple copy nodes inside ARM templates my vscode has warned me this is not allowed.
``` json
"copy": [
                    {
                        "name": "frontendPorts",
                        "count": "[length(parameters('frontendPortsAvailable').frontendPorts)]",
                        "input": {
                            "name": "[parameters('frontendPortsAvailable').frontendPorts[copyIndex('frontendPorts')].name]",
                            "properties": {
                                "Port": "[parameters('frontendPortsAvailable').frontendPorts[copyIndex('frontendPorts')].Port]"
                            }
                        }
                    }],
"copy":[
					{
                        "name": "backendHttpSettingsCollection",
                        "count": "[length(parameters('backendHttpSettingsCollection').backendHttpSettings)]",
                        "input": {
                            "name": "[parameters('backendHttpSettingsCollection').backendHttpSettings[copyIndex('backendHttpSettingsCollection')].name]",
                            "properties": {
                                "Port": "[parameters('backendHttpSettingsCollection').backendHttpSettings[copyIndex('backendHttpSettingsCollection')].port]",
                                "Protocol": "[parameters('backendHttpSettingsCollection').backendHttpSettings[copyIndex('backendHttpSettingsCollection')].Protocol]",
                                "cookieBasedAffinity": "[parameters('backendHttpSettingsCollection').backendHttpSettings[copyIndex('backendHttpSettingsCollection')].cookieBasedAffinity]",
                                "requestTimeout": "[parameters('backendHttpSettingsCollection').backendHttpSettings[copyIndex('backendHttpSettingsCollection')].requestTimeout]"

                            }
                        }
                    }
                ]
```
_it is sooo ❤ good that VS code intelisense was able to point out mistakes_
The final templates and parameters looks as below.

**Template**
{% gist 88ce62b3eb21f3f54c94365ce0ad9c70 %}
**Parameters**
{% gist b8abe83ba24528ae40b94a38252d20ba %}
