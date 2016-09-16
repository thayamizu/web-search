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
		 * Search in Google 
		 */
		public searchGoogle(keyword:string) {
			const baseUrl = "https://www.google.com/search?q=";
    		this.execSearch(baseUrl, keyword);
		}

		/**
		 * Search in MSDN
		 */
		public searchMSDN(keyword:string) {
    		const baseUrl = "https://social.msdn.microsoft.com/Search/en-US?query=";
    		this.execSearch(baseUrl, keyword);
		}

		/**
		 * Search on Reddit
		 */
		public searchReddit(keyword:string) {
    		const baseUrl = "https://www.reddit.com/r/node/search?q=";
    		this.execSearch(baseUrl, keyword);
		}

		/**
		 * Search on Visual Studio Code Reference
		 */
		public searchVSCode(keyword:string) {
    		const baseUrl="https://code.visualstudio.com/Search?q=";
    		this.execSearch(baseUrl, keyword);
		}

		/**
		 * Search on StackOverFlow  
		 */
		public searchStackOverflow(keyword:string) {
    		const baseUrl="http://stackoverflow.com/search?q=";
		    this.execSearch(baseUrl, keyword);
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