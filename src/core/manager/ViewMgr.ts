module Core {
    /**
     * UI界面管理器
     */
    export class ViewMgr extends BaseSingleton
    {
        /** 获取单例实例 */
        public static getInstance():ViewMgr
        {
            return BaseSingleton.getInstanceOrCreate(ViewMgr);
        }

        // 游戏界面类集
        private _viewCls:Array<any>;
        // 缓存游戏已打开的ui界面
        private _uiViews:Array<View>;

        protected onCreate():void 
        {
            this._viewCls = [];
            this._uiViews = [];
        }

        protected onDestroy():void
        {
        }

        /** 根据界面唯一ID，显示ui界面 */
        showView(ViewId:number, Param?:any):View 
        {
            let viewCls = this._viewCls[ViewId];
            if (viewCls == null) {
                console.log("[ViewMgr] showView : ViewCls is not register!!! ViewId = ", ViewId);
                return;
            }

            let view = this._uiViews[ViewId];
            if (view == null) {
                view = new viewCls();
                this._uiViews[ViewId] = view;

                if (view["onInit"]) {
                    view["onInit"]();
                }
            }

            if (view["onShow"]) {
                view["onShow"](Param);
            }
            LayerMgr.getInstance().addChildToDialog(view);
            return view;
        }
        
        /** 根据界面唯一ID，隐藏ui界面 */
        hideView(ViewId:number):void 
        {
            let view = this._uiViews[ViewId];
            if (view != null) {
                if (view["onHide"]) {
                    view["onHide"]();
                }
                if (view["onDestroy"]) {
                    view["onDestroy"]();
                }
                view.removeSelf();
                this._uiViews[ViewId] = null;
            }
        }

        /** 隐藏所以ui界面 */
        hideAllView():void 
        {
            if (this._uiViews.length <= 0) {
                return;
            }

            for (let viewId in this._uiViews) {
                this.hideView(parseInt(viewId));
            }
            this._uiViews.length = 0;
        }

        /** 根据ID，获取已打开的界面 */
        getView(ViewId:number):View
        {
            let view = this._uiViews[ViewId];
            return view;
        }

        /** 检查ui界面是否已打开 */
        checkViewIsOpen(ViewId:number):boolean 
        {
            let view = this._uiViews[ViewId];
            return view != null;
        }

        /** 注册UI界面 */
        registerView(ViewId:number, ViewCls:any):void 
        {
            if (!ViewId || !ViewCls) {
                console.log("[ViewMgr] registerView : ViewId or ViewCls is null", ViewId, ViewCls);
                return;
            }
            if (this._viewCls[ViewId] != null) {
                console.log("[ViewMgr] registerView : ViewCls is exist, ViewId = ", ViewId);
                return;
            }
            this._viewCls[ViewId] = ViewCls;
        }
    }
}