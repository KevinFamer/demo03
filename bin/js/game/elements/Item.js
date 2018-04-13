var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    // Laya.Pool.getItemByClass("Item", Item);
    var Item = /** @class */ (function (_super) {
        __extends(Item, _super);
        function Item(PType) {
            var _this = _super.call(this) || this;
            _this.m_type = 0;
            return _this;
        }
        Object.defineProperty(Item.prototype, "type", {
            get: function () {
                return this.m_type;
            },
            enumerable: true,
            configurable: true
        });
        Item.prototype.reuse = function (PType) {
            this.m_type = PType;
            this.f_changeIcon(PType);
        };
        Item.prototype.unuse = function () {
            Laya.Pool.recover("Item", this);
            this.removeSelf();
        };
        Item.prototype.f_changeIcon = function (PType) {
            var imgUrl = "item" + PType + ".png";
            var texture = Loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        };
        return Item;
    }(Sprite));
    Game.Item = Item;
})(Game || (Game = {}));
//# sourceMappingURL=Item.js.map