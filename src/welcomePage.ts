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

            const neverShow = this.context.globalState.get(Constants.AzureIoTToolsWelcomePageNeverShow);
            html = html.replace("{{Checked}}", neverShow ? "checked" : "");

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
                } else if (message.neverShow !== undefined) {
                    this.context.globalState.update(Constants.AzureIoTToolsWelcomePageNeverShow, message.neverShow);
                }
            });
        } else {
            this.panel.reveal(vscode.ViewColumn.One);
        }
    }

    private needToShow() {
        const neverShow = this.context.globalState.get(Constants.AzureIoTToolsWelcomePageNeverShow);
        if (!neverShow) {
            const version = this.context.globalState.get(Constants.AzureIoTToolsWelcomePageLatestVersion).toString();
            this.context.globalState.update(Constants.AzureIoTToolsWelcomePageLatestVersion, extensionVersion);
            if (semver.valid(version) && semver.gt(extensionVersion, version)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
