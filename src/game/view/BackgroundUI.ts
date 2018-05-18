module Game {
    import Sprite = Laya.Sprite;

    export class BackgroundUI extends Sprite 
    {
        speed:number = 5;

        private _winWidth:number;
        private _winHeight:number;
        private _bg1:Sprite;
        private _bg2:Sprite;
        private _bg3:Sprite;
        private _bg4:Sprite;

        constructor() 
        {
            super();

            this._winWidth = Laya.stage.width;
            this._winHeight = Laya.stage.height;

            //sky
            this._bg1 = this.createBackground(Global.Path.JPG_BGMAP_PATH);
            this.addChild(this._bg1);

            //hill
            this._bg2 = this.createBackground("graphics/bgLayer2.png");
            this.addChild(this._bg2);

            //buildings
            this._bg3 = this.createBackground("graphics/bgLayer3.png");
            this.addChild(this._bg3);

            //trees
            this._bg4 = this.createBackground("graphics/bgLayer4.png");
            this.addChild(this._bg4);

            Laya.timer.frameLoop(2, this, this.onUpdate);
        }

        private createBackground(ImgPath:string):Sprite 
        {
            let layer = new Sprite();
            let bg1 = new Sprite();
            bg1.loadImage(ImgPath);
            layer.addChild(bg1);

            let bg2 = new Sprite();
            bg2.loadImage(ImgPath);
            layer.addChild(bg2);

            bg1.pos(0, 0);
            bg2.pos(this._winWidth, 0);
            return layer;
        }

        private onUpdate():void 
        {
            this._bg1.x -= Math.ceil(this.speed * 0.02);
            if (this._bg1.x < -this._winWidth) {
                this._bg1.x = 0;
            }

            this._bg2.x -= Math.ceil(this.speed * 0.2);
            if (this._bg2.x < -this._winWidth) {
                this._bg2.x = 0;
            }

            this._bg3.x -= Math.ceil(this.speed * 0.5);
            if (this._bg3.x < -this._winWidth) {
                this._bg3.x = 0;
            }

            this._bg4.x -= Math.ceil(this.speed * 1);
            if (this._bg4.x < -this._winWidth) {
                this._bg4.x = 0;
            }
        }
    }
}