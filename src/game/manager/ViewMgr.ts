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
        private _bottomLayer:Node;
        private _centerLayer:Node;
        private _topLayer:Node;

        constructor()
        {
            this.init();
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

        private init():void 
        {
            this._bottomLayer = new Node();
            this._centerLayer = new Node();
            this._topLayer = new Node();

            Laya.stage.addChildAt(this._bottomLayer, UI_LAYER.BOTTOM);
            Laya.stage.addChildAt(this._centerLayer, UI_LAYER.CENTER);
            Laya.stage.addChildAt(this._topLayer, UI_LAYER.TOP);
        }
    }
}