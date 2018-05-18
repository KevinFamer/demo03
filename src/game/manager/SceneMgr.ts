module Game {
    export class SceneMgr extends Core.Singleton
    {
        /** 获取单例实例 */
        public static getInstance():SceneMgr
        {
            return Core.Singleton.getInstanceOrCreate(SceneMgr);
        }

        // 游戏场景类集
        private _sceneCls:Array<any>;
        // 当前处在的场景
        private _curScene:BaseScene;

        protected onCreate():void
        {
            this._sceneCls = [];
            this.initRegisterScene();
        }

        protected onDestroy():void
        {
        }

        enterScene(SceneId:number):void 
        {
            let curSceneId:number;
            if (this._curScene) {
                curSceneId = this._curScene.sceneId;
            }

            if (curSceneId && curSceneId == SceneId) {
                return;
            }

            let sceneCls = this._sceneCls[SceneId];
            if (!sceneCls) {
                console.log("[SceneMgr] enterScene : SceneCls is not register, SceneId = " + SceneId);
                return;
            }

            if (this._curScene) {
                this._curScene.onDestroy();
                this._curScene = undefined;
            }

            let scene:BaseScene = new sceneCls();
            this._curScene = scene;
            scene.onInit();
            scene.onShow();
        }

        /** 根据场景ID，获取当前场景实例 */
        getCurScene():BaseScene
        {
            return this._curScene
        }

        /** 注册场景 */
        registerScene(SceneId:number, SceneCls:any):void 
        {
            if (!SceneId || !SceneCls) {
                console.log("[SceneMgr] registerScene : SceneId or SceneCls is null", SceneId, SceneCls);
                return;
            }
            if (this._sceneCls[SceneId] != null) {
                console.log("[SceneMgr] registerView : SceneCls(${SceneId}) is exist");
                return;
            }
            this._sceneCls[SceneId] = SceneCls;
        }
        
        /** 场景统一注册函数，游戏场景初始化前均要先注册 */
        private initRegisterScene():void 
        {
            this.registerScene(Global.SceneId.LOGIN, LoginScene);
            this.registerScene(Global.SceneId.MAIN, MainScene);
        }
    }
}