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
            Game.SceneMgr.getInstance().enterScene(Global.SceneId.LOGIN);
        }
    }
    Game.main = new Main();
})(Game || (Game = {}));
//# sourceMappingURL=Main.js.map