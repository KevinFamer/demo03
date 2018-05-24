var Core;
(function (Core) {
    /**
     * 场景基类
     */
    class BaseScene extends Laya.Sprite {
        /** 场景初始化 */
        onInit() { }
        /** 场景显示 */
        onShow() {
            this.pivot(0, 0);
            Core.LayerMgr.getInstance().addChildToScene(this);
        }
        /** 场景销毁 */
        onDestroy() {
            this.removeSelf();
        }
    }
    Core.BaseScene = BaseScene;
})(Core || (Core = {}));
//# sourceMappingURL=BaseScene.js.map