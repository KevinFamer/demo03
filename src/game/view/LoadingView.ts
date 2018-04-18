/**
* loading界面 
*/
module Game {
	import Node = Laya.Node;

	export class LoadingView extends ui.ui_loadingUI 
	{
		// 加载资源路径
		private _resUrl:Array<any>;
		// 加载完成回调函数
		private _onLoaded:Function;
		// 加载过程中回调函数
		private _onLoading:Function;
		
		constructor() 
		{
			super();
			this.init();
		}

		load(ResUrl:Array<any>, LoadedFunc:Function, LoadingFunc:Function):void 
		{
			this._resUrl = ResUrl;
			this._onLoaded = LoadedFunc;
			this._onLoading = LoadingFunc;

			// 关闭并发加载，改成单一序列加载
			Laya.loader.maxLoader = 1;
			// 无加载失败重试
			Laya.loader.retryNum = 0;
			Laya.loader.load(ResUrl, Handler.create(this, this.onLoaded), Handler.create(this, this.onLoading, null, false));
			Laya.loader.once(Laya.Event.ERROR, this, this.onLoadError);
		}
		
		show(Parent:Node):void 
		{
			this.removeSelf();
			Parent.addChild(this);
		}

		hide():void 
		{
			Laya.loader.cancelLoadByUrls(this._resUrl);
			this.removeSelf();
		}

		private init():void 
		{
			this._onLoaded = null;
			this._onLoading = null;
			this.txtProgress.text = "0%";
		}

		private onLoaded(Txture:Texture):void 
		{
			 console.log("加载完成" + Txture.source);
			 Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
			 Laya.loader.maxLoader = 5;
			 this.doOnLoadedCallback();
		}

		private onLoading(Progress:number):void 
		{
			console.log("加载进度:" + Progress);
			this.txtProgress.text = Progress + "%";
			this.doOnLoadingCallback();
		}

		private onLoadError(Str:String):void 
		{
			console.log("加载失败:" + Str);
		}

		/**
		 * 执行加载完成回调
		 */
		private doOnLoadedCallback():void 
		{
			if (this._onLoaded != null) {
				this._onLoaded();
				this._onLoaded = null;
			}
		}

		/**
		 * 执行加载中回调
		 */
		private doOnLoadingCallback():void 
		{
			if (this._onLoading != null) {
				this._onLoading();
				this._onLoading = null;
			}
		}
	}
}