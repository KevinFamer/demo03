var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var Tween = Laya.Tween;
    var Button = Laya.Button;
    var CheckBox = Laya.CheckBox;
    class LoginScene extends Game.BaseScene {
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
            bgWelcome.x = winWidth / 2;
            bgWelcome.y = winHeight / 2;
            this.addChild(bgWelcome);
            var title = new Sprite();
            title.loadImage(Global.Path.SML_IMG_PATH + "welcome_title.png");
            title.x = 800;
            title.y = 555;
            this.addChild(title);
            this.m_hero = new Sprite();
            this.m_hero.loadImage(Global.Path.SML_IMG_PATH + "welcome_hero.png");
            this.m_hero.x = -this.m_hero.width / 2;
            this.m_hero.y = 400;
            this.addChild(this.m_hero);
            // var move = cc.moveTo(2, cc.p(this.m_hero.width/2 + 100, this.m_hero.y)).easing(cc.easeOut(2));
            // this.m_hero.runAction(move);
            Tween.to(this.m_hero, { x: this.m_hero.width / 2 + 100, y: this.m_hero.y }, 2000);
            // "#welcome_playButton.png", "#welcome_playButton.png", this._play
            this.m_playBtn = new Button(Global.Path.SML_IMG_PATH + "welcome_playButton.png");
            this.m_playBtn.x = 700;
            this.m_playBtn.y = 350;
            this.m_playBtn.on(Laya.Event.CLICK, this, this.play);
            this.addChild(this.m_playBtn);
            this.m_aboutBtn = new Button(Global.Path.SML_IMG_PATH + "welcome_aboutButton.png");
            this.m_aboutBtn.x = 500;
            this.m_aboutBtn.y = 250;
            this.m_aboutBtn.on(Laya.Event.CLICK, this, this.about);
            this.addChild(this.m_aboutBtn);
            var soundButton = new CheckBox(Global.Path.SML_IMG_PATH + "soundOn0002.png");
            soundButton.x = 45;
            soundButton.y = winHeight - 45;
            soundButton.on("change", this, this.toggleSound);
            Game.SoundMgr.getInstance().playMenuBgMusic();
            Laya.timer.frameLoop(2, this, this.update);
        }
        toggleSound() {
            Game.SoundMgr.getInstance().toggleOnOff();
        }
        play() {
            Game.SoundMgr.getInstance().playCoffee();
            Game.SceneMgr.getInstance().enterScene(Global.SceneId.MAIN);
        }
        about() {
            Game.SoundMgr.getInstance().playMushroom();
        }
        update() {
            var currentDate = new Date();
            this.m_hero.y = 400 + (Math.cos(currentDate.getTime() * 0.002)) * 25;
            this.m_playBtn.y = 350 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
            this.m_aboutBtn.y = 250 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
        }
    }
    Game.LoginScene = LoginScene;
})(Game || (Game = {}));
//# sourceMappingURL=LoginScene.js.map