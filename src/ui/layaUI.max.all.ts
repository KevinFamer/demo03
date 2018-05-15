
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import BaseView=laya.ui.BaseView;

module ui {
    export class ui_loadingUI extends View {
		public imgBG:Laya.Image;
		public txtProgress:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":600,"pivotY":0,"pivotX":0,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"imgBG","skin":"graphics/bgLayer.jpg"}},{"type":"Text","props":{"y":384,"x":512,"width":135,"var":"txtProgress","valign":"middle","text":"0%","pivotY":33,"pivotX":68,"overflow":"visible","height":67,"fontSize":20,"font":"Arial","color":"#ff0400","bold":true,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.ui_loadingUI.uiView);

        }

    }
}
