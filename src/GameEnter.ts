import BitmapFont = Laya.BitmapFont;
import Handler = Laya.Handler;
import Texture = Laya.Texture;

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(1024,768);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json?"+Math.random(), Handler.create(this, onCompleteHandler), Laya.ResourceVersion.FILENAME_VERSION);

function onCompleteHandler1():void 
{
    function onLoadFont(PBmpFont:BitmapFont) {
        PBmpFont.setSpaceWidth(10);
        Laya.Text.registerBitmapFont(Global.Const.BMP_FONT_NAME, PBmpFont);

        var txt:Laya.Text = new Laya.Text();
        txt.width = 250;
        txt.wordWrap = true;
        txt.text = "Do one thing at a time, and do well.";
        txt.font = Global.Const.BMP_FONT_NAME;
        txt.leading = 5;
        txt.pos(Laya.stage.width - txt.width >> 1, Laya.stage.height - txt.height >> 1);
        Laya.stage.addChild(txt);
    }

    // 加载完成
    function onLoaded(PTexture:Texture):void {
        console.log("加载完成" + PTexture.source);
        Laya.loader.off(Laya.Event.ERROR, this, onLoadError, true);
        Laya.loader.maxLoader = 5;
        Game.main.run();

        // 资源预加载开始
    let bmpFont:BitmapFont = new BitmapFont();
	bmpFont.loadFont(Global.Path.FNT_BMPFONT_PATH, new Handler(this, onLoadFont, [bmpFont]));
    }
    // 加载中回调
    function onLoading(Progress:number):void {
        console.log("加载进度:" + Progress);
    }
    // 加载出错
    function onLoadError(PStr:String):void {
        console.log("加载失败:" + PStr);
    }

    // 资源预加载开始
    // let bmpFont:BitmapFont = new BitmapFont();
	// bmpFont.loadFont(Global.Path.FNT_BMPFONT_PATH, new Handler(this, onLoadFont, [bmpFont]));

    let loadPath:Array<any> = [];
    loadPath.push({ url:Global.Path.PLIST_TEXTURE_PATH, type:Laya.Loader.ATLAS });

    // 关闭并发加载，改成单一序列加载
    Laya.loader.maxLoader = 1;
    // 无加载失败重试
    Laya.loader.retryNum = 0;
    Laya.loader.load(loadPath, Handler.create(this, onLoaded), Handler.create(this, onLoading, null, false));
    Laya.loader.once(Laya.Event.ERROR, this, onLoadError);
}

function onCompleteHandler():void 
{
    let loadPath:Array<any> = [];
    loadPath.push({ url:Global.Path.PLIST_TEXTURE_PATH, type:Laya.Loader.ATLAS });

    function onLoaded(PTexture:Texture):void {
        console.log("加载完成" + PTexture.source);
    }

    function onLoading(PTexture:Texture):void {
        console.log("加载完成" + PTexture.source);
    }

    Game.viewMgr.showView(Global.ViewId.LOADING_VIEW, {Url:loadPath, LoadedFunc:onLoaded, LoadingFunc:onLoading});
}