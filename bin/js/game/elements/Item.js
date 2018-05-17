var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    // Laya.Pool.getItemByClass("Item", Item);
    class Item extends Sprite {
        constructor() {
            super(...arguments);
            this.m_type = 0;
        }
        get type() {
            return this.m_type;
        }
        reuse(PType) {
            this.m_type = PType;
            this.changeIcon(PType);
        }
        unuse() {
            Laya.Pool.recover("Item", this);
            this.removeSelf();
        }
        changeIcon(PType) {
            var imgUrl = "item" + PType + ".png";
            var texture = Laya.loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        }
    }
    Game.Item = Item;
})(Game || (Game = {}));
//# sourceMappingURL=Item.js.map