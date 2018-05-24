var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var Tween = Laya.Tween;
    var Button = Laya.Button;
    var CheckBox = Laya.CheckBox;
    class LoginScene extends Core.BaseScene {
        onInit() {
            this.sceneId = Global.SceneId.LOGIN;
        }
        onShow() {
            super.onShow();
            this.initUI();
        }
        onDestroy() {
            super.onDestroy();
        }
        initUI() {
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            var bgWelcome = new Sprite();
            bgWelcome.loadImage(Global.Path.JPG_WELCOME_PATH);
            this.addChild(bgWelcome);
            var title = new Sprite();
            title.loadImage(Global.Path.SML_IMG_PATH + "welcome_title.png");
            title.x = winWidth * 0.5;
            title.y = 200;
            this.addChild(title);
            this._hero = new Sprite();
            this._hero.loadImage(Global.Path.SML_IMG_PATH + "welcome_hero.png");
            this._hero.x = -this._hero.width;
            this._hero.y = 400;
            this.addChild(this._hero);
            Tween.to(this._hero, { x: this._hero.width / 2 + 100, y: this._hero.y }, 2000);
            this._playBtn = new Button(Global.Path.SML_IMG_PATH + "welcome_playButton.png");
            this._playBtn.x = 500;
            this._playBtn.y = 350;
            this._playBtn.on(Laya.Event.CLICK, this, this.onClickPlay);
            this.addChild(this._playBtn);
            var soundButton = new CheckBox(Global.Path.SML_IMG_PATH + "soundOn0002.png");
            soundButton.x = 45;
            soundButton.y = winHeight - 100;
            soundButton.on("change", this, this.toggleSound);
            this.addChild(soundButton);
            Game.SoundMgr.getInstance().playMenuBgMusic();
            Laya.timer.frameLoop(2, this, this.onUpdate);
        }
        toggleSound() {
            Game.SoundMgr.getInstance().toggleOnOff();
        }
        onClickPlay() {
            Game.SoundMgr.getInstance().playCoffee();
            Game.sceneMgr.enterScene(Global.SceneId.MAIN);
        }
        onUpdate() {
            var currentDate = new Date();
            // this.m_hero.y = 400 + (Math.cos(currentDate.getTime() * 0.002)) * 25;
            this._playBtn.y = 350 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
        }
    }
    Game.LoginScene = LoginScene;
})(Game || (Game = {}));
//# sourceMappingURL=LoginScene.js.map