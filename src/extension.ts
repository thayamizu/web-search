'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {web_search} from './web_search';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "web-search" is now active!');

    //initialization
    let command = new web_search.WebSearch();
    if (!command.init()) {
        vscode.window.showErrorMessage('Please setting the browser path !!');
        return; 
    }


    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let google = vscode.commands.registerCommand('web-search.google', () => {
        let text:string = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        vscode.window.showInputBox({value:text}).then( value =>{
            if (value == undefined) {
                return;
            }
            if (value == "") {
                value =text;
            }
            command.searchGoogle(value);
        })
    });
    let msdn = vscode.commands.registerCommand('web-search.msdn', () => {
        let text:string = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        vscode.window.showInputBox()
        // Display a message box to the user
        vscode.window.showInputBox({value:text}).then((value)=>{
            if (value == undefined) {
                return;
            }
            if (value == "") {
                value =text;
            }
            command.searchMSDN(text);
        })
    });
    let reddit = vscode.commands.registerCommand('web-search.reddit', () => {
        let text:string = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        // Display a message box to the user
        vscode.window.showInputBox({value:text}).then((value)=>{
            if (value == undefined) {
                return;
            }
            if (value == "") {
                value =text;
            }
            command.searchReddit(text);
        })
    });
    let vscRef = vscode.commands.registerCommand('web-search.vscode', () => {
        let text:string = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        // Display a message box to the user
        vscode.window.showInputBox({value:text}).then((value)=>{
            if (value == undefined) {
                return;
            }
            if (value == "") {
                value =text;
            }
            command.searchVSCode(text);
        })
    });
    let stackOVerFlow = vscode.commands.registerCommand('web-search.stackoverflow', () => {
        let text:string = vscode.window.activeTextEditor.document.getText(vscode.window.activeTextEditor.selection);
        // Display a message box to the user
        vscode.window.showInputBox({value:text}).then((value)=>{
            if (value == undefined) {
                return;
            }
            if (value == "") {
                value =text;
            }
            command.searchStackOverflow(value);
        })
    });


    context.subscriptions.push(google);
    context.subscriptions.push(msdn);
    context.subscriptions.push(reddit);
    context.subscriptions.push(vscRef);
    context.subscriptions.push(stackOVerFlow);
}

// this method is called when your extension is deactivated
export function deactivate() {
}       