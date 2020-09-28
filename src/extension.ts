// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Extension "jsontoelixir" is now active.');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "jsontoelixir.convert",
    () => {
      // The code you place here will be executed every time your command is executed
      convertToElixir(false);

      // Display a message box to the user
      vscode.window.showInformationMessage("Converted JSON to Elixir.");
    }
  );

  let disposableOk = vscode.commands.registerCommand(
    "jsontoelixir.convertWithOk",
    () => {
      // The code you place here will be executed every time your command is executed
      convertToElixir(true);

      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Converted Json to Elixir adding an OK tuple."
      );
    }
  );

  context.subscriptions.push(disposable);
}

// Main method to do the conversion of JSON to Elixir
function convertToElixir(addOkTuple: boolean) {
  const editor = vscode.window.activeTextEditor;

  if (editor) {
    const document = editor.document;

    const firstLine = document.lineAt(0);
    const lastLine = document.lineAt(document.lineCount - 1);

    const allRange = new vscode.Range(
      firstLine.range.start,
      lastLine.range.end
    );

    const text = document.getText();

    let newText = replaceAll(text, "null", "nil");
    newText = replaceCharAll(newText, ":", "=>", true);
    newText = replaceCharAll(newText, "{", "%{", false);

    if (addOkTuple) {
      newText = "{:ok,\n" + newText + "\n}";
    }

    editor.edit((x) => x.replace(allRange, newText));
  }
}

// Method to do string replacement
function replaceAll(str: string, find: string, replaceWith: string) {
  // TODO: Crude replacement for now, use regular expressions to unsure not replacing within strings
  return str.replace(new RegExp(find, "g"), replaceWith);
}

function replaceCharAll(
  str: string,
  find: string,
  replaceWith: string,
  checkSpacing: boolean
) {
  let inQuotes = false;
  let newStr = "";
  let prevChar = "";

  for (let index = 0; index < str.length; index++) {
    let newChars = "";
    let peekNextChar = "";

    const thisChar = str[index];

    if (index < str.length - 1) {
      peekNextChar = str[index + 1];
    }

    if (thisChar === '"') {
      if (inQuotes) {
        if (prevChar !== "\\") {
          inQuotes = false;
        }
      } else {
        inQuotes = true;
      }

      newChars = thisChar;
    } else if (!inQuotes && thisChar === find) {
      if (checkSpacing) {
        if (prevChar !== " ") {
          newChars = " ";
        }

        newChars += replaceWith;

        if (peekNextChar !== " ") {
          newChars += " ";
        }
      } else {
        newChars = replaceWith;
      }
    } else {
      newChars = thisChar;
    }

    prevChar = thisChar;
    newStr += newChars;
  }

  return newStr;
}

// this method is called when your extension is deactivated
export function deactivate() {
  console.log('Extension "jsontoelixir" is now deactived.');
}
