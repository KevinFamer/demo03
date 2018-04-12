//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(1024, 768);
//激活资源版本控制
Laya.ResourceVersion.enable("version.json?" + Math.random(), Handler.create(null, onCompleteHandler), Laya.ResourceVersion.FILENAME_VERSION);
function onCompleteHandler() {
    var bmpFont;
    function onLoadFont() {
        bmpFont.setSpaceWidth(10);
        LayaText.registerBitmapFont(Global.Const.BMP_FONT_NAME, bmpFont);
    }
    // 加载完成
    function onLoaded(PTexture) {
        console.log("加载完成");
        Laya.loader.off(Laya.Event.ERROR, null, onLoadError, true);
        Laya.loader.maxLoader = 5;
        Game.Main.run();
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
    bmpFont = new BitmapFont();
    bmpFont.loadFont(Global.Const.BMP_FONT_PATH, new Handler(null, onLoadFont));
    var loadPath = [];
    loadPath.push({ url: "res/graphics/texture.plist", type: Loader.ATLAS });
    // 关闭并发加载，改成单一序列加载
    // loader.maxLoader = 1;
    // 无加载失败重试
    // loader.retryNum = 0;
    Laya.loader.load(loadPath, Handler.create(null, onLoaded), Handler.create(null, onLoading));
    Laya.loader.once(Laya.Event.ERROR, null, onLoadError);
}
//# sourceMappingURL=GameEnter.js.map