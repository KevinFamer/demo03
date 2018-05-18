module Game {
    import Sprite = Laya.Sprite;
    import Browser = Laya.Browser;
    import Tween = Laya.Tween;
    import Button = Laya.Button;
    import CheckBox = Laya.CheckBox;

    export class LoginScene extends BaseScene {
        private _hero;
        private _playBtn;

        onInit():void 
        {
            this.sceneId = Global.SceneId.LOGIN;
        }

        onShow():void 
        {
            super.onShow();
            this.initUI();
        }

        onDestroy():void 
        {
            super.onDestroy();
        }

        initUI():void 
        {
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

            Tween.to(this._hero, {x:this._hero.width/2 + 100, y:this._hero.y}, 2000);

            this._playBtn = new Button(Global.Path.SML_IMG_PATH + "welcome_playButton.png");
            this._playBtn.x = 500;
            this._playBtn.y = 350;
            this._playBtn.on(Laya.Event.CLICK, this, this.onClickPlay);
            this.addChild(this._playBtn);

            var soundButton = new CheckBox(Global.Path.SML_IMG_PATH + "soundOn0002.png")
            soundButton.x = 45;
            soundButton.y = winHeight - 100;
            soundButton.on("change", this, this.toggleSound);
            this.addChild(soundButton);

            SoundMgr.getInstance().playMenuBgMusic();
            Laya.timer.frameLoop(2, this, this.onUpdate);
        }

        toggleSound():void 
        {
            SoundMgr.getInstance().toggleOnOff();
        }

        onClickPlay():void 
        {
            SoundMgr.getInstance().playCoffee();
            SceneMgr.getInstance().enterScene(Global.SceneId.MAIN);
        }

        onUpdate():void 
        {
            var currentDate = new Date();
            // this.m_hero.y = 400 + (Math.cos(currentDate.getTime() * 0.002)) * 25;
            this._playBtn.y = 350 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
        }
    }
}
