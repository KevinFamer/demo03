var Game;
(function (Game) {
    var SceneName;
    (function (SceneName) {
        SceneName[SceneName["LoginScene"] = 0] = "LoginScene";
        SceneName[SceneName["AboutScene"] = 1] = "AboutScene";
        SceneName[SceneName["MainScene"] = 2] = "MainScene";
    })(SceneName || (SceneName = {}));
    var Main = /** @class */ (function () {
        function Main() {
            this.init();
        }
        Main.prototype.init = function () {
        };
        // 执行
        Main.prototype.run = function () {
            this.enterLoginScene();
        };
        Main.prototype.enterLoginScene = function () {
            if (this.curSceneName == SceneName.LoginScene) {
                return;
            }
            this.outScene();
            this.m_loginScene = new Game.LoginScene();
            this.m_loginScene.name = SceneName.LoginScene.toString();
            Laya.stage.addChild(this.m_loginScene);
        };
        Main.prototype.enterAboutScene = function () {
            if (this.curSceneName == SceneName.AboutScene) {
                return;
            }
            this.outScene();
            this.m_aboutScene = new Game.AboutScene();
            this.m_aboutScene.name = SceneName.AboutScene.toString();
            Laya.stage.addChild(this.m_aboutScene);
        };
        Main.prototype.enterMainScene = function () {
            if (this.curSceneName == SceneName.MainScene) {
                return;
            }
            this.outScene();
            this.m_mainScene = new Game.MainScene();
            this.m_mainScene.name = SceneName.MainScene.toString();
            Laya.stage.addChild(this.m_mainScene);
        };
        Main.prototype.outScene = function (PSceneName) {
            if (PSceneName === void 0) { PSceneName = null; }
            if (PSceneName) {
                Laya.stage.removeChildByName(PSceneName.toString());
            }
            else if (this.curSceneName) {
                Laya.stage.removeChildByName(this.curSceneName.toString());
                this.curSceneName = null;
            }
        };
        return Main;
    }());
    Game.main = new Main();
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map