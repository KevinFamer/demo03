declare module laya.ui {
    import View = laya.ui.View;

    class BaseView extends View {
        protected onShow():void;
        protected onHide():void;
        protected onDestroy():void;
        protected onInit():void;
    }
}