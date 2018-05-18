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

        reuse(Type:number):void 
        {
            this.m_type = Type;
            this.changeIcon(Type);
        }

        unuse():void 
        {
            Laya.Pool.recover("Item", this);
            this.removeSelf();
        }

        private changeIcon(Type:number):void 
        {
            var imgUrl:string = Global.Path.SML_IMG_PATH + "item" + Type + ".png";
            var texture:Texture = Laya.loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        }
    }
}