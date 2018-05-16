module Game {
    export interface IBaseScene 
    {
        /** 场景ID */
        sceneId:number;

        /** 场景初始化 */
        onInit():void;

        /** 场景显示 */
        onShow():void;

        /** 场景销毁 */
        onDestroy():void;
    }

    export class BaseScene extends Laya.Sprite implements IBaseScene
    {
        sceneId:number;

        /** 场景初始化 */
        onInit():void {}

        /** 场景显示 */
        onShow():void {
            this.pivot(0, 0);
            LayerMgr.getInstance().addChildToScene(this);
        }

        /** 场景销毁 */
        onDestroy():void {
            this.removeSelf();
        }
    }
}