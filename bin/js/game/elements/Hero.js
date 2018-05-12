var Game;
(function (Game) {
    var Animation = Laya.Animation;
    var Sprite = Laya.Sprite;
    class Hero extends Sprite {
        constructor() {
            super();
            this.m_animation = null;
            this.m_fast = false;
            this.m_state = 0;
            this.loadImage("fly_0001.png");
            this.m_animation = new Animation();
            var imgPaths = [];
            for (var i = 1; i < 20; i++) {
                imgPaths.push(Global.Path.SML_IMG_PATH + "fly_00" + (i < 10 ? ('0' + i) : i) + ".png");
            }
            this.m_animation.loadImages(imgPaths);
            this.m_animation.interval = 50;
            this.m_animation.play();
            this.m_fast = false;
        }
        toggleSpeed(PFast) {
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
        }
        onExit() {
            this.m_animation.destroy();
        }
    }
    Game.Hero = Hero;
})(Game || (Game = {}));
//# sourceMappingURL=Hero.js.map