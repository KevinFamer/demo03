var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Button = Laya.Button;
    var LayaText = Laya.Text;
    class GameMainUI extends Sprite {
        constructor() {
            super();
            this._lifeTxt = this.createText("生命：0", 300, 30);
            this.addChild(this._lifeTxt);
            this._distanceTxt = this.createText("距离：50", 600, 30);
            this.addChild(this._distanceTxt);
            this._scoreTxt = this.createText("积分：100", 900, 30);
            this.addChild(this._scoreTxt);
            let pauseButton = new Button(Global.Path.SML_IMG_PATH + "pauseButton.png");
            pauseButton.on(Laya.Event.CLICK, this, this.pauseResume);
            pauseButton.x = 80;
            pauseButton.y = 45;
            this.addChild(pauseButton);
            let soundButton = new Button(Global.Path.SML_IMG_PATH + "soundOn0002.png");
            soundButton.on(Laya.Event.CLICK, this, this.toggleOnOff);
            soundButton.x = 80;
            soundButton.y = 100;
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
        createText(Str, PosX, PosY) {
            var txt = new LayaText();
            txt.font = Global.Const.BMP_FONT_NAME;
            txt.fontSize = 20;
            txt.bold = true;
            txt.color = "#ff0000";
            txt.text = Str;
            txt.x = PosX;
            txt.y = PosY;
            return txt;
        }
        update() {
            this._lifeTxt.text = "生命：" + Data.user.lives;
            this._distanceTxt.text = "距离：" + Data.user.distance;
            this._scoreTxt.text = "积分：" + Data.user.score;
        }
    }
    Game.GameMainUI = GameMainUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameMainUI.js.map