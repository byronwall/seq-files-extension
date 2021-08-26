"use strict";
import * as vscode from "vscode";
import { SeqFileDefinitionProvider } from "./SeqFileDefinitionProvider";
import { SeqFileReferenceProvider } from "./SeqFileReferenceProvider";
import { SeqFileFormattingProvider } from "./SeqFileFormattingProvider";
import { SeqFileDocumentSymbolProvider } from "./SeqFileDocumentSymbolProvider";

// src/extension.ts

export function activate(ctx: vscode.ExtensionContext) {
  const SEQ_MODE = { scheme: "file", language: "seq" };
  ctx.subscriptions.push(
    vscode.languages.registerDocumentSymbolProvider(
      SEQ_MODE,
      new SeqFileDocumentSymbolProvider()
    )
  );

  ctx.subscriptions.push(
    vscode.languages.registerDefinitionProvider(
      SEQ_MODE,
      new SeqFileDefinitionProvider()
    )
  );
  ctx.subscriptions.push(
    vscode.languages.registerReferenceProvider(
      SEQ_MODE,
      new SeqFileReferenceProvider()
    )
  );
  ctx.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      SEQ_MODE,
      new SeqFileFormattingProvider()
    )
  );
}
