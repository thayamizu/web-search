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
        vscode.window.showInputBox().then( value =>{
            if (value == undefined) {
                return;
            }
            command.searchGoogle(value);
        })
    });
    let msdn = vscode.commands.registerCommand('web-search.msdn', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((value)=>{
            if (value == undefined) {
                return;
            }
            command.searchMSDN(value);
        })
    });
    let reddit = vscode.commands.registerCommand('web-search.reddit', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((value)=>{
            if (value == undefined) {
                return;
            }
            command.searchReddit(value);
        })
    });
    let vscRef = vscode.commands.registerCommand('web-search.vscode', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((value)=>{
            if (value == undefined) {
                return;
            }
            command.searchVSCode(value);
        })
    });
    let stackOVerFlow = vscode.commands.registerCommand('web-search.stackoverflow', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((value)=>{
            if (value == undefined) {
                return;
            }
            command.searchStackOverflow(value);
        })
    });
    let unity3DRef = vscode.commands.registerCommand('web-search.unity3D', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((value)=>{
            if (value == undefined) {
                return;
            }
            command.searchUnity3D(value);
        })
    });

    context.subscriptions.push(google);
    context.subscriptions.push(msdn);
    context.subscriptions.push(reddit);
    context.subscriptions.push(vscRef);
    context.subscriptions.push(stackOVerFlow);
    context.subscriptions.push(unity3DRef);
}

// this method is called when your extension is deactivated
export function deactivate() {
}       