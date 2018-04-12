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
var GameSceneUI = /** @class */ (function (_super) {
    __extends(GameSceneUI, _super);
    function GameSceneUI() {
        var _this = _super.call(this) || this;
        var fnt = "res/fonts/font.fnt";
        var winWidth = Browser.width;
        var winHeight = Browser.height;
        var lifeLabel = _this.f_createText("L I V E S", 360, winHeight - 25);
        _this.addChild(lifeLabel);
        _this.m_lifeText = _this.f_createText("0", 360, winHeight - 60);
        _this.addChild(_this.m_lifeText);
        var distanceLabel = _this.f_createText("D I S T A N C E", 680, winHeight - 25);
        _this.addChild(distanceLabel);
        _this.m_distanceText = _this.f_createText("50", 680, winHeight - 60);
        _this.addChild(_this.m_distanceText);
        var scoreLabel = _this.f_createText("S C O R E", 915, winHeight - 25);
        _this.addChild(scoreLabel);
        _this.m_scoreText = _this.f_createText("100", 915, winHeight - 60);
        _this.addChild(_this.m_scoreText);
        var pauseButton = new Button("pauseButton.png");
        pauseButton.on(Laya.Event.CLICK, _this, _this.f_pauseResume);
        pauseButton.x = 80;
        pauseButton.y = winHeight - 45;
        _this.addChild(pauseButton);
        var soundButton = new Button("soundOn0002.png");
        soundButton.on(Laya.Event.CLICK, _this, _this.f_toggleOnOff);
        soundButton.x = 80;
        soundButton.y = winHeight - 100;
        _this.addChild(soundButton);
        return _this;
    }
    GameSceneUI.prototype.f_pauseResume = function () {
        // if(cc.director.isPaused())
        //     cc.director.resume();
        // else
        //     cc.director.pause();
    };
    GameSceneUI.prototype.f_toggleOnOff = function () {
        GameMgr.sound.toggleOnOff();
    };
    GameSceneUI.prototype.f_createText = function (PStr, PX, PY) {
        var txt = new LayaText();
        txt.font = Const.BMP_FONT_NAME;
        txt.fontSize = 20;
        txt.color = "#ff00ff";
        txt.text = PStr;
        txt.x = PX;
        txt.y = PY;
        return txt;
    };
    GameSceneUI.prototype.update = function () {
        this.m_lifeText.setString(GameData.user.lives.toString());
        this.m_distanceText.setString(GameData.user.distance.toString());
        this.m_scoreText.setString(GameData.user.score.toString());
    };
    return GameSceneUI;
}(Sprite));
//# sourceMappingURL=GameSceneUI.js.map