"use strict";
import * as vscode from "vscode";

export class SeqFileDocumentSymbolProvider
  implements vscode.DocumentSymbolProvider
{
  public provideDocumentSymbols(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): Promise<vscode.DocumentSymbol[]> {
    return new Promise((resolve) => {
      let symbols: vscode.DocumentSymbol[] = [];

      let symbol_marker = vscode.SymbolKind.Function;

      for (var i = 0; i < document.lineCount; i++) {
        var line = document.lineAt(i);

        let tokens = line.text.split(" ");

        if (line.text.startsWith("procedure")) {
          let marker_symbol = new vscode.DocumentSymbol(
            tokens[1],
            "procedure",
            symbol_marker,
            line.range,
            line.range
          );

          symbols.push(marker_symbol);
        }
      }

      resolve(symbols);
    });
  }
}
