module Game {
	/**
	* loading界面 
	*/
	export class LoadingView extends ui.ui_loadingUI
	{
		// 回调函数
		private _loadedFunc:Function;

		onShow(Url:Array<any>, LoadedFunc:Function):void
		{
			this._loadedFunc = LoadedFunc;
			this.txtProgress.text = "0%";

			Game.loaderMgr.loadRes(Url, this.onLoaded, this.onLoading);
			Core.LayerMgr.getInstance().addChildToDialog(this);
		}

		onLoaded = () => {
			if (this._loadedFunc) {
				this._loadedFunc();
				this._loadedFunc = null;
			}
			this.removeSelf();
		}

		onLoading = (Progress:number) => {
			this.txtProgress.text = Math.floor(Progress * 100) + "%";
		}
	}
}