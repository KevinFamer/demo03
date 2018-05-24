module Game {
	class Main extends Core.BaseSingleton
	{
		/** 获取单例实例 */
        public static getInstance():Main
        {
            return Core.BaseSingleton.getInstanceOrCreate(Main);
        }

		// 执行
		run():void 
		{
			this.init();
			
			// 进入登录场景
			sceneMgr.enterScene(Global.SceneId.LOGIN);
		}

		private init():void 
		{
			this.initRegisterScene();
			this.initRegisterView();
		}

		/** 场景统一注册函数，游戏场景初始化前均要先注册 */
        private initRegisterScene():void 
        {
            sceneMgr.registerScene(Global.SceneId.LOGIN, LoginScene);
            sceneMgr.registerScene(Global.SceneId.MAIN, MainScene);
        }

		/** UI界面统一注册函数，游戏UI界面初始化前均要先注册 */
        private initRegisterView():void 
        {
            viewMgr.registerView(Global.ViewId.GAMEOVER_VIEW, GameOverView);
        }
	}

	export let main = Main.getInstance();
	export let sceneMgr = Core.SceneMgr.getInstance();
	export let viewMgr = Core.ViewMgr.getInstance();
	export let loaderMgr = Core.LoaderMgr.getInstance();
}