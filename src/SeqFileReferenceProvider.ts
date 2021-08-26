import * as vscode from "vscode";

export class SeqFileReferenceProvider implements vscode.ReferenceProvider {
  provideReferences(
    document: vscode.TextDocument,
    position: vscode.Position,
    context: vscode.ReferenceContext,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.Location[]> {
    const range = document.getWordRangeAtPosition(position);
    const selectedWord = document.getText(range);

    let definitions: vscode.Definition = [];
    for (let i = 0; i < document.lineCount; i++) {
      let eachLine = document.lineAt(i).text;

      const startCol = eachLine.indexOf(selectedWord);
      if (startCol > -1) {
        const endCol = startCol + selectedWord.length;

        const range = new vscode.Range(i, startCol, i, endCol);

        definitions.push({
          uri: document.uri,
          range,
        });
      }
    }
    return definitions;
  }
}
