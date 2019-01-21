// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";
import * as fs from "fs";
import * as path from "path";
import * as semver from "semver";
import * as vscode from "vscode";
import { Constants } from "./constants";
import { TelemetryClient } from "./telemetryClient";

const packageJSON = vscode.extensions.getExtension(Constants.ExtensionId).packageJSON;
const extensionVersion: string = packageJSON.version;

export class WelcomePage {
    private panel: vscode.WebviewPanel;

    constructor(private context: vscode.ExtensionContext) {
    }

    public checkAndShow() {
        if (this.needToShow()) {
            this.show();
            TelemetryClient.sendEvent(Constants.AzureIoTToolsShowWelcomePagetEvent, { trigger: "auto" });
            this.context.globalState.update(Constants.IsAzureIoTToolsWelcomePageShown, extensionVersion);
        }
    }

    public show() {
        if (!this.panel) {
            const startTime = new Date();
            this.panel = vscode.window.createWebviewPanel(
                "welcomePage",
                "Welcome to Azure IoT Tools",
                vscode.ViewColumn.One,
                {
                    enableCommandUris: true,
                    enableScripts: true,
                    retainContextWhenHidden: true,
                },
            );
            let html = fs.readFileSync(this.context.asAbsolutePath(path.join("resources", "welcome", "index.html")), "utf8");
            html = html.replace(/{{root}}/g, vscode.Uri.file(this.context.asAbsolutePath(".")).with({ scheme: "vscode-resource" }).toString());
            this.panel.webview.html = html;
            this.panel.onDidDispose(() => {
                this.panel = undefined;
                const duration = (new Date().getTime() - startTime.getTime()) / 1000;
                TelemetryClient.sendEvent(Constants.AzureIoTToolsCloseWelcomePageEvent, { duration: duration.toString() });
            });
            this.panel.webview.onDidReceiveMessage((message) => {
                if (message.href) {
                    TelemetryClient.sendEvent(Constants.AzureIoTToolsLinkClickEvent, { href: message.href });
                } else if (message.tab) {
                    TelemetryClient.sendEvent(Constants.AzureIoTToolsTabClickEvent, { tab: message.tab });
                }
            });
        } else {
            this.panel.reveal(vscode.ViewColumn.One);
        }
    }

    private needToShow() {
        const version = this.context.globalState.get(Constants.IsAzureIoTToolsWelcomePageShown);
        if (semver.valid(version) && semver.gt(extensionVersion, version)) {
            return true;
        } else {
            return false;
        }
    }
}
