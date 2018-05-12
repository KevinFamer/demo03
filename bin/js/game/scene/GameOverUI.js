var Game;
(function (Game) {
    var userData = Data.user;
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var LayaText = Laya.Text;
    var Button = Laya.Button;
    class GameOverUI extends Sprite {
        constructor(PGameScene) {
            super();
            this.m_gameScene = PGameScene;
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            var bg = new Sprite();
            bg.width = winWidth;
            bg.height = winHeight;
            bg.graphics.drawRect(0, 0, winWidth, winHeight, "0x000000", "0xffffff", 4);
            this.addChild(bg);
            var title = new LayaText();
            this.addChild(title);
            title.font = Global.Const.BMP_FONT_NAME;
            title.fontSize = 20;
            title.color = "#ff00ff";
            title.text = "HERO WAS KILLED!";
            title.x = winWidth / 2;
            title.y = winHeight - 120;
            this.m_distanceText = new LayaText();
            this.addChild(this.m_distanceText);
            this.m_distanceText.font = Global.Const.BMP_FONT_NAME;
            this.m_distanceText.fontSize = 20;
            this.m_distanceText.text = "DISTANCE TRAVELLED: 0000000";
            this.m_distanceText.x = winWidth / 2;
            this.m_distanceText.y = winHeight - 220;
            this.m_scoreText = new LayaText();
            this.addChild(this.m_scoreText);
            this.m_scoreText.font = Global.Const.BMP_FONT_NAME;
            this.m_scoreText.fontSize = 20;
            this.m_scoreText.text = "SCORE: 0000000";
            this.m_scoreText.x = winWidth / 2;
            this.m_scoreText.y = winHeight - 270;
            var replayBtn = new Button("gameOver_playAgainButton.png");
            replayBtn.on(Laya.Event.CLICK, this, this.f_replay);
            this.addChild(replayBtn);
            var aboutBtn = new Button("gameOver_aboutButton.png");
            aboutBtn.on(Laya.Event.CLICK, this, this.f_about);
            this.addChild(aboutBtn);
            var mainBtn = new Button("gameOver_mainButton.png");
            mainBtn.on(Laya.Event.CLICK, this, this.f_return);
            this.addChild(mainBtn);
        }
        init() {
            this.m_distanceText.setString("DISTANCE TRAVELLED: " + userData.distance);
            this.m_scoreText.setString("SCORE: " + userData.score);
        }
        f_replay() {
            this.m_gameScene.init();
        }
        f_about() {
            Game.main.enterAboutScene();
        }
        f_return() {
            Game.main.enterLoginScene();
        }
    }
    Game.GameOverUI = GameOverUI;
})(Game || (Game = {}));
//# sourceMappingURL=GameOverUI.js.map