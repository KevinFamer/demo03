var Game;
(function (Game) {
    var Node = Laya.Node;
    var ViewMgr = /** @class */ (function () {
        function ViewMgr() {
            this._layers = [1 /* BOTTOM */, 2 /* CENTER */, 3 /* TOP */];
            this.initLayerNode();
        }
        /** 根据唯一界面ID，显示界面 */
        ViewMgr.prototype.showView = function (ViewId) {
            var viewNode = this._nodes[2 /* CENTER */];
            if (viewNode != null) {
                viewNode.addChild();
            }
        };
        ViewMgr.prototype.showViewOnBottom = function () {
        };
        ViewMgr.prototype.showViewOnCenter = function () {
        };
        ViewMgr.prototype.showViewOnTop = function () {
        };
        ViewMgr.prototype.registerView = function (ViewId, ViewCls) {
        };
        ViewMgr.prototype.initLayerNode = function () {
            var _this = this;
            var node;
            this._layers.forEach(function (element) {
                node = new Node();
                Laya.stage.addChildAt(node, element);
                _this._nodes[element] = node;
            });
        };
        ViewMgr.prototype.initRegisterView = function () {
            this.registerView(Global.ViewId.LOADING_VIEW, Game.LoadingView);
        };
        return ViewMgr;
    }());
    Game.ViewMgr = ViewMgr;
})(Game || (Game = {}));
//# sourceMappingURL=ViewMgr.js.map