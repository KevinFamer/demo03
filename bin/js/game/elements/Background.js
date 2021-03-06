var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    class Background extends Sprite {
        constructor() {
            super();
            this.m_speed = 5;
            //sky
            this.m_bg1 = this.createBackground(Global.Path.JPG_BGMAP_PATH);
            this.addChild(this.m_bg1);
            //hill
            this.m_bg2 = this.createBackground("graphics/bgLayer2.png");
            this.addChild(this.m_bg2);
            //buildings
            this.m_bg3 = this.createBackground("graphics/bgLayer3.png");
            this.addChild(this.m_bg3);
            //trees
            this.m_bg4 = this.createBackground("graphics/bgLayer4.png");
            this.addChild(this.m_bg4);
            Laya.timer.frameLoop(2, this, this.onUpdate);
        }
        createBackground(PImgPath) {
            var layer = new Sprite();
            var bg1 = new Sprite();
            bg1.loadImage(PImgPath);
            bg1.x = bg1.width * 0.5;
            bg1.y = bg1.height * 0.5;
            layer.addChild(bg1);
            var bg2 = new Sprite();
            bg2.x = bg2.width / 2 + bg2.width;
            bg2.y = bg2.height / 2;
            layer.addChild(bg2);
            return layer;
        }
        onUpdate() {
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            this.m_bg1.x -= Math.ceil(this.m_speed * 0.02);
            if (this.m_bg1.x < -winWidth) {
                this.m_bg1.x = 0;
            }
            this.m_bg2.x -= Math.ceil(this.m_speed * 0.2);
            if (this.m_bg2.x < -winWidth) {
                this.m_bg2.x = 0;
            }
            this.m_bg3.x -= Math.ceil(this.m_speed * 0.5);
            if (this.m_bg3.x < -winWidth) {
                this.m_bg3.x = 0;
            }
            this.m_bg4.x -= Math.ceil(this.m_speed * 1);
            if (this.m_bg4.x < -winWidth) {
                this.m_bg4.x = 0;
            }
        }
    }
    Game.Background = Background;
})(Game || (Game = {}));
//# sourceMappingURL=Background.js.map