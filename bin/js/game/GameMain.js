var GameMain = /** @class */ (function () {
    function GameMain() {
        this.init();
    }
    GameMain.prototype.init = function () {
    };
    // 执行
    GameMain.prototype.run = function () {
        this.enterLoginScene();
    };
    GameMain.prototype.enterLoginScene = function () {
        if (this.curSceneName == SceneName.LoginScene) {
            return;
        }
        this.outScene();
        this.m_loginScene = new LoginScene();
        this.m_loginScene.name = SceneName.LoginScene.toString();
        Laya.stage.addChild(this.m_loginScene);
    };
    GameMain.prototype.enterAboutScene = function () {
        if (this.curSceneName == SceneName.AboutScene) {
            return;
        }
        this.outScene();
        this.m_aboutScene = new AboutScene();
        this.m_aboutScene.name = SceneName.AboutScene.toString();
        Laya.stage.addChild(this.m_aboutScene);
    };
    GameMain.prototype.enterMainScene = function () {
        if (this.curSceneName == SceneName.MainScene) {
            return;
        }
        this.outScene();
        this.m_mainScene = new MainScene();
        this.m_mainScene.name = SceneName.MainScene.toString();
        Laya.stage.addChild(this.m_mainScene);
    };
    GameMain.prototype.outScene = function (PSceneName) {
        if (PSceneName === void 0) { PSceneName = null; }
        if (PSceneName) {
            Laya.stage.removeChildByName(PSceneName.toString());
        }
        else if (this.curSceneName) {
            Laya.stage.removeChildByName(this.curSceneName.toString());
            this.curSceneName = null;
        }
    };
    return GameMain;
}());
//# sourceMappingURL=GameMain.js.map