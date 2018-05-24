module Core {
    /**
     * 加载管理器
     */
    export class LoaderMgr extends BaseSingleton
    {
        /** 获取单例实例 */
        public static getInstance():LoaderMgr
        {
            return BaseSingleton.getInstanceOrCreate(LoaderMgr);
        }

        // 加载完成回调函数
		private _loadedFunc:Function;
		// 加载过程中回调函数
		private _loadingFunc:Function;

        loadRes(Url:Array<any>, LoadedFunc?:Function, LoadingFunc?:Function):void
        {
            this._loadedFunc = LoadedFunc;
            this._loadingFunc = LoadingFunc;

            // 关闭并发加载，改成单一序列加载
            Laya.loader.maxLoader = 1;
            // 无加载失败重试
            Laya.loader.retryNum = 0;
            Laya.loader.load(Url, Laya.Handler.create(this, this.onLoaded), Laya.Handler.create(this, this.onLoading, null, false));
            Laya.loader.once(Laya.Event.ERROR, this, this.onLoadError);
        }

        private onLoaded():void 
        {
            Laya.loader.off(Laya.Event.ERROR, this, this.onLoadError, true);
            Laya.loader.maxLoader = 5;
            Laya.timer.once(500, this, this.doLoadedCallback);
        }

        private onLoading(Progress:number):void 
        {
            this.doLoadingCallback(Progress);

            if (Progress == 1) {
                this._loadingFunc = null;
            }
        }

        private onLoadError(Str:String):void 
        {
            console.log("加载失败:", Str);
        }

        /**
         * 执行加载完成回调函数
         */
        private doLoadedCallback():void 
        {
            if (this._loadedFunc) {
                this._loadedFunc();
                this._loadedFunc = null;
            }
        }

        /**
         * 执行加载中回调函数
         */
        private doLoadingCallback(Progress:number):void 
        {
            if (this._loadingFunc) {
                this._loadingFunc(Progress)
            }
        }
    }
}