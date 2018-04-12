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
var MenuScene = /** @class */ (function (_super) {
    __extends(MenuScene, _super);
    function MenuScene() {
        var _this = _super.call(this) || this;
        var layer = new Sprite();
        _this.addChild(layer);
        var winWidth = Browser.width;
        var winHeight = Browser.height;
        var bgWelcome = new Sprite();
        bgWelcome.loadImage("res/graphics/bgWelcome.jpg");
        bgWelcome.x = winWidth / 2;
        bgWelcome.y = winHeight / 2;
        layer.addChild(bgWelcome);
        var title = new Sprite();
        title.loadImage("welcome_title.png");
        title.x = 800;
        title.y = 555;
        layer.addChild(title);
        _this.m_hero = new Sprite();
        _this.m_hero.loadImage("welcome_hero.png");
        _this.m_hero.x = -_this.m_hero.width / 2;
        _this.m_hero.y = 400;
        layer.addChild(_this.m_hero);
        // var move = cc.moveTo(2, cc.p(this.m_hero.width/2 + 100, this.m_hero.y)).easing(cc.easeOut(2));
        // this.m_hero.runAction(move);
        Tween.to(_this.m_hero, { x: _this.m_hero.width / 2 + 100, y: _this.m_hero.y }, 2000);
        // "#welcome_playButton.png", "#welcome_playButton.png", this._play
        _this.m_playBtn = new Button("welcome_playButton.png");
        _this.m_playBtn.x = 700;
        _this.m_playBtn.y = 350;
        _this.m_playBtn.on(Laya.Event.CLICK, _this, _this.f_play);
        layer.addChild(_this.m_playBtn);
        _this.m_aboutBtn = new Button("welcome_aboutButton.png");
        _this.m_aboutBtn.x = 500;
        _this.m_aboutBtn.y = 250;
        _this.m_aboutBtn.on(Laya.Event.CLICK, _this, _this.f_about);
        layer.addChild(_this.m_aboutBtn);
        var soundButton = new CheckBox("soundOn0002.png");
        soundButton.x = 45;
        soundButton.y = winHeight - 45;
        soundButton.on("change", _this, _this.f_toggleSound);
        GameMgr.sound.playMenuBgMusic();
        Timer.frameLoop(2, _this, _this.f_update);
        return _this;
    }
    MenuScene.prototype.f_toggleSound = function () {
        GameMgr.sound.toggleOnOff();
    };
    MenuScene.prototype.f_play = function () {
        GameMgr.sound.playCoffee();
        cc.director.runScene(new GameScene());
    };
    MenuScene.prototype.f_about = function () {
        GameMgr.sound.playMushroom();
        cc.director.runScene(new AboutScene());
    };
    MenuScene.prototype.f_update = function () {
        var currentDate = new Date();
        this.m_hero.y = 400 + (Math.cos(currentDate.getTime() * 0.002)) * 25;
        this.m_playBtn.y = 350 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
        this.m_aboutBtn.y = 250 + (Math.cos(currentDate.getTime() * 0.002)) * 10;
    };
    return MenuScene;
}(View));
//# sourceMappingURL=MenuScene.js.map