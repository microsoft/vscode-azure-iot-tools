# Azure IoT Tools for Visual Studio Code
[Microsoft Azure IoT](https://azure.microsoft.com/en-us/overview/iot/
) support for Visual Studio Code is provided through a rich set of extensions that make it easy to interact with Azure IoT Hub that power your IoT applications.

> If you do not have an Azure subscription, [sign up today](https://azure.microsoft.com/en-us/free/?b=16.48) for a free account. You'll get 12 months of popular free services, **$200** in Azure Credits to try out any combination of Azure services, and access to 25+ always free services such as Azure IoT Hub, DevTest Labs, and Service Fabric.


## Extensions Included

By installing Azure IoT Tools, the following extensions are installed:

- [📦 Azure IoT Toolkit Extension ](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit)
    - IoT Device Management
    - IoT Edge Management
    - Module management
    - Interact with Azure IoT Hub
    - Interact with Azure IoT Edge
    - IoT Hub Code Generation

- [📦 Azure IoT Edge Extension ](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-edge)
    - Create new IoT Edge solution
    - Add new IoT Edge module to Edge solution
    - Build and publish IoT Edge modules
    - Debug IoT Edge modules locally and remotely
    - IntelliSense and code snippets for the deployment manifest
    - Manage IoT Edge devices and modules in IoT Hub (with Azure IoT Toolkit)
    - Deploy IoT solutions to IoT Edge devices

- [📦 Azure IoT Workbench ](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-iot-workbench)
    - Popular IoT development kits / boards supported
    - Automatically detects development kits
    - Full-fledged IntelliSense support when developing on development kits 
    - Flexible architecture to support more device platform compilers
    - Sample code and mini solutions
    - Cloud solution templates

## Azure IoT Toolkit Extension

[ Azure IoT Toolkit Extension ](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-toolkit) can help user to interact with Azure IoT Hub, management IoT Device, management IoT Edge, and generation code.

### Device Explorer
The [Wiki page](https://github.com/Microsoft/vscode-azure-iot-toolkit/wiki) includes a comprehensive getting started guide as well as detailed usage instructions of the following features:

* IoT Hub management
* Device management
* Module management
* Interact with Azure IoT Hub
* Interact with Azure IoT Edge

### Code Generation
* Right-click your device and select Generate Code, then select language and code template, code will be generated in editor area. Supporting language including C#, Go, HTTP, Java, Node.js, PHP, Python and Ruby.

* Available Code snippets are listed below

    | Trigger | Content |
    | ---- | ---- |
    | iotSendD2CMessage | Send D2C message to IoT Hub |
    | iotMonitorD2CMessage | Monitor D2C message for IoT Hub |
    | iotSendC2DMessage | Send C2D message to device |
    | iotMonitorC2DMessage | Monitor C2D message from IoT Hub |
    | iotCallDirectMethods | Send direct methods to device |
    | iotReceiveDirectMethods | Receive direct methods from IoT Hub |

> After code snippet is created, you need to install corresponding npm package (e.g. [azure-iot-device-mqtt](https://www.npmjs.com/package/azure-iot-device-mqtt)) to run the code snippet. If you want to 'Run Code' directly, you need to install [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner).

## Azure IoT Edge Extension

[Azure IoT Edge extension](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.azure-iot-edge) makes it easy to code, build, deploy, and debug your [IoT Edge](https://docs.microsoft.com/azure/iot-edge/how-iot-edge-works) solutions in Visual Studio Code, by providing a rich set of functionalities:

- Create new IoT Edge solution
- Add new IoT Edge module to Edge solution
- Build and publish IoT Edge modules
- Debug IoT Edge modules locally and remotely
- IntelliSense and code snippets for the deployment manifest
- Manage IoT Edge devices and modules in IoT Hub
- Deploy IoT solutions to IoT Edge devices

Click the links below to learn how to develop, debug and deploy IoT Edge modules.

- [C# module](https://docs.microsoft.com/azure/iot-edge/tutorial-csharp-module)
- [C# Functions on IoT Edge](https://docs.microsoft.com/azure/iot-edge/tutorial-deploy-function)
- [Python module](https://docs.microsoft.com/azure/iot-edge/tutorial-python-module)
- [Node.js module](https://docs.microsoft.com/azure/iot-edge/tutorial-node-module)
- [Java module](https://docs.microsoft.com/azure/iot-edge/tutorial-java-module)
- [C module](https://docs.microsoft.com/azure/iot-edge/tutorial-c-module)

## Azure IoT Workbench Extension

[ IoT Workbench extension ](https://marketplace.visualstudio.com/items?itemName=vsciot-vscode.vscode-iot-workbench#user-content-setup-guide) provides an integration development environment makes it easy to code, build, deploy and debug on IoT development kits / boards with multiple Azure services supported. IoT Workbench aims to support multiple popular IoT development boards and kits. It currently supports following IoT hardware:
- [MXChip IoT DevKit](https://aka.ms/iot-devkit)
- [teXXmo IoT button](https://aka.ms/button)
- [Raspberry Pi](https://www.raspberrypi.org/)
- [ESP32](https://www.espressif.com/en/products/hardware/esp-wroom-32/overview)

Device
- Popular IoT development kits / boards supported (e.g. MXChip IoT DevKit, ESP32 DevKit, Raspberry Pi, Azure IoT Button)
- Automatically detects development kits and set up their toolchains / SDKs 
- Full-fledged IntelliSense support when developing on development kits 
- Flexible architecture to support more device platform compilers 

Cloud 
- Easy access to sample code and mini solutions guide learnings of Azure IoT services (e.g. IoT Hub, IoT Central, Solution Accelerator).
- Cloud solution templates that support quickly scaffold of IoT solution.

## Installation

By installing this extension you will install all of the extensions listed above. Some of these extensions will have a dependency on the [Azure Account extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account) to provide a single Azure login and subscription filtering experience.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## License

[MIT](LICENSE)
