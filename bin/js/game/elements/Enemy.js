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
    var Loader = Laya.Loader;
    // Laya.Pool.getItemByClass("Enemy", Enemy);
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        function Enemy() {
            var _this = _super.call(this) || this;
            _this.m_type = 0;
            _this.m_speed = 0;
            _this.m_distance = 0;
            _this.m_showLookout = true;
            _this.m_alreadyHit = false;
            _this.m_position = null;
            _this.m_lookoutAnimation = null;
            _this.m_lookoutAction = null;
            _this.m_animation = null;
            return _this;
        }
        Enemy.prototype.hideLookout = function () {
            if (this.m_lookoutAnimation) {
                this.m_lookoutAnimation.visible = false;
            }
        };
        Enemy.prototype.reuse = function (PType, PShowLookOut, PPos, PSpeed, PDis) {
            if (PType == Global.Const.ENEMY_TYPE_4) {
                this.f_showImage("obstacle4_0001.png");
                if (!this.m_animation) {
                    var ani = new Animation();
                    ani.loadImages(["obstacle4_0001.png", "obstacle4_0002.png"]);
                    ani.interval = 100;
                    this.m_animation = ani;
                    this.addChild(ani);
                }
                this.m_animation.play();
            }
            else {
                this.f_showImage("obstacle" + PType + ".png");
            }
            this.m_showLookout = PShowLookOut;
            this.m_position = PPos;
            this.m_speed = PSpeed;
            this.m_distance = PDis;
            this.m_alreadyHit = false;
            this.m_type = PType;
            if (PShowLookOut) {
                if (!this.m_lookoutAnimation) {
                    this.m_lookoutAnimation = new Sprite();
                    this.m_lookoutAnimation.loadImage("#watchOut_0001.png");
                    this.addChild(this.m_lookoutAnimation);
                }
                else {
                    this.m_lookoutAnimation.visible = true;
                }
                if (!this.m_lookoutAction) {
                    var path = ["watchOut_0001.png", "watchOut_0002.png", "watchOut_0003.png", "watchOut_0004.png", "watchOut_0005.png"];
                    var ani1 = new Animation();
                    ani1.loadImages(path);
                    ani1.interval = 100;
                    this.m_lookoutAnimation.addChild(ani1);
                    this.m_lookoutAction = ani1;
                }
                this.m_lookoutAction.play();
                this.m_lookoutAnimation.x = -this.m_lookoutAnimation.width;
                this.m_lookoutAnimation.y = this.m_lookoutAnimation.height * 0.5;
            }
        };
        Enemy.prototype.unuse = function () {
            this.m_animation.stop();
            this.m_lookoutAction.stop();
            this.hideLookout();
            Laya.Pool.recover("Enemy", this);
            this.removeSelf();
        };
        Enemy.prototype.crash = function () {
            this.m_animation.stop();
            this.m_lookoutAction.stop();
            this.f_showImage("obstacle" + this.m_type + "_crash.png");
        };
        Enemy.prototype.f_showImage = function (PPath) {
            var imgUrl = PPath;
            var texture = Loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        };
        return Enemy;
    }(Sprite));
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map