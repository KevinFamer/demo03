var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    class ui_loadingUI extends View {
        constructor() { super(); }
        createChildren() {
            View.regComponent("Text", laya.display.Text);
            super.createChildren();
            this.createView(ui.ui_loadingUI.uiView);
        }
    }
    ui_loadingUI.uiView = { "type": "View", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": -184, "x": -212, "var": "imgBG", "skin": "graphics/bgLayer.jpg" } }, { "type": "Text", "props": { "y": 166, "x": 232, "width": 135, "var": "txtProgress", "valign": "middle", "text": "0%", "overflow": "visible", "height": 67, "fontSize": 20, "font": "Arial", "color": "#ff0400", "bold": true, "align": "center" } }] };
    ui.ui_loadingUI = ui_loadingUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map