// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";
import * as fs from "fs";
import * as path from "path";
import * as semver from "semver";
import * as vscode from "vscode";
import { Constants } from "./constants";
import { TelemetryClient } from "./telemetryClient";

export class WelcomePage {
    private panel: vscode.WebviewPanel;

    constructor(private context: vscode.ExtensionContext) {
    }

    public checkAndShow() {
        if (this.needToShow()) {
            this.show();
            TelemetryClient.sendEvent(Constants.ShowWelcomePageEvent, { trigger: "auto" });
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

            const show = this.context.globalState.get(Constants.ShowWelcomePageAfterUpdating);
            html = html.replace("{{Checked}}", show === false ? "" : "checked");

            this.panel.webview.html = html;
            this.panel.onDidDispose(() => {
                this.panel = undefined;
                const duration = (new Date().getTime() - startTime.getTime()) / 1000;
                TelemetryClient.sendEvent(Constants.CloseWelcomePageEvent, { duration: duration.toString() });
            });
            this.panel.webview.onDidReceiveMessage((message) => {
                if (message.href) {
                    TelemetryClient.sendEvent(Constants.LinkClickEvent, { href: message.href });
                } else if (message.tab) {
                    TelemetryClient.sendEvent(Constants.TabClickEvent, { tab: message.tab });
                } else if (message.show !== undefined) {
                    this.context.globalState.update(Constants.ShowWelcomePageAfterUpdating, message.show);
                }
            });
        } else {
            this.panel.reveal(vscode.ViewColumn.One);
        }
    }

    private needToShow() {
        const show = this.context.globalState.get(Constants.ShowWelcomePageAfterUpdating);
        if (show) {
            const version = this.context.globalState.get(Constants.WelcomePageLatestVersion);
            this.context.globalState.update(Constants.WelcomePageLatestVersion, Constants.extensionVersion);
            if (version && semver.valid(version.toString()) && semver.gt(Constants.extensionVersion, version.toString())) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
