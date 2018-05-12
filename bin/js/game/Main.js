var Game;
(function (Game) {
    let SceneName;
    (function (SceneName) {
        SceneName[SceneName["LoginScene"] = 0] = "LoginScene";
        SceneName[SceneName["AboutScene"] = 1] = "AboutScene";
        SceneName[SceneName["MainScene"] = 2] = "MainScene";
    })(SceneName || (SceneName = {}));
    class Main {
        constructor() {
            this.init();
        }
        init() {
        }
        // 执行
        run() {
            this.enterLoginScene();
        }
        enterLoginScene() {
            if (this.curSceneName == SceneName.LoginScene) {
                return;
            }
            this.outScene();
            this.m_loginScene = new Game.LoginScene();
            this.m_loginScene.name = SceneName.LoginScene.toString();
            Laya.stage.addChild(this.m_loginScene);
        }
        enterAboutScene() {
            if (this.curSceneName == SceneName.AboutScene) {
                return;
            }
            this.outScene();
            this.m_aboutScene = new Game.AboutScene();
            this.m_aboutScene.name = SceneName.AboutScene.toString();
            Laya.stage.addChild(this.m_aboutScene);
        }
        enterMainScene() {
            if (this.curSceneName == SceneName.MainScene) {
                return;
            }
            this.outScene();
            this.m_mainScene = new Game.MainScene();
            this.m_mainScene.name = SceneName.MainScene.toString();
            Laya.stage.addChild(this.m_mainScene);
        }
        outScene(PSceneName = null) {
            if (PSceneName) {
                Laya.stage.removeChildByName(PSceneName.toString());
            }
            else if (this.curSceneName) {
                Laya.stage.removeChildByName(this.curSceneName.toString());
                this.curSceneName = null;
            }
        }
    }
    Game.main = new Main();
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map