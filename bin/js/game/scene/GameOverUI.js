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
var Game;
(function (Game) {
    var userData = Data.user;
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI(PGameScene) {
            var _this = _super.call(this) || this;
            _this.m_gameScene = PGameScene;
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            var bg = new Sprite();
            bg.width = winWidth;
            bg.height = winHeight;
            bg.graphics.drawRect(0, 0, winWidth, winHeight, "0x000000", "0xffffff", 4);
            _this.addChild(bg);
            var title = new LayaText();
            _this.addChild(title);
            title.font = Global.Const.BMP_FONT_NAME;
            title.fontSize = 20;
            title.color = "#ff00ff";
            title.text = "HERO WAS KILLED!";
            title.x = winWidth / 2;
            title.y = winHeight - 120;
            _this.m_distanceText = new LayaText();
            _this.addChild(_this.m_distanceText);
            _this.m_distanceText.font = Global.Const.BMP_FONT_NAME;
            _this.m_distanceText.fontSize = 20;
            _this.m_distanceText.text = "DISTANCE TRAVELLED: 0000000";
            _this.m_distanceText.x = winWidth / 2;
            _this.m_distanceText.y = winHeight - 220;
            _this.m_scoreText = new LayaText();
            _this.addChild(_this.m_scoreText);
            _this.m_scoreText.font = Global.Const.BMP_FONT_NAME;
            _this.m_scoreText.fontSize = 20;
            _this.m_scoreText.text = "SCORE: 0000000";
            _this.m_scoreText.x = winWidth / 2;
            _this.m_scoreText.y = winHeight - 270;
            var replayBtn = new Button("gameOver_playAgainButton.png");
            replayBtn.on(Laya.Event.CLICK, _this, _this.f_replay);
            _this.addChild(replayBtn);
            var aboutBtn = new Button("gameOver_aboutButton.png");
            aboutBtn.on(Laya.Event.CLICK, _this, _this.f_about);
            _this.addChild(aboutBtn);
            var mainBtn = new Button("gameOver_mainButton.png");
            mainBtn.on(Laya.Event.CLICK, _this, _this.f_return);
            _this.addChild(mainBtn);
            return _this;
        }
        GameOverUI.prototype.init = function () {
            this.m_distanceText.setString("DISTANCE TRAVELLED: " + userData.distance);
            this.m_scoreText.setString("SCORE: " + userData.score);
        };
        GameOverUI.prototype.f_replay = function () {
            this.m_gameScene.init();
        };
        GameOverUI.prototype.f_about = function () {
            Game.main.enterAboutScene();
        };
        GameOverUI.prototype.f_return = function () {
            Game.main.enterLoginScene();
        };
        return GameOverUI;
    }(Sprite));
    Game.GameOverUI = GameOverUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameOverUI.js.map