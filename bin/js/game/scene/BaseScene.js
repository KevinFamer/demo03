var Game;
(function (Game) {
    class BaseScene extends Laya.Sprite {
        /** 场景初始化 */
        onInit() { }
        /** 场景显示 */
        onShow() {
            this.pivot(0, 0);
            Game.LayerMgr.getInstance().addChildToScene(this);
        }
        /** 场景销毁 */
        onDestroy() {
            this.removeSelf();
        }
    }
    Game.BaseScene = BaseScene;
})(Game || (Game = {}));
//# sourceMappingURL=BaseScene.js.map