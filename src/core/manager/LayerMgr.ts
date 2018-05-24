module Core {
    import Sprite = Laya.Sprite;

    /** 
     * 游戏层级
     */
    const enum UI_LAYER 
    {
        Scene = 0,
        Dialog = 1,
        Tip = 2,
        Guide = 3,
    }

    /**
     * 层级管理器
     */
    export class LayerMgr extends BaseSingleton
    {
        /** 获取单例实例 */
        public static getInstance():LayerMgr
        {
            return BaseSingleton.getInstanceOrCreate(LayerMgr);
        }

        private _layerIdx:Array<number>;
        private _layerNode:Array<Sprite>;

        protected onCreate():void 
        {
            this._layerNode = [];
            this._layerIdx = [UI_LAYER.Scene, UI_LAYER.Dialog, UI_LAYER.Tip, UI_LAYER.Guide];
            this.initLayerNode();
        }

        protected onDestroy():void 
        {
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
            let node:Sprite;
            this._layerIdx.forEach(element => {
                node = new Sprite();
                Laya.stage.addChildAt(node, element);
                this._layerNode[element] = node;
            });
        }

        /** 添加显示对象到对应的层级 */
        private addChildToLayer(LayerIdx:number, Child:Sprite, PosX:number, PosY:number):void 
        {
            if (!Child) {
                console.log("[LayerMgr] addChildToLayer : Child is null");
                return;
            }
            let layer = this._layerNode[LayerIdx];
            if (layer == null) {
                console.log("[LayerMgr] addChildToLayer : LayerNode(${LayerIdx}) is not exist");
                return;
            }
            Child.removeSelf();
            Child.x = PosX || 0;
            Child.y = PosY || 0;
            layer.addChild(Child);
        }
    }
}