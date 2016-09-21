'use strict';

import * as vscode from 'vscode';
import * as cp     from 'child_process';


export namespace web_search {

	/**
	 * WebSearch command
	 */
	export class WebSearch {
		/**
		 * constructor
		 */
		constructor() {
			
		}

		/**
		 * initialization
		 */
		public init() {
			let result = true;
			try {
				let configuration = vscode.workspace.getConfiguration('web-search');
				this.browserPath = configuration.get<string>("browser");
	
				if (this.browserPath == "") {
					result = false;
				}
			}
			catch (e) {
				throw e;
			}

			return result;			
		}
		
		/**
		 * Executable Browser Path
		 */
		private _browserPath : string;
		public get browserPath() : string {
			return this._browserPath;
		}
		public set browserPath(v : string) {
			this._browserPath = v;
		}
	
		/**
		 * Error Mesage
		 */
		private ErrMessage : string =  "Can't excute browser process.";
		
		/**
		 * Search on Google 
		 */
		public searchGoogle(keyword:string) {
			try {
				const baseUrl = "https://www.google.com/search?q=";
    			this.execSearch(baseUrl, keyword);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.ErrMessage);
			}
		}

		/**
		 * Search on MSDN
		 */
		public searchMSDN(keyword:string) {
			try {
    			const baseUrl = "https://social.msdn.microsoft.com/Search/en-US?query=";
    			this.execSearch(baseUrl, keyword);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.ErrMessage);
			}
		}

		/**
		 * Search on Reddit
		 */
		public searchReddit(keyword:string) {
			try {
    			const baseUrl = "https://www.reddit.com/r/node/search?q=";
    			this.execSearch(baseUrl, keyword);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.ErrMessage);
			}
		}

		/**
		 * Search on Visual Studio Code Reference
		 */
		public searchVSCode(keyword:string) {
			try {
    			const baseUrl="https://code.visualstudio.com/Search?q=";
    			this.execSearch(baseUrl, keyword);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.ErrMessage);
			}
		}

		/**
		 * Search on StackOverFlow  
		 */
		public searchStackOverflow(keyword:string) {
			try {
    			const baseUrl="http://stackoverflow.com/search?q=";
		    	this.execSearch(baseUrl, keyword);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.ErrMessage);
			}
		}

		/**
		 * Search on Unity3D
		 */
		public searchUnity3D(keyword:string) {
			try {
				const baseUrl="https://docs.unity3d.com/Manual/30_search.html?q=";
				this.execSearch(baseUrl, keyword);
			}
			catch (e) {
				vscode.window.showErrorMessage(this.ErrMessage);
			}
		}

		/**
		 * Excute Search on browser. 
		 */
		private execSearch(baseUrl:string, keyword:string) {
    		const url = baseUrl + this.fixedEncodeURIComponent(keyword);
    		cp.spawn(this.browserPath, [url]);  
		}
		
		/**
		 * encode uri component.
		 */
		private fixedEncodeURIComponent (str) {
  			return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    				return '%' + c.charCodeAt(0).toString(16);
  					});
		}
	}
}