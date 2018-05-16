module Game {
    import userData = Data.user;
    import Sprite = Laya.Sprite;
    import Browser = Laya.Browser;
    import Button = Laya.Button;
    import LayaText = Laya.Text;

    export class GameSceneUI extends Sprite {

        private m_lifeText;
        private m_distanceText;
        private m_scoreText;

        constructor() {
            super();

            var winWidth = Browser.width;
            var winHeight = Browser.height;

            var lifeLabel = this.f_createText("L I V E S", 360, winHeight - 25);
            this.addChild(lifeLabel);

            this.m_lifeText = this.f_createText("0", 360, winHeight - 60);
            this.addChild(this.m_lifeText);

            var distanceLabel = this.f_createText("D I S T A N C E", 680, winHeight - 25);
            this.addChild(distanceLabel);

            this.m_distanceText = this.f_createText("50", 680, winHeight - 60);
            this.addChild(this.m_distanceText);

            var scoreLabel = this.f_createText("S C O R E", 915, winHeight - 25);
            this.addChild(scoreLabel);

            this.m_scoreText = this.f_createText("100", 915, winHeight - 60);
            this.addChild(this.m_scoreText);

            var pauseButton = new Button("pauseButton.png");
            pauseButton.on(Laya.Event.CLICK, this, this.f_pauseResume);
            pauseButton.x = 80;
            pauseButton.y = winHeight - 45;
            this.addChild(pauseButton);

            var soundButton = new Button("soundOn0002.png");
            soundButton.on(Laya.Event.CLICK, this, this.f_toggleOnOff);
            soundButton.x = 80;
            soundButton.y = winHeight - 100;
            this.addChild(soundButton);
        }

        f_pauseResume():void {
            // if(cc.director.isPaused())
            //     cc.director.resume();
            // else
            //     cc.director.pause();
        }

        f_toggleOnOff():void {
            SoundMgr.getInstance().toggleOnOff();
        }

        f_createText(PStr, PX, PY):LayaText {
            var txt = new LayaText();
            txt.font = Global.Const.BMP_FONT_NAME;
            txt.fontSize = 20;
            txt.color = "#ff00ff";
            txt.text = PStr
            txt.x = PX;
            txt.y = PY;
            return txt;
        }

        update():void {
            this.m_lifeText.setString(userData.lives.toString());
            this.m_distanceText.setString(userData.distance.toString());
            this.m_scoreText.setString(userData.score.toString());
        }
    }
}
