import fs from "fs/promises";
import path from "path";

import { IpcMainInvokeEvent, dialog } from "electron";
import type { BrowserWindow } from "electron";
import xmlJs from "xml-js";

export type ApiMethod = "load-data-folder" | "some-other-method";

export class Api {
  constructor(private mainWindow: BrowserWindow) {}

  // TODO: type return
  public async handleMethod(
    event: IpcMainInvokeEvent,
    method: ApiMethod,
    params: any
  ): Promise<any> {
    console.log("handle api", { event, method, params });
    switch (method) {
      case "load-data-folder":
        return this.loadDataFolder();
      default:
        throw new Error(`Unhandled api method ${method}`);
    }
  }

  private async loadDataFolder(): Promise<xmlJs.ElementCompact | null> {
    const selectedFolder = dialog.showOpenDialog(this.mainWindow, {
      title: "Select RC-600 data folder",
      properties: ["openDirectory"],
    });
    if (!selectedFolder) {
      return null;
    }

    // read memory 001A from file
    const memory1Path = path.join(
      (await selectedFolder).filePaths[0],
      "MEMORY001A.RC0"
    );
    let memory1XmlContent = await fs.readFile(memory1Path, "utf-8");

    // TODO: capture round-tripping this. need to remember this "count" value and
    // flip between <#> and <AA>
    memory1XmlContent = memory1XmlContent.replaceAll("#>", "hash>");
    memory1XmlContent = memory1XmlContent.replaceAll(
      /<(\/?)(\d)>/g,
      "<$1numprefix$2>"
    );
    // remove the final "count" orphan
    const memory1XmlContentLines = memory1XmlContent.split("\n");
    memory1XmlContentLines.pop();

    // xml to js
    const memory1Json = xmlJs.xml2js(memory1XmlContentLines.join("\n"), {
      compact: true,
    });
    return memory1Json;
  }
}
