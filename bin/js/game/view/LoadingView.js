var Game;
(function (Game) {
    /**
    * loading界面
    */
    class LoadingView extends ui.ui_loadingUI {
        constructor() {
            super(...arguments);
            this.onLoaded = () => {
                if (this._loadedFunc) {
                    this._loadedFunc();
                    this._loadedFunc = null;
                }
                this.removeSelf();
            };
            this.onLoading = (Progress) => {
                this.txtProgress.text = Math.floor(Progress * 100) + "%";
            };
        }
        onShow(Url, LoadedFunc) {
            this._loadedFunc = LoadedFunc;
            this.txtProgress.text = "0%";
            Game.loaderMgr.loadRes(Url, this.onLoaded, this.onLoading);
            Core.LayerMgr.getInstance().addChildToDialog(this);
        }
    }
    Game.LoadingView = LoadingView;
})(Game || (Game = {}));
//# sourceMappingURL=LoadingView.js.map