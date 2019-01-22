// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";
import * as vscode from "vscode";
import { Constants } from "./constants";
import { TelemetryClient } from "./telemetryClient";
import { WelcomePage } from "./welcomePage";

export function activate(context: vscode.ExtensionContext) {
    TelemetryClient.sendEvent("extensionActivated");
    const welcomePage: WelcomePage = new WelcomePage(context);
    welcomePage.checkAndShow();
    const disposable = vscode.commands.registerCommand("azure-iot-tools.showWelcomePage", () => {
        TelemetryClient.sendEvent(Constants.ShowWelcomePageEvent, { trigger: "manual" });
        welcomePage.show();
    });
    context.subscriptions.push(disposable);
}
