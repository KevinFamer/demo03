var Game;
(function (Game) {
    var Node = Laya.Node;
    class LayerMgr extends Core.Singleton {
        onCreate() {
            this._layerNode = [];
            this._layerIdx = [1 /* Scene */, 2 /* Dialog */, 3 /* Tip */, 4 /* Guide */];
            this.initLayerNode();
        }
        onDestroy() {
        }
        /** 把显示对象添加到场景层 */
        addChildToScene(Child, PosX, PosY) {
            this.addChildToLayer(1 /* Scene */, Child, PosX, PosY);
        }
        /** 把显示对象添加到弹框层(UI) */
        addChildToDialog(Child, PosX, PosY) {
            this.addChildToLayer(2 /* Dialog */, Child, PosX, PosY);
        }
        /** 把显示对象添加到提示层 */
        addChildToTip(Child, PosX, PosY) {
            this.addChildToLayer(3 /* Tip */, Child, PosX, PosY);
        }
        /** 把显示对象添加到引导层 */
        addChildToGuide(Child, PosX, PosY) {
            this.addChildToLayer(4 /* Guide */, Child, PosX, PosY);
        }
        initLayerNode() {
            let node;
            this._layerIdx.forEach(element => {
                node = new Node();
                Laya.stage.addChildAt(node, element);
                this._layerNode[element] = node;
            });
        }
        /** 添加显示对象到对应的层级 */
        addChildToLayer(LayerIdx, Child, PosX, PosY) {
            if (!LayerIdx || !Child) {
                console.log("[ViewMgr] addChildToLayer : LayerIdx is null or Child is null");
                return;
            }
            let layer = this._layerNode[LayerIdx];
            if (layer == null) {
                console.log("[ViewMgr] addChildToLayer : LayerNode(${LayerIdx}) is not exist");
                return;
            }
            Child.removeSelf();
            Child.x = PosX || 0;
            Child.y = PosY || 0;
            layer.addChild(Child);
        }
        static getInstance() {
            return Core.Singleton.getInstanceOrCreate(LayerMgr);
        }
    }
    Game.LayerMgr = LayerMgr;
})(Game || (Game = {}));
//# sourceMappingURL=LayerMgr.js.map