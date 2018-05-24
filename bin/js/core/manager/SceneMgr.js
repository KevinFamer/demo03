var Core;
(function (Core) {
    /**
     * 场景管理器
     */
    class SceneMgr extends Core.BaseSingleton {
        /** 获取单例实例 */
        static getInstance() {
            return Core.BaseSingleton.getInstanceOrCreate(SceneMgr);
        }
        onCreate() {
            this._sceneCls = [];
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
            this._curScene = scene;
            scene.onInit();
            scene.onShow();
        }
        /** 根据场景ID，获取当前场景实例 */
        getCurScene() {
            return this._curScene;
        }
        /** 注册场景 */
        registerScene(SceneId, SceneCls) {
            if (!SceneId || !SceneCls) {
                console.log("[SceneMgr] registerScene : SceneId or SceneCls is null", SceneId, SceneCls);
                return;
            }
            if (this._sceneCls[SceneId] != null) {
                console.log("[SceneMgr] registerView : SceneCls is exist, SceneId = ", SceneId);
                return;
            }
            this._sceneCls[SceneId] = SceneCls;
        }
    }
    Core.SceneMgr = SceneMgr;
})(Core || (Core = {}));
//# sourceMappingURL=SceneMgr.js.map