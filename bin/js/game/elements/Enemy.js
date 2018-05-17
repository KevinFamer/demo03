var Game;
(function (Game) {
    var Animation = Laya.Animation;
    var Sprite = Laya.Sprite;
    var Loader = Laya.Loader;
    // Laya.Pool.getItemByClass("Enemy", Enemy);
    class Enemy extends Sprite {
        constructor() {
            super(...arguments);
            this.m_type = 0;
            this.m_speed = 0;
            this.m_distance = 0;
            this.m_showLookout = true;
            this.m_alreadyHit = false;
            this.m_position = null;
            this.m_lookoutAnimation = null;
            this.m_lookoutAction = null;
            this.m_animation = null;
        }
        hideLookout() {
            if (this.m_lookoutAnimation) {
                this.m_lookoutAnimation.visible = false;
            }
        }
        reuse(PType, PShowLookOut, PPos, PSpeed, PDis) {
            if (PType == Global.Const.ENEMY_TYPE_4) {
                this.showImage("obstacle4_0001.png");
                if (!this.m_animation) {
                    var ani = new Animation();
                    ani.loadImages([Global.Path.SML_IMG_PATH + "obstacle4_0001.png", Global.Path.SML_IMG_PATH + "obstacle4_0002.png"]);
                    ani.interval = 100;
                    this.m_animation = ani;
                    this.addChild(ani);
                }
                this.m_animation.play();
            }
            else {
                this.showImage("obstacle" + PType + ".png");
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
                    this.m_lookoutAnimation.loadImage(Global.Path.SML_IMG_PATH + "watchOut_0001.png");
                    this.addChild(this.m_lookoutAnimation);
                }
                else {
                    this.m_lookoutAnimation.visible = true;
                }
                if (!this.m_lookoutAction) {
                    var path = [
                        Global.Path.SML_IMG_PATH + "watchOut_0001.png",
                        Global.Path.SML_IMG_PATH + "watchOut_0002.png",
                        Global.Path.SML_IMG_PATH + "watchOut_0003.png",
                        Global.Path.SML_IMG_PATH + "watchOut_0004.png",
                        Global.Path.SML_IMG_PATH + "watchOut_0005.png"
                    ];
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
        }
        unuse() {
            this.m_animation.stop();
            this.m_lookoutAction.stop();
            this.hideLookout();
            Laya.Pool.recover("Enemy", this);
            this.removeSelf();
        }
        crash() {
            this.m_animation.stop();
            this.m_lookoutAction.stop();
            this.showImage("obstacle" + this.m_type + "_crash.png");
        }
        showImage(Path) {
            var imgUrl = Global.Path.SML_IMG_PATH + Path;
            var texture = Loader.getRes(imgUrl);
            this.graphics.clear();
            this.graphics.drawTexture(texture);
        }
    }
    Game.Enemy = Enemy;
})(Game || (Game = {}));
//# sourceMappingURL=Enemy.js.map