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
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        _this.m_speed = 5;
        //sky
        _this.m_bg1 = _this.f_createBackground("res/graphics/bgLayer.jpg");
        _this.addChild(_this.m_bg1);
        //hill
        _this.m_bg2 = _this.f_createBackground("bgLayer2.png");
        _this.addChild(_this.m_bg2);
        //buildings
        _this.m_bg3 = _this.f_createBackground("bgLayer3.png");
        _this.addChild(_this.m_bg3);
        //trees
        _this.m_bg4 = _this.f_createBackground("bgLayer4.png");
        _this.addChild(_this.m_bg4);
        Timer.frameLoop(2, _this, _this.f_update);
        return _this;
    }
    Background.prototype.f_createBackground = function (PImgPath) {
        var layer = new Sprite();
        var bg1 = new Sprite();
        bg1.loadImage(PImgPath);
        bg1.x = bg1.width * 0.5;
        bg1.y = bg1.height * 0.5;
        layer.addChild(bg1);
        var bg2 = new Sprite();
        bg2.x = bg2.width / 2 + bg2.width;
        bg2.y = bg2.height / 2;
        layer.addChild(bg2);
        return layer;
    };
    Background.prototype.f_update = function () {
        var winWidth = Browser.width;
        var winHeight = Browser.height;
        this.m_bg1.x -= Math.ceil(this.m_speed * 0.02);
        if (this.m_bg1.x < -winWidth) {
            this.m_bg1.x = 0;
        }
        this.m_bg2.x -= Math.ceil(this.m_speed * 0.2);
        if (this.m_bg2.x < -winWidth) {
            this.m_bg2.x = 0;
        }
        this.m_bg3.x -= Math.ceil(this.m_speed * 0.5);
        if (this.m_bg3.x < -winWidth) {
            this.m_bg3.x = 0;
        }
        this.m_bg4.x -= Math.ceil(this.m_speed * 1);
        if (this.m_bg4.x < -winWidth) {
            this.m_bg4.x = 0;
        }
    };
    return Background;
}(Sprite));
//# sourceMappingURL=Background.js.map