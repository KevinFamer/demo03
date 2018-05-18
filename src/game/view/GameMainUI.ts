module Game {
    import Sprite = Laya.Sprite;
    import Button = Laya.Button;
    import LayaText = Laya.Text;

    export class GameMainUI extends Sprite 
    {
        private _lifeTxt;
        private _distanceTxt;
        private _scoreTxt;

        constructor() 
        {
            super();

            this._lifeTxt = this.createText("生命：0", 300, 30);
            this.addChild(this._lifeTxt);

            this._distanceTxt = this.createText("距离：50", 600, 30);
            this.addChild(this._distanceTxt);

            this._scoreTxt = this.createText("积分：100", 900, 30);
            this.addChild(this._scoreTxt);

            let pauseButton = new Button(Global.Path.SML_IMG_PATH + "pauseButton.png");
            pauseButton.on(Laya.Event.CLICK, this, this.pauseResume);
            pauseButton.x = 80;
            pauseButton.y = 45;
            this.addChild(pauseButton);

            let soundButton = new Button(Global.Path.SML_IMG_PATH + "soundOn0002.png");
            soundButton.on(Laya.Event.CLICK, this, this.toggleOnOff);
            soundButton.x = 80;
            soundButton.y = 100;
            this.addChild(soundButton);
        }

        private pauseResume():void 
        {
            // if(cc.director.isPaused())
            //     cc.director.resume();
            // else
            //     cc.director.pause();
        }

        private toggleOnOff():void 
        {
            SoundMgr.getInstance().toggleOnOff();
        }

        private createText(Str, PosX, PosY):LayaText 
        {
            var txt = new LayaText();
            txt.font = Global.Const.BMP_FONT_NAME;
            txt.fontSize = 20;
            txt.bold = true;
            txt.color = "#ff0000";
            txt.text = Str
            txt.x = PosX;
            txt.y = PosY;
            return txt;
        }

        update():void 
        {
            this._lifeTxt.text = "生命：" + Data.user.lives;
            this._distanceTxt.text = "距离：" + Data.user.distance;
            this._scoreTxt.text = "积分：" + Data.user.score;
        }
    }
}
