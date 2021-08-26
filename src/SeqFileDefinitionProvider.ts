import * as vscode from "vscode";

// let orange = vscode.window.createOutputChannel("Orange");

export class SeqFileDefinitionProvider implements vscode.DefinitionProvider {
  public provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken
  ): Thenable<vscode.Definition> {
    return new Promise((resolve, reject) => {
      const range = document.getWordRangeAtPosition(position);
      const selectedWord = document.getText(range);

      let definitions: vscode.Definition = [];
      for (let i = 0; i < document.lineCount; i++) {
        let eachLine = document.lineAt(i).text.trim();
        if (
          eachLine.startsWith("procedure") ||
          eachLine.startsWith("#define")
        ) {
          if (eachLine.includes(selectedWord)) {
            definitions.push({
              uri: document.uri,
              range: document.lineAt(i).range,
            });
          }
        }
      }
      resolve(definitions);
    });
  }
}
