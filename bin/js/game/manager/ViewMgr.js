"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Singleton_1 = require("../../base/Singleton");
var LoadingView_1 = require("../view/LoadingView");
var LayerMgr_1 = require("../manager/LayerMgr");
var Validation;
(function (Validation) {
    var ViewMgr = /** @class */ (function (_super) {
        __extends(ViewMgr, _super);
        function ViewMgr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ViewMgr.prototype.onCreate = function () {
            this._viewCls = [];
            this._uiViews = [];
            this.initRegisterView();
        };
        /** 根据界面唯一ID，显示ui界面 */
        ViewMgr.prototype.showView = function (ViewId, Param) {
            var viewCls = this._viewCls[ViewId];
            if (viewCls == null) {
                console.log("[ViewMgr] showView : ViewCls(${ViewId}) is not register!!!");
                return;
            }
            var view = this._uiViews[ViewId];
            if (view == null) {
                view = new viewCls();
                // view.onInit(Param);
                this._uiViews[ViewId] = view;
            }
            // view.onShow(Param);
            LayerMgr_1.default.getInstance().addChildToDialog(view);
            return view;
        };
        /** 根据界面唯一ID，隐藏ui界面 */
        ViewMgr.prototype.hideView = function (ViewId) {
            var view = this._uiViews[ViewId];
            if (view != null) {
                // view.onHide();
                // view.onDestroy();
                view.removeSelf();
                this._uiViews[ViewId] = null;
            }
        };
        /** 隐藏所以ui界面 */
        ViewMgr.prototype.hideAllView = function () {
            if (this._uiViews.length <= 0) {
                return;
            }
            for (var viewId in this._uiViews) {
                this.hideView(parseInt(viewId));
            }
            this._uiViews.length = 0;
        };
        /** 根据ID，获取已打开的界面 */
        ViewMgr.prototype.getView = function (ViewId) {
            var view = this._uiViews[ViewId];
            return view;
        };
        /** 检查ui界面是否已打开 */
        ViewMgr.prototype.checkViewIsOpen = function (ViewId) {
            var view = this._uiViews[ViewId];
            return view != null;
        };
        /** 注册UI界面 */
        ViewMgr.prototype.registerView = function (ViewId, ViewCls) {
            if (!ViewId || !ViewCls) {
                console.log("[ViewMgr] registerView : ViewId or ViewCls is null", ViewId, ViewCls);
                return;
            }
            if (this._viewCls[ViewId] != null) {
                console.log("[ViewMgr] registerView : ViewCls(${ViewId}) is exist");
                return;
            }
            this._viewCls[ViewId] = ViewCls;
        };
        /** UI界面统一注册 */
        ViewMgr.prototype.initRegisterView = function () {
            this.registerView(Global.ViewId.LOADING_VIEW, LoadingView_1.default);
        };
        ViewMgr.getInstance = function () {
            return Singleton_1.default.getInstanceOrCreate(ViewMgr);
        };
        return ViewMgr;
    }(Singleton_1.default));
    Validation.ViewMgr = ViewMgr;
})(Validation || (Validation = {}));
//# sourceMappingURL=ViewMgr.js.map