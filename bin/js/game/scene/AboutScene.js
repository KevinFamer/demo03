var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var Label = Laya.Label;
    var Button = Laya.Button;
    class AboutScene extends Sprite {
        constructor() {
            super();
            var layer = new Sprite();
            this.addChild(layer);
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            var bgWelcome = new Sprite();
            bgWelcome.loadImage(Global.Path.JPG_WELCOME_PATH);
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
            backButton.on(Laya.Event.CLICK, this, this.f_back);
        }
        f_back() {
            Game.SoundMgr.getInstance().playCoffee();
            Game.SceneMgr.getInstance().enterScene(Global.SceneId.LOGIN);
        }
    }
    Game.AboutScene = AboutScene;
})(Game || (Game = {}));
//# sourceMappingURL=AboutScene.js.map