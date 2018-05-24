var Core;
(function (Core) {
    /**
     * 加载管理器
     */
    class LoaderMgr extends Core.BaseSingleton {
        /** 获取单例实例 */
        static getInstance() {
            return Core.BaseSingleton.getInstanceOrCreate(LoaderMgr);
        }
        loadRes(Url, LoadedFunc, LoadingFunc) {
            this._loadedFunc = LoadedFunc;
            this._loadingFunc = LoadingFunc;
            // 关闭并发加载，改成单一序列加载
            Laya.loader.maxLoader = 1;
            // 无加载失败重试
            Laya.loader.retryNum = 0;
            Laya.loader.load(Url, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading, null, false));
            Laya.loader.once(Laya.Event.ERROR, this, this.onLoadError);
        }
        onLoaded() {
            Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
            Laya.loader.maxLoader = 5;
            Laya.timer.once(500, this, this.doLoadedCallback);
        }
        onLoading(Progress) {
            this.doLoadingCallback(Progress);
            if (Progress == 1) {
                this._loadingFunc = null;
            }
        }
        onLoadError(Str) {
            console.log("加载失败:", Str);
        }
        /**
         * 执行加载完成回调函数
         */
        doLoadedCallback() {
            if (this._loadedFunc) {
                this._loadedFunc();
                this._loadedFunc = null;
            }
        }
        /**
         * 执行加载中回调函数
         */
        doLoadingCallback(Progress) {
            if (this._loadingFunc) {
                this._loadingFunc(Progress);
            }
        }
    }
    Core.LoaderMgr = LoaderMgr;
})(Core || (Core = {}));
//# sourceMappingURL=LoaderMgr.js.map