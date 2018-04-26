var Game;
(function (Game) {
    var Node = Laya.Node;
    var LayerMgr = /** @class */ (function () {
        function LayerMgr() {
            this._layerNode = [];
            this._layerIdx = [1 /* Scene */, 2 /* Dialog */, 3 /* Tip */, 4 /* Guide */];
            this.initLayerNode();
        }
        /** 把显示对象添加到场景层 */
        LayerMgr.prototype.addChildToScene = function (Child, PosX, PosY) {
            this.addChildToLayer(1 /* Scene */, Child, PosX, PosY);
        };
        /** 把显示对象添加到弹框层(UI) */
        LayerMgr.prototype.addChildToDialog = function (Child, PosX, PosY) {
            this.addChildToLayer(2 /* Dialog */, Child, PosX, PosY);
        };
        /** 把显示对象添加到提示层 */
        LayerMgr.prototype.addChildToTip = function (Child, PosX, PosY) {
            this.addChildToLayer(3 /* Tip */, Child, PosX, PosY);
        };
        /** 把显示对象添加到引导层 */
        LayerMgr.prototype.addChildToGuide = function (Child, PosX, PosY) {
            this.addChildToLayer(4 /* Guide */, Child, PosX, PosY);
        };
        LayerMgr.prototype.initLayerNode = function () {
            var _this = this;
            var node;
            this._layerIdx.forEach(function (element) {
                node = new Node();
                Laya.stage.addChildAt(node, element);
                _this._layerNode[element] = node;
            });
        };
        /** 添加显示对象到对应的层级 */
        LayerMgr.prototype.addChildToLayer = function (LayerIdx, Child, PosX, PosY) {
            if (!LayerIdx || !Child) {
                console.log("[ViewMgr] addChildToLayer : LayerIdx is null or Child is null");
                return;
            }
            var layer = this._layerNode[LayerIdx];
            if (layer == null) {
                console.log("[ViewMgr] addChildToLayer : LayerNode(${LayerIdx}) is not exist");
                return;
            }
            Child.removeSelf();
            Child.x = PosX || 0;
            Child.y = PosY || 0;
            layer.addChild(Child);
        };
        return LayerMgr;
    }());
    Game.layerMgr = new LayerMgr();
})(Game || (Game = {}));
//# sourceMappingURL=LayerMgr.js.map