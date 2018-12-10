// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { Constants } from "./constants";

export class WelcomePage {
    private panel: vscode.WebviewPanel;

    constructor(private context: vscode.ExtensionContext) {
    }

    public checkAndShow() {
        if (!this.context.globalState.get(Constants.IsAzureIoTToolsWelcomePageShown)) {
            this.show();
            this.context.globalState.update(Constants.IsAzureIoTToolsWelcomePageShown, true);
        }
    }

    public show() {
        if (!this.panel) {
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
            });
        } else {
            this.panel.reveal(vscode.ViewColumn.One);
        }
    }
}
