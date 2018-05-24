var Game;
(function (Game) {
    class Main extends Core.BaseSingleton {
        /** 获取单例实例 */
        static getInstance() {
            return Core.BaseSingleton.getInstanceOrCreate(Main);
        }
        // 执行
        run() {
            this.init();
            // 进入登录场景
            Game.sceneMgr.enterScene(Global.SceneId.LOGIN);
        }
        init() {
            this.initRegisterScene();
            this.initRegisterView();
        }
        /** 场景统一注册函数，游戏场景初始化前均要先注册 */
        initRegisterScene() {
            Game.sceneMgr.registerScene(Global.SceneId.LOGIN, Game.LoginScene);
            Game.sceneMgr.registerScene(Global.SceneId.MAIN, Game.MainScene);
        }
        /** UI界面统一注册函数，游戏UI界面初始化前均要先注册 */
        initRegisterView() {
            Game.viewMgr.registerView(Global.ViewId.GAMEOVER_VIEW, Game.GameOverView);
        }
    }
    Game.main = Main.getInstance();
    Game.sceneMgr = Core.SceneMgr.getInstance();
    Game.viewMgr = Core.ViewMgr.getInstance();
    Game.loaderMgr = Core.LoaderMgr.getInstance();
})(Game || (Game = {}));
//# sourceMappingURL=GameMain.js.map