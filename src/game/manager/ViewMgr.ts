module Game {
    import Node = Laya.Node;

    /** 游戏层级 */
    const enum UI_LAYER 
    {
        BOTTOM = 1,
        CENTER = 2,
        TOP = 3,
    }

    export class ViewMgr 
    {
        private _layers:Array<number>;
        private _nodes:Array<Node>;

        constructor()
        {
            this._layers = [UI_LAYER.BOTTOM, UI_LAYER.CENTER, UI_LAYER.TOP];
            this.initLayerNode();
        }

        /** 根据唯一界面ID，显示界面 */
        showView(ViewId:number):void 
        {
            let viewNode:Node = this._nodes[UI_LAYER.CENTER];
            if (viewNode != null) {
                
                viewNode.addChild();
            }
        }
        
        showViewOnBottom():void 
        {

        }

        showViewOnCenter():void 
        {

        }

        showViewOnTop():void 
        {
            
        }

        private initLayerNode():void 
        {
            let node:Node;
            this._layers.forEach(element => {
                node = new Node();
                Laya.stage.addChildAt(node, element);
                this._nodes[element] = node;
            });
        }
    }
}