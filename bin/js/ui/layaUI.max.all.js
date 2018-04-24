var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var BaseView = laya.ui.BaseView;
var ui;
(function (ui) {
    var ui_loadingUI = /** @class */ (function (_super) {
        __extends(ui_loadingUI, _super);
        function ui_loadingUI() {
            return _super.call(this) || this;
        }
        ui_loadingUI.prototype.createChildren = function () {
            View.regComponent("Text", laya.display.Text);
            _super.prototype.createChildren.call(this);
            this.createView(ui.ui_loadingUI.uiView);
        };
        ui_loadingUI.uiView = { "type": "BaseView", "props": { "width": 600, "height": 400 }, "child": [{ "type": "Image", "props": { "y": -184, "x": -212, "var": "imgBG", "skin": "graphics/bgLayer.jpg" } }, { "type": "Text", "props": { "y": 166, "x": 232, "width": 135, "var": "txtProgress", "valign": "middle", "text": "0%", "overflow": "visible", "height": 67, "fontSize": 20, "font": "Arial", "color": "#ff0400", "bold": true, "align": "center" } }] };
        return ui_loadingUI;
    }(BaseView));
    ui.ui_loadingUI = ui_loadingUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map