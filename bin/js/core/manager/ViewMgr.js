var Core;
(function (Core) {
    /**
     * UI界面管理器
     */
    class ViewMgr extends Core.BaseSingleton {
        /** 获取单例实例 */
        static getInstance() {
            return Core.BaseSingleton.getInstanceOrCreate(ViewMgr);
        }
        onCreate() {
            this._viewCls = [];
            this._uiViews = [];
        }
        onDestroy() {
        }
        /** 根据界面唯一ID，显示ui界面 */
        showView(ViewId, Param) {
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
            Core.LayerMgr.getInstance().addChildToDialog(view);
            return view;
        }
        /** 根据界面唯一ID，隐藏ui界面 */
        hideView(ViewId) {
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
        hideAllView() {
            if (this._uiViews.length <= 0) {
                return;
            }
            for (let viewId in this._uiViews) {
                this.hideView(parseInt(viewId));
            }
            this._uiViews.length = 0;
        }
        /** 根据ID，获取已打开的界面 */
        getView(ViewId) {
            let view = this._uiViews[ViewId];
            return view;
        }
        /** 检查ui界面是否已打开 */
        checkViewIsOpen(ViewId) {
            let view = this._uiViews[ViewId];
            return view != null;
        }
        /** 注册UI界面 */
        registerView(ViewId, ViewCls) {
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
    Core.ViewMgr = ViewMgr;
})(Core || (Core = {}));
//# sourceMappingURL=ViewMgr.js.map