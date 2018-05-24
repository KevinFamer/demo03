//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(1024,768,Laya.WebGL);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json?"+Math.random(), Laya.Handler.create(this, onCompleteHandler), Laya.ResourceVersion.FILENAME_VERSION);

function onCompleteHandler():void 
{
    // 设置适配模式
    Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
    // 设置居中对齐
    Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
    Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
    // 设置横竖屏
    Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
    // 设置背影颜色
    Laya.stage.bgColor = "#232323";
    // 显示FPS
    Laya.Stat.show(0, 0);

    // 位图字体预加载
    // function onLoadFont(BmpFont:Laya.BitmapFont) {
    //     BmpFont.setSpaceWidth(10);
    //     Laya.Text.registerBitmapFont(Global.Const.BMP_FONT_NAME, BmpFont);

    //     var txt:Laya.Text = new Laya.Text();
    //     txt.width = 250;
    //     txt.wordWrap = true;
    //     txt.text = "Do one thing at a time, and do well.";
    //     txt.font = Global.Const.BMP_FONT_NAME;
    //     txt.leading = 5;
    //     txt.pos(Laya.stage.width - txt.width >> 1, Laya.stage.height - txt.height >> 1);
    //     Laya.stage.addChild(txt);
    // }

    // let bmpFont:Laya.BitmapFont = new Laya.BitmapFont();
	// bmpFont.loadFont(Global.Path.FNT_BMPFONT_PATH, new Laya.Handler(this, onLoadFont, [bmpFont]));

    let resUrl:Array<any> = [];
    resUrl.push({ "url":Global.Path.PLIST_TEXTURE_PATH, "type":Laya.Loader.ATLAS });
    resUrl.push({ "url":Global.Path.MP3_WELCOME_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_BG_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_EAT_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_COFFEE_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_MUSHROOM_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_HIT_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_HURT_PATH, "type":Laya.Loader.SOUND });
    resUrl.push({ "url":Global.Path.MP3_LOSE_PATH, "type":Laya.Loader.SOUND });

    function onLoaded():void {
        // 加载完成, 进入游戏
        Game.main.run();
    }

    // 资源预加载loading界面
    (new Game.LoadingView()).onShow(resUrl, onLoaded);
}