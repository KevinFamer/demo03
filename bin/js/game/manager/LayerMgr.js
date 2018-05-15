var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    class LayerMgr extends Core.Singleton {
        onCreate() {
            this._layerNode = [];
            this._layerIdx = [0 /* Scene */, 1 /* Dialog */, 2 /* Tip */, 3 /* Guide */];
            this.initLayerNode();
        }
        onDestroy() {
        }
        /** 把显示对象添加到场景层 */
        addChildToScene(Child, PosX, PosY) {
            this.addChildToLayer(0 /* Scene */, Child, PosX, PosY);
        }
        /** 把显示对象添加到弹框层(UI) */
        addChildToDialog(Child, PosX, PosY) {
            this.addChildToLayer(1 /* Dialog */, Child, PosX, PosY);
        }
        /** 把显示对象添加到提示层 */
        addChildToTip(Child, PosX, PosY) {
            this.addChildToLayer(2 /* Tip */, Child, PosX, PosY);
        }
        /** 把显示对象添加到引导层 */
        addChildToGuide(Child, PosX, PosY) {
            this.addChildToLayer(3 /* Guide */, Child, PosX, PosY);
        }
        initLayerNode() {
            let node;
            this._layerIdx.forEach(element => {
                node = new Sprite();
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