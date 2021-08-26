import * as vscode from "vscode";

export class SeqFileFormattingProvider
  implements vscode.DocumentFormattingEditProvider
{
  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {
    const add_indent = [
      "loop",
      "while",
      "procedure",
      "switch",
      "case",
      "default",
      "if",
    ];
    const remove_indent = ["end", "end_procedure"];

    const results: vscode.TextEdit[] = [];

    let indent_level = 0;
    let prev_line_blank = false;

    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      let lineText = line.text;

      const line_trimmed = lineText.trim();

      if (line_trimmed == "") {
        // skip a double blank
        if (prev_line_blank) {
          results.push(vscode.TextEdit.delete(line.rangeIncludingLineBreak));
          continue;
        }

        prev_line_blank = true;
      } else {
        prev_line_blank = false;
      }

      const firstPart = line_trimmed.toLowerCase().split(" ")[0];
      // need to remove indent before printed
      const shouldRemove = remove_indent.some((adder) => firstPart == adder);
      if (shouldRemove) {
        indent_level -= 1;
      }

      if (indent_level < 0) {
        vscode.window.showErrorMessage(
          "Auto format failed: indent level went negative at line: " + i
        );
        return undefined;
      }

      const new_line = "\t".repeat(indent_level) + line_trimmed;

      const replaceRange = new vscode.Range(i, 0, i, lineText.length);
      results.push(vscode.TextEdit.replace(replaceRange, new_line));

      const shouldAdd = add_indent.some((adder) => firstPart === adder);
      if (shouldAdd) {
        indent_level += 1;
      }
    }

    if (indent_level !== 0) {
      vscode.window.showErrorMessage(
        "Auto format likely failed: indent level did not return to 0 -- find the spot where indenting goes wild to fix"
      );
    }

    return results;
  }
}
