'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as cp  from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "web-search" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let google = vscode.commands.registerCommand('web-search.google', () => {
        vscode.window.showInputBox().then((text)=>{
            searchGoogle(text);
        })
    });
    let msdn = vscode.commands.registerCommand('web-search.msdn', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((text)=>{
            searchMSDN(text);
        })
    });
    let reddit = vscode.commands.registerCommand('web-search.reddit', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((text)=>{
            searchReddit(text);
        })
    });
    let vscRef = vscode.commands.registerCommand('web-search.vscode', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((text)=>{
            searchVSCode(text);
        })
    });
    let stackOVerFlow = vscode.commands.registerCommand('web-search.stackoverflow', () => {
        // Display a message box to the user
        vscode.window.showInputBox().then((text)=>{
            searchStackOverflow(text);
        })
    });


    context.subscriptions.push(google);
    context.subscriptions.push(reddit);
    context.subscriptions.push(vscRef);
    context.subscriptions.push(stackOVerFlow);
}

function searchGoogle(keyword:string) {
    const baseUrl = "http://www.google.com/search?q=";
    execSearch(baseUrl, keyword);
}

function searchMSDN(keyword:string) {
    const baseUrl = "https://social.msdn.microsoft.com/Search/en-US?query=";
    execSearch(baseUrl, keyword);
    
}

function searchReddit(keyword:string) {
    const baseUrl = "https://www.reddit.com/r/node/search?q=";
    const url = baseUrl + encode(keyword);
    execSearch(baseUrl, keyword);

}

function searchVSCode(keyword:string) {
    const baseUrl="https://code.visualstudio.com/Search?q=";
    execSearch(baseUrl, keyword);
}

function searchStackOverflow(keyword:string) {
    const baseUrl="http://stackoverflow.com/search?q=";
    execSearch(baseUrl, keyword);
}

function execSearch(baseUrl:string, keyword:string) {
    const url = baseUrl + encode(keyword);
    const exePath = "C:\\Program Files\\Waterfox\\waterfox.exe";
    cp.spawn(exePath, [url]);  
}

function encode(text : string ) {
    let keywords = text.split(' ');
    let query: string  ="";
    keywords.forEach(element => {
            if (query != "") {
                query +="+";
            }
            query += encodeURIComponent(element);
    });

    return query;
} 

// this method is called when your extension is deactivated
export function deactivate() {
}