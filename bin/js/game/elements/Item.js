var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Loader = Laya.Loader;
    // Laya.Pool.getItemByClass("Item", Item);
    class Item extends Sprite {
        constructor(PType) {
            super();
            this.m_type = 0;
        }
        get type() {
            return this.m_type;
        }
        reuse(PType) {
            this.m_type = PType;
            this.f_changeIcon(PType);
        }
        unuse() {
            Laya.Pool.recover("Item", this);
            this.removeSelf();
        }
        f_changeIcon(PType) {
            var imgUrl = "item" + PType + ".png";
            var texture = Loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        }
    }
    Game.Item = Item;
})(Game || (Game = {}));
//# sourceMappingURL=Item.js.map