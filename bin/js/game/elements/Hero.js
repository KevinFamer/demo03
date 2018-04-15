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
    var Animation = Laya.Animation;
    var Sprite = Laya.Sprite;
    var Hero = /** @class */ (function (_super) {
        __extends(Hero, _super);
        function Hero() {
            var _this = _super.call(this) || this;
            _this.m_animation = null;
            _this.m_fast = false;
            _this.m_state = 0;
            _this.loadImage("fly_0001.png");
            _this.m_animation = new Animation();
            var imgPaths = [];
            for (var i = 1; i < 20; i++) {
                imgPaths.push(Global.Path.SML_IMG_PATH + "fly_00" + (i < 10 ? ('0' + i) : i) + ".png");
            }
            _this.m_animation.loadImages(imgPaths);
            _this.m_animation.interval = 50;
            _this.m_animation.play();
            _this.m_fast = false;
            return _this;
        }
        Hero.prototype.toggleSpeed = function (PFast) {
            if (PFast == this.m_fast) {
                return;
            }
            this.m_fast = PFast;
            this.m_animation.stop();
            if (!PFast) {
                this.m_animation.interval = 50;
            }
            else {
                this.m_animation.interval = 50 / 3;
            }
            this.m_animation.play();
        };
        Hero.prototype.onExit = function () {
            this.m_animation.destroy();
        };
        return Hero;
    }(Sprite));
    Game.Hero = Hero;
})(Game || (Game = {}));
//# sourceMappingURL=Hero.js.map