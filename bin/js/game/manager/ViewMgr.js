var Game;
(function (Game) {
    var Node = Laya.Node;
    var ViewMgr = /** @class */ (function () {
        function ViewMgr() {
            this.init();
        }
        ViewMgr.prototype.showViewOnBottom = function () {
        };
        ViewMgr.prototype.showViewOnCenter = function () {
        };
        ViewMgr.prototype.showViewOnTop = function () {
        };
        ViewMgr.prototype.init = function () {
            this._bottomLayer = new Node();
            this._centerLayer = new Node();
            this._topLayer = new Node();
            Laya.stage.addChildAt(this._bottomLayer, 1 /* BOTTOM */);
            Laya.stage.addChildAt(this._centerLayer, 2 /* CENTER */);
            Laya.stage.addChildAt(this._topLayer, 3 /* TOP */);
        };
        return ViewMgr;
    }());
    Game.ViewMgr = ViewMgr;
})(Game || (Game = {}));
//# sourceMappingURL=ViewMgr.js.map