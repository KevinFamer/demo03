module Game {
    import Sprite = Laya.Sprite;
    import Texture = Laya.Texture;

    // Laya.Pool.getItemByClass("Item", Item);
    export class Item extends Sprite 
    {
        private m_type:number = 0;

        public get type():number 
        {
            return this.m_type;
        }

        reuse(PType):void 
        {
            this.m_type = PType;
            this.changeIcon(PType);
        }

        unuse():void 
        {
            Laya.Pool.recover("Item", this);
            this.removeSelf();
        }

        private changeIcon(PType):void 
        {
            var imgUrl:string = "item" + PType + ".png";
            var texture:Texture = Laya.loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        }
    }
}