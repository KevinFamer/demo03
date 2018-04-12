// Laya.Pool.getItemByClass("Enemy", Enemy);
class Enemy extends Sprite {
    private m_type:number = 0;

    private m_speed:number = 0;

    private m_distance:number = 0;

    private m_showLookout:boolean = true;

    private m_alreadyHit:boolean = false;

    private m_position:string = null;

    private m_lookoutAnimation:Sprite = null;

    private m_lookoutAction:Animation = null;

    private m_animation:Animation = null;

    constructor() {
        super();
    }

    hideLookout():void {
        if (this.m_lookoutAnimation) {
            this.m_lookoutAnimation.visible = false;
        }
    }

    reuse(PType, PShowLookOut, PPos, PSpeed, PDis):void {
        if (PType == Global.Const.ENEMY_TYPE_4) {
            this.f_showImage("obstacle4_0001.png")

            if (!this.m_animation) {
                var ani:Animation = new Animation()
                ani.loadImages(["obstacle4_0001.png", "obstacle4_0002.png"]);
                ani.interval = 100;
                this.m_animation = ani;
                this.addChild(ani);
            }
            
            this.m_animation.play();
        } else {
            this.f_showImage("obstacle" + PType + ".png");
        }

        this.m_showLookout = PShowLookOut;
        this.m_position = PPos;
        this.m_speed = PSpeed;
        this.m_distance = PDis;
        this.m_alreadyHit = false;
        this.m_type = PType;

        if (PShowLookOut) {
            if (!this.m_lookoutAnimation) {
                this.m_lookoutAnimation = new Sprite();
                this.m_lookoutAnimation.loadImage("#watchOut_0001.png");
                this.addChild(this.m_lookoutAnimation);
            } else {
                this.m_lookoutAnimation.visible = true;
            }
            if (!this.m_lookoutAction) {
                var path = ["watchOut_0001.png","watchOut_0002.png","watchOut_0003.png","watchOut_0004.png","watchOut_0005.png"];
                var ani1 = new Animation();
                ani1.loadImages(path);
                ani1.interval = 100;
                this.m_lookoutAnimation.addChild(ani1);
                this.m_lookoutAction = ani1;
            }

            this.m_lookoutAction.play();
            this.m_lookoutAnimation.x = -this.m_lookoutAnimation.width;
            this.m_lookoutAnimation.y = this.m_lookoutAnimation.height * 0.5;
        }
    }

    unuse():void {
        this.m_animation.stop();
        this.m_lookoutAction.stop();
        this.hideLookout();
        Laya.Pool.recover("Enemy", this);
        this.removeSelf();
    }

    crash():void {
        this.m_animation.stop();
        this.m_lookoutAction.stop();
        this.f_showImage("obstacle" + this.m_type + "_crash.png");
    }

    f_showImage(PPath:string):void {
        var imgUrl:string = PPath;
        var texture:Texture = Loader.getRes(imgUrl);
        this.graphics.clear();
        this.graphics.drawTexture(texture);
    }
}