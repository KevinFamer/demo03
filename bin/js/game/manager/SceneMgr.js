var Game;
(function (Game) {
    class SceneMgr extends Core.Singleton {
        /** 获取单例实例 */
        static getInstance() {
            return Core.Singleton.getInstanceOrCreate(SceneMgr);
        }
        onCreate() {
            this._sceneCls = [];
            this.initRegisterScene();
        }
        onDestroy() {
        }
        enterScene(SceneId) {
            let curSceneId;
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
            let scene = new sceneCls();
            scene.onInit();
            scene.onShow();
            this._curScene = scene;
        }
        /** 根据场景ID，获取当前场景实例 */
        getScene(SceneId) {
            if (this._curScene && SceneId == this._curScene.sceneId) {
                return this._curScene;
            }
        }
        /** 注册场景 */
        registerScene(SceneId, SceneCls) {
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
        initRegisterScene() {
            this.registerScene(Global.SceneId.LOGIN, Game.LoginScene);
            this.registerScene(Global.SceneId.MAIN, Game.MainScene);
        }
    }
    Game.SceneMgr = SceneMgr;
})(Game || (Game = {}));
//# sourceMappingURL=SceneMgr.js.map