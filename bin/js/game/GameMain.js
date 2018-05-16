var Game;
(function (Game) {
    class Main {
        constructor() {
            this.init();
        }
        init() {
        }
        // 执行
        run() {
            Game.ViewMgr.getInstance().hideView(Global.ViewId.LOADING_VIEW);
            Game.SceneMgr.getInstance().enterScene(Global.SceneId.LOGIN);
        }
    }
    Game.main = new Main();
})(Game || (Game = {}));
//# sourceMappingURL=GameMain.js.map