// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { WelcomePage } from "./welcomePage";

export function activate(context: vscode.ExtensionContext) {
    // Disable welcome page before it is ready
    //const welcomePage: WelcomePage = new WelcomePage(context);
    //welcomePage.checkAndShow();
    let disposable = vscode.commands.registerCommand("azure-iot-tools.showWelcomePage", () => {
        //welcomePage.show();
    });
    context.subscriptions.push(disposable);
}
