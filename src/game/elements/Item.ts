module Game {
    // Laya.Pool.getItemByClass("Item", Item);
    export class Item extends Sprite {
        private m_type:number = 0;

        constructor(PType) {
            super();
        }

        public get type():number {
            return this.m_type;
        }

        reuse(PType):void {
            this.m_type = PType;
            this.f_changeIcon(PType);
        }

        unuse():void {
            Laya.Pool.recover("Item", this);
            this.removeSelf();
        }

        f_changeIcon(PType):void {
            var imgUrl:string = "item" + PType + ".png";
            var texture:Texture = Loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        }
    }
}