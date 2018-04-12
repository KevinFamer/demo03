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
var AboutScene = /** @class */ (function (_super) {
    __extends(AboutScene, _super);
    function AboutScene() {
        var _this = _super.call(this) || this;
        var layer = new Sprite();
        _this.addChild(layer);
        var winWidth = Browser.width;
        var winHeight = Browser.height;
        var bgWelcome = new Sprite();
        bgWelcome.loadImage("res/graphics/bgWelcome.jpg");
        bgWelcome.x = winWidth / 2;
        bgWelcome.y = winHeight / 2;
        layer.addChild(bgWelcome);
        var aboutText = "Hungry Hero is a free and open source game built on Adobe Flash using Starling Framework.\n\nhttp://www.hungryherogame.com\n\n" +
            " And this is a cocos2d-js version modified by Kenko.\n\n" +
            " The concept is very simple. The hero is pretty much always hungry and you need to feed him with food.\n\n" +
            " You score when your Hero eats food.There are different obstacles that fly in with a \"Look out!\"\n\n" +
            " caution before they appear. Avoid them at all costs. You only have 5 lives. Try to score as much as possible and also\n\n" +
            " try to travel the longest distance.";
        var helloLabel = new Label();
        helloLabel.font = "Microsoft YaHei";
        helloLabel.text = aboutText;
        helloLabel.fontSize = 14;
        //        helloLabel.color = cc.color(0,0,0);
        //        helloLabel._setStrokeStyle(cc.color(0,0,255));
        helloLabel.x = winWidth / 2;
        helloLabel.y = winHeight / 2 + 80;
        //        helloLabel.textAlign = cc.TEXT_ALIGNMENT_CENTER;
        layer.addChild(helloLabel);
        var backButton = new Button("about_backButton.png");
        backButton.x = 150;
        backButton.y = -70;
        layer.addChild(backButton);
        backButton.on(Laya.Event.CLICK, _this, _this.f_back);
        return _this;
    }
    AboutScene.prototype.f_back = function () {
        GameMgr.sound.playCoffee();
        Game.Main.enterLoginScene();
    };
    return AboutScene;
}(Sprite));
//# sourceMappingURL=AboutScene.js.map