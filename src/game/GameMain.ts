class GameMain {
	curSceneName:number;

	private m_loginScene:LoginScene;
	private m_aboutScene:AboutScene;
	private m_mainScene:MainScene;

	constructor() {
		this.init();
	}

	init():void {
	}

	// 执行
	run():void {
		this.enterLoginScene();
	}

	enterLoginScene():void {
		if (this.curSceneName == SceneName.LoginScene) {
			return;
		}
		this.outScene();
		this.m_loginScene = new LoginScene();
		this.m_loginScene.name = SceneName.LoginScene.toString();
		Laya.stage.addChild(this.m_loginScene);
	}

	enterAboutScene():void {
		if (this.curSceneName == SceneName.AboutScene) {
			return;
		}
		this.outScene();
		this.m_aboutScene = new AboutScene();
		this.m_aboutScene.name = SceneName.AboutScene.toString();
		Laya.stage.addChild(this.m_aboutScene);
	}

	enterMainScene():void {
		if (this.curSceneName == SceneName.MainScene) {
			return;
		}
		this.outScene();
		this.m_mainScene = new MainScene();
		this.m_mainScene.name = SceneName.MainScene.toString();
		Laya.stage.addChild(this.m_mainScene);
	}

	outScene(PSceneName:number = null):void {
		if (PSceneName) {
			Laya.stage.removeChildByName(PSceneName.toString());
		} else if (this.curSceneName) {
			Laya.stage.removeChildByName(this.curSceneName.toString());
			this.curSceneName = null;
		}
	}
}