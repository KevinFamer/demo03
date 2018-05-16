module Game {
	class Main 
	{
		constructor() 
		{
			this.init();
		}

		init():void 
		{

		}

		// 执行
		run():void 
		{
			ViewMgr.getInstance().hideView(Global.ViewId.LOADING_VIEW);
			SceneMgr.getInstance().enterScene(Global.SceneId.LOGIN);
		}
	}

	export let main:Main = new Main();
}