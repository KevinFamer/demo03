class LoginScene extends Sprite {
    private m_hero;
    private m_playBtn;
    private m_aboutBtn;

    constructor() {
         super();

         var layer = new Sprite();
         this.addChild(layer);

        var winWidth = Browser.width;
        var winHeight = Browser.height;
        var bgWelcome = new Sprite();
        bgWelcome.loadImage("res/graphics/bgWelcome.jpg");
        bgWelcome.x = winWidth/2;
        bgWelcome.y = winHeight/2;
        layer.addChild(bgWelcome);

        var title = new Sprite();
        title.loadImage("welcome_title.png");
        title.x = 800;
        title.y = 555;
        layer.addChild(title);

        this.m_hero = new Sprite();
        this.m_hero.loadImage("welcome_hero.png");
        this.m_hero.x = -this.m_hero.width/2;
        this.m_hero.y = 400;
        layer.addChild(this.m_hero);

        // var move = cc.moveTo(2, cc.p(this.m_hero.width/2 + 100, this.m_hero.y)).easing(cc.easeOut(2));
        // this.m_hero.runAction(move);
        Tween.to(this.m_hero, {x:this.m_hero.width/2 + 100, y:this.m_hero.y}, 2000);

        // "#welcome_playButton.png", "#welcome_playButton.png", this._play
        this.m_playBtn = new Button("welcome_playButton.png");
        this.m_playBtn.x = 700;
        this.m_playBtn.y = 350;
        this.m_playBtn.on(Laya.Event.CLICK, this, this.f_play);
        layer.addChild(this.m_playBtn);

        this.m_aboutBtn = new Button("welcome_aboutButton.png");
        this.m_aboutBtn.x = 500;
        this.m_aboutBtn.y = 250;
        this.m_aboutBtn.on(Laya.Event.CLICK, this, this.f_about);
        layer.addChild(this.m_aboutBtn);

        var soundButton = new CheckBox("soundOn0002.png")
        soundButton.x = 45;
        soundButton.y = winHeight - 45;
        soundButton.on("change", this, this.f_toggleSound);

        GameMgr.sound.playMenuBgMusic();
        Timer.frameLoop(2, this, this.f_update);
    }

    f_toggleSound():void {
        GameMgr.sound.toggleOnOff();
    }

    f_play():void {
        GameMgr.sound.playCoffee();
        Game.Main.enterMainScene();
    }

    f_about():void {
        GameMgr.sound.playMushroom();
        Game.Main.enterAboutScene();
    }

    f_update():void {
        var currentDate = new Date();
        this.m_hero.y = 400 + (Math.cos(currentDate.getTime() * 0.002)) * 25;
        this.m_playBtn.y = 350 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
        this.m_aboutBtn.y = 250 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
    }
}