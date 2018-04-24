var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
* loading界面
*/
var Game;
(function (Game) {
    var LoadingView = /** @class */ (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoadingView.prototype.onShow = function (Param) {
            var url = Param.Url;
            var loadedFunc = Param.LoadedFunc;
            var loadingFunc = Param.LoadingFunc;
            this.load(url, loadedFunc, loadingFunc);
        };
        LoadingView.prototype.onInit = function (Param) {
            this._onLoaded = null;
            this._onLoading = null;
            this.txtProgress.text = "0%";
        };
        LoadingView.prototype.onHide = function () {
            Laya.loader.cancelLoadByUrls(this._resUrl);
        };
        LoadingView.prototype.onDestroy = function () {
        };
        LoadingView.prototype.load = function (ResUrl, LoadedFunc, LoadingFunc) {
            if (LoadedFunc === void 0) { LoadedFunc = null; }
            if (LoadingFunc === void 0) { LoadingFunc = null; }
            this._resUrl = ResUrl;
            this._onLoaded = LoadedFunc;
            this._onLoading = LoadingFunc;
            // 关闭并发加载，改成单一序列加载
            Laya.loader.maxLoader = 1;
            // 无加载失败重试
            Laya.loader.retryNum = 0;
            Laya.loader.load(ResUrl, Handler.create(this, this.onLoaded), Handler.create(this, this.onLoading, null, false));
            Laya.loader.once(Laya.Event.ERROR, this, this.onLoadError);
        };
        LoadingView.prototype.onLoaded = function (Txture) {
            console.log("加载完成" + Txture.source);
            Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
            Laya.loader.maxLoader = 5;
            this.doOnLoadedCallback();
        };
        LoadingView.prototype.onLoading = function (Progress) {
            console.log("加载进度:" + Progress);
            this.txtProgress.text = Progress + "%";
            this.doOnLoadingCallback();
        };
        LoadingView.prototype.onLoadError = function (Str) {
            console.log("加载失败:" + Str);
        };
        /**
         * 执行加载完成回调
         */
        LoadingView.prototype.doOnLoadedCallback = function () {
            if (this._onLoaded != null) {
                this._onLoaded();
                this._onLoaded = null;
            }
        };
        /**
         * 执行加载中回调
         */
        LoadingView.prototype.doOnLoadingCallback = function () {
            if (this._onLoading != null) {
                this._onLoading();
                this._onLoading = null;
            }
        };
        return LoadingView;
    }(ui.ui_loadingUI));
    Game.LoadingView = LoadingView;
})(Game || (Game = {}));
//# sourceMappingURL=LoadingView.js.map