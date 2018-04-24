declare module laya.ui {
    import View = laya.ui.View;

    class BaseView extends View {
        /** 每次显示界面时都会执行一次 */
        onShow(Param?:any):void;
        /** 每次隐藏界面时都会执行一次 */
        onHide():void;

        /** 第一次初始化界面时执行，并且只执行一次 */
        onInit(Param?:any):void;
        /** 当界面完全释放时执行，并且只执行一次 */
        onDestroy():void;
    }
}