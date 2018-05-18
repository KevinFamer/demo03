/**
* loading界面 
*/
module Game {
	export class LoadingView extends ui.ui_loadingUI
	{
		// 加载资源路径
		private _resUrl:Array<any>;
		// 加载完成回调函数
		private _onLoaded:Function;
		// 加载过程中回调函数
		private _onLoading:Function;

		onShow(Param?:any):void 
		{
			let url = Param.Url;
			let loadedFunc = Param.LoadedFunc;
			let loadingFunc = Param.LoadingFunc;
			this.load(url, loadedFunc, loadingFunc);
		}

		onInit():void 
		{
			this._onLoaded = null;
			this._onLoading = null;
			this.txtProgress.text = "0%";
		}

		onHide():void 
		{
			Laya.loader.cancelLoadByUrls(this._resUrl);
		}

		onDestroy():void
		{
		}

		load(ResUrl:Array<any>, LoadedFunc:Function = null, LoadingFunc:Function = null):void 
		{
			this._resUrl = ResUrl;
			this._onLoaded = LoadedFunc;
			this._onLoading = LoadingFunc;

			// 关闭并发加载，改成单一序列加载
			Laya.loader.maxLoader = 1;
			// 无加载失败重试
			Laya.loader.retryNum = 0;
			Laya.loader.load(ResUrl, null, Laya.Handler.create(this, this.onLoading, null, false));
			Laya.loader.once(Laya.Event.ERROR, this, this.onLoadError);
		}

		private onLoaded():void 
		{
			Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
			Laya.loader.maxLoader = 5;
			// this.doOnLoadedCallback();
			Laya.timer.once(500, this, this.doOnLoadedCallback);
		}

		private onLoading(Progress:number):void 
		{
			this.txtProgress.text = Math.floor(Progress * 100) + "%";
			this.doOnLoadingCallback();

			if (Progress == 1) {
				this.onLoaded();
			}
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