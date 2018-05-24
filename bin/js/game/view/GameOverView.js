/**
 * 游戏结束界面
 */
var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Text = Laya.Text;
    var Button = Laya.Button;
    class GameOverView extends Sprite {
        onShow(Param) {
            var winWidth = Laya.stage.width;
            var winHeight = Laya.stage.height;
            var bg = new Sprite();
            bg.graphics.drawRect(50, 50, winWidth - 100, winHeight - 100, "0x000000", "0xffffff", 4);
            this.addChild(bg);
            var title = new Text();
            this.addChild(title);
            title.font = Global.Const.BMP_FONT_NAME;
            title.fontSize = 20;
            title.color = "#ff00ff";
            title.text = "你挂了!";
            title.pivot(0.5, 0.5);
            title.pos(winWidth / 2, winHeight / 2 - 200);
            this.m_distanceText = new Text();
            this.addChild(this.m_distanceText);
            this.m_distanceText.font = Global.Const.BMP_FONT_NAME;
            this.m_distanceText.fontSize = 20;
            this.m_distanceText.color = "#ff0000";
            this.m_distanceText.text = "飞行距离:" + Data.user.distance;
            this.m_distanceText.x = winWidth / 2;
            this.m_distanceText.y = winHeight / 2;
            this.m_scoreText = new Text();
            this.addChild(this.m_scoreText);
            this.m_scoreText.font = Global.Const.BMP_FONT_NAME;
            this.m_scoreText.fontSize = 20;
            this.m_scoreText.color = "#ff0000";
            this.m_scoreText.text = "得分:" + Data.user.score;
            this.m_scoreText.x = winWidth / 2;
            this.m_scoreText.y = winHeight / 2 + 100;
            var replayBtn = new Button(Global.Path.SML_IMG_PATH + "gameOver_playAgainButton.png");
            replayBtn.pivot(0.5, 0.5);
            replayBtn.pos(winWidth / 2 - 100, winHeight / 2 + 200);
            replayBtn.on(Laya.Event.CLICK, this, this.onReplay);
            this.addChild(replayBtn);
            var mainBtn = new Button(Global.Path.SML_IMG_PATH + "gameOver_mainButton.png");
            mainBtn.pivot(0.5, 0.5);
            mainBtn.pos(winWidth / 2 + 100, winHeight / 2 + 200);
            mainBtn.on(Laya.Event.CLICK, this, this.backToLogin);
            this.addChild(mainBtn);
        }
        onInit() {
            this.m_gameScene = Game.sceneMgr.getCurScene();
        }
        onHide() {
        }
        onDestroy() {
        }
        onReplay() {
            this.m_gameScene.init();
        }
        backToLogin() {
            Game.sceneMgr.enterScene(Global.SceneId.LOGIN);
        }
    }
    Game.GameOverView = GameOverView;
})(Game || (Game = {}));
//# sourceMappingURL=GameOverView.js.map