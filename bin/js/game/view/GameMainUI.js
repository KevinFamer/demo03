var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var Button = Laya.Button;
    var LayaText = Laya.Text;
    class GameMainUI extends Sprite {
        constructor() {
            super();
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            var lifeLabel = this.createText("L I V E S", 360, winHeight - 25);
            this.addChild(lifeLabel);
            this.m_lifeText = this.createText("0", 360, winHeight - 60);
            this.addChild(this.m_lifeText);
            var distanceLabel = this.createText("D I S T A N C E", 680, winHeight - 25);
            this.addChild(distanceLabel);
            this.m_distanceText = this.createText("50", 680, winHeight - 60);
            this.addChild(this.m_distanceText);
            var scoreLabel = this.createText("S C O R E", 915, winHeight - 25);
            this.addChild(scoreLabel);
            this.m_scoreText = this.createText("100", 915, winHeight - 60);
            this.addChild(this.m_scoreText);
            var pauseButton = new Button(Global.Path.SML_IMG_PATH + "pauseButton.png");
            pauseButton.on(Laya.Event.CLICK, this, this.pauseResume);
            pauseButton.x = 80;
            pauseButton.y = winHeight - 45;
            this.addChild(pauseButton);
            var soundButton = new Button(Global.Path.SML_IMG_PATH + "soundOn0002.png");
            soundButton.on(Laya.Event.CLICK, this, this.toggleOnOff);
            soundButton.x = 80;
            soundButton.y = winHeight - 100;
            this.addChild(soundButton);
        }
        pauseResume() {
            // if(cc.director.isPaused())
            //     cc.director.resume();
            // else
            //     cc.director.pause();
        }
        toggleOnOff() {
            Game.SoundMgr.getInstance().toggleOnOff();
        }
        createText(PStr, PX, PY) {
            var txt = new LayaText();
            txt.font = Global.Const.BMP_FONT_NAME;
            txt.fontSize = 20;
            txt.color = "#ff00ff";
            txt.text = PStr;
            txt.x = PX;
            txt.y = PY;
            return txt;
        }
        update() {
            this.m_lifeText.text = Data.user.lives;
            this.m_distanceText.text = Data.user.distance;
            this.m_scoreText.text = Data.user.score;
        }
    }
    Game.GameMainUI = GameMainUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameMainUI.js.map