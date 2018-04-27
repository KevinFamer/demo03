"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BitmapFont = Laya.BitmapFont;
var Handler = Laya.Handler;
//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(1024, 768);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json?" + Math.random(), Handler.create(this, onCompleteHandler), Laya.ResourceVersion.FILENAME_VERSION);
function onCompleteHandler1() {
    function onLoadFont(PBmpFont) {
        PBmpFont.setSpaceWidth(10);
        Laya.Text.registerBitmapFont(Global.Const.BMP_FONT_NAME, PBmpFont);
        var txt = new Laya.Text();
        txt.width = 250;
        txt.wordWrap = true;
        txt.text = "Do one thing at a time, and do well.";
        txt.font = Global.Const.BMP_FONT_NAME;
        txt.leading = 5;
        txt.pos(Laya.stage.width - txt.width >> 1, Laya.stage.height - txt.height >> 1);
        Laya.stage.addChild(txt);
    }
    // 加载完成
    function onLoaded(PTexture) {
        console.log("加载完成" + PTexture.source);
        Laya.loader.off(Laya.Event.ERROR, this, onLoadError, true);
        Laya.loader.maxLoader = 5;
        Game.main.run();
        // 资源预加载开始
        var bmpFont = new BitmapFont();
        bmpFont.loadFont(Global.Path.FNT_BMPFONT_PATH, new Handler(this, onLoadFont, [bmpFont]));
    }
    // 加载中回调
    function onLoading(Progress) {
        console.log("加载进度:" + Progress);
    }
    // 加载出错
    function onLoadError(PStr) {
        console.log("加载失败:" + PStr);
    }
    // 资源预加载开始
    // let bmpFont:BitmapFont = new BitmapFont();
    // bmpFont.loadFont(Global.Path.FNT_BMPFONT_PATH, new Handler(this, onLoadFont, [bmpFont]));
    var loadPath = [];
    loadPath.push({ url: Global.Path.PLIST_TEXTURE_PATH, type: Laya.Loader.ATLAS });
    // 关闭并发加载，改成单一序列加载
    Laya.loader.maxLoader = 1;
    // 无加载失败重试
    Laya.loader.retryNum = 0;
    Laya.loader.load(loadPath, Handler.create(this, onLoaded), Handler.create(this, onLoading, null, false));
    Laya.loader.once(Laya.Event.ERROR, this, onLoadError);
}
var ViewMgr_1 = require("./game/manager/ViewMgr");
function onCompleteHandler() {
    var loadPath = [];
    loadPath.push({ "url": Global.Path.PLIST_TEXTURE_PATH, "type": Laya.Loader.ATLAS });
    loadPath.push({ "url": Global.Path.MP3_WELCOME_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_BG_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_EAT_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_COFFEE_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_MUSHROOM_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_HIT_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_HURT_PATH, "type": Laya.Loader.SOUND });
    loadPath.push({ "url": Global.Path.MP3_LOSE_PATH, "type": Laya.Loader.SOUND });
    function onLoaded(PTexture) {
        //console.log("加载完成" + PTexture.source);
    }
    function onLoading(Progress) {
        console.log("加载完成" + Progress);
    }
    // let view = new LoadingView()
    // view.onInit();
    // view.onShow({Url:loadPath, LoadedFunc:onLoaded, LoadingFunc:onLoading});
    // Laya.stage.addChild(view);
    ViewMgr_1.default.getInstance().showView(Global.ViewId.LOADING_VIEW, { Url: loadPath, LoadedFunc: onLoaded, LoadingFunc: onLoading });
}
//# sourceMappingURL=GameEnter.js.map