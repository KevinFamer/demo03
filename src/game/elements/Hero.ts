module Game {
    import Animation = Laya.Animation;
    import Sprite = Laya.Sprite;

    export class Hero extends Sprite 
    {
        state:number = 0;

        private m_animation:Animation = null;

        private m_fast:boolean = false;

        constructor() 
        {
            super();
            this.loadImage(Global.Path.SML_IMG_PATH + "fly_0001.png");

            this.m_animation = new Animation();
            var imgPaths:Array<string> = [];
            for (var i = 1; i < 20; i++) {
                imgPaths.push(Global.Path.SML_IMG_PATH + "fly_00" + (i<10?('0'+i):i) + ".png");
            }

            this.m_animation.loadImages(imgPaths);
            this.m_animation.interval = 50;
            this.m_animation.play();
            this.m_fast = false;
        }

        toggleSpeed(PFast):void 
        {
            if (PFast == this.m_fast) {
                return;
            }

            this.m_fast = PFast;
            this.m_animation.stop();

            if (!PFast) {
                this.m_animation.interval = 50;
            } else {
                this.m_animation.interval = 50/3;
            }
            this.m_animation.play();
        }

        onExit():void 
        {
            this.m_animation.destroy();
        }
    }
}