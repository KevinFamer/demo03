/**
* loading界面
*/
var Game;
(function (Game) {
    class LoadingView extends ui.ui_loadingUI {
        onShow(Param) {
            let url = Param.Url;
            let loadedFunc = Param.LoadedFunc;
            let loadingFunc = Param.LoadingFunc;
            this.load(url, loadedFunc, loadingFunc);
        }
        onInit() {
            this._onLoaded = null;
            this._onLoading = null;
            this.txtProgress.text = "0%";
        }
        onHide() {
            Laya.loader.cancelLoadByUrls(this._resUrl);
        }
        onDestroy() {
        }
        load(ResUrl, LoadedFunc = null, LoadingFunc = null) {
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
        onLoaded() {
            Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
            Laya.loader.maxLoader = 5;
            // this.doOnLoadedCallback();
            Laya.timer.once(500, this, this.doOnLoadedCallback);
        }
        onLoading(Progress) {
            this.txtProgress.text = (Progress * 100) + "%";
            this.doOnLoadingCallback();
            if (Progress == 1) {
                this.onLoaded();
            }
        }
        onLoadError(Str) {
            console.log("加载失败:" + Str);
        }
        /**
         * 执行加载完成回调
         */
        doOnLoadedCallback() {
            if (this._onLoaded != null) {
                this._onLoaded();
                this._onLoaded = null;
            }
        }
        /**
         * 执行加载中回调
         */
        doOnLoadingCallback() {
            if (this._onLoading != null) {
                this._onLoading();
                this._onLoading = null;
            }
        }
    }
    Game.LoadingView = LoadingView;
})(Game || (Game = {}));
//# sourceMappingURL=LoadingView.js.map