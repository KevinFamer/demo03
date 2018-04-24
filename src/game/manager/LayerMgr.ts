module Game {
    import Node = Laya.Node;
    import Sprite = Laya.Sprite;

    /** 游戏层级 */
    const enum UI_LAYER 
    {
        Scene = 1,
        Dialog = 2,
        Tip = 3,
        Guide = 4,
    }

    class LayerMgr
    {
        private _layerIdx:Array<number>;
        private _layerNode:Array<Node>;

        constructor()
        {
            this._layerNode = [];
            this._layerIdx = [UI_LAYER.Scene, UI_LAYER.Dialog, UI_LAYER.Tip, UI_LAYER.Guide];
            this.initLayerNode();
        }

        /** 把显示对象添加到场景层 */
        addChildToScene(Child:Sprite, PosX?:number, PosY?:number):void 
        {
            this.addChildToLayer(UI_LAYER.Scene, Child, PosX, PosY);
        }
        /** 把显示对象添加到弹框层(UI) */
        addChildToDialog(Child:Sprite, PosX?:number, PosY?:number):void 
        {
            this.addChildToLayer(UI_LAYER.Dialog, Child, PosX, PosY);
        }
        /** 把显示对象添加到提示层 */
        addChildToTip(Child:Sprite, PosX?:number, PosY?:number):void 
        {
            this.addChildToLayer(UI_LAYER.Tip, Child, PosX, PosY);
        }
        /** 把显示对象添加到引导层 */
        addChildToGuide(Child:Sprite, PosX?:number, PosY?:number):void 
        {
            this.addChildToLayer(UI_LAYER.Guide, Child, PosX, PosY);
        }

        private initLayerNode():void 
        {
            let node:Node;
            this._layerIdx.forEach(element => {
                node = new Node();
                Laya.stage.addChild(node);
                // Laya.stage.addChildAt(node, element);
                this._layerNode[element] = node;
            });
        }

        /** 添加显示对象到对应的层级 */
        private addChildToLayer(LayerIdx:number, Child:Sprite, PosX:number, PosY:number):void 
        {
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
    }
    
    export let layerMgr:LayerMgr = new LayerMgr();
}