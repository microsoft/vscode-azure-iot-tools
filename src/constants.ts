// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

"use strict";
import * as vscode from "vscode";

export class Constants {
    public static WelcomePageLatestVersion = "WelcomePageLatestVersion";
    public static ShowWelcomePageAfterUpdating = "ShowWelcomePageAfterUpdating";
    public static ShowWelcomePageEvent = "General.WelcomePage.Show";
    public static CloseWelcomePageEvent = "General.WelcomePage.Close";
    public static LinkClickEvent = "General.WelcomePage.LinkClick";
    public static TabClickEvent = "General.WelcomePage.TabClick";
    public static ExtensionId = "vsciot-vscode.azure-iot-tools";
    public static packageJSON = vscode.extensions.getExtension(Constants.ExtensionId).packageJSON;
    public static extensionVersion: string = Constants.packageJSON.version;
    public static aiKey: string = Constants.packageJSON.aiKey;
}
