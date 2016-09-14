'use strict';

import * as vscode from 'vscode';
import * as cp     from 'child_process';


export namespace web_search {

	/**
	 * WebSearch
	 */
	export class WebSearch {
		constructor() {
			
		}

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
		
		private _browserPath : string;
		public get browserPath() : string {
			return this._browserPath;
		}
		public set browserPath(v : string) {
			this._browserPath = v;
		}
		
		/**
		 * name
		 */
		public searchGoogle(keyword:string) {
			const baseUrl = "http://www.google.com/search?q=";
    		this.execSearch(baseUrl, keyword);
		}

		public searchMSDN(keyword:string) {
    		const baseUrl = "https://social.msdn.microsoft.com/Search/en-US?query=";
    		this.execSearch(baseUrl, keyword);
    
		}

		public searchReddit(keyword:string) {
    		const baseUrl = "https://www.reddit.com/r/node/search?q=";
    		this.execSearch(baseUrl, keyword);
		}

		public searchVSCode(keyword:string) {
    		const baseUrl="https://code.visualstudio.com/Search?q=";
    		this.execSearch(baseUrl, keyword);
		}

		public searchStackOverflow(keyword:string) {
    		const baseUrl="http://stackoverflow.com/search?q=";
		    this.execSearch(baseUrl, keyword);
		}

		private execSearch(baseUrl:string, keyword:string) {
    		const url = baseUrl + this.fixedEncodeURIComponent(keyword);
    		const exePath = "C:\\Program Files\\Waterfox\\waterfox.exe";
    		cp.spawn(exePath, [url]);  
		}
		
		private fixedEncodeURIComponent (str) {
  			return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    				return '%' + c.charCodeAt(0).toString(16);
  					});
		}
	}
}