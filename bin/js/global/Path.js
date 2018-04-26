var Global;
(function (Global) {
    var Path = /** @class */ (function () {
        function Path() {
        }
        // 位图字体资源路径
        Path.FNT_BMPFONT_PATH = "fonts/arial16.fnt";
        Path.JPG_BGMAP_PATH = "graphics/bgLayer.jpg";
        Path.JPG_WELCOME_PATH = "graphics/bgWelcome.jpg";
        /**
         * 音频路径
         */
        Path.MP3_WELCOME_PATH = "sounds/bgWelcome.mp3";
        Path.MP3_BG_PATH = "sounds/bgGame.mp3";
        Path.MP3_EAT_PATH = "sounds/eat.mp3";
        Path.MP3_COFFEE_PATH = "sounds/coffee.mp3";
        Path.MP3_MUSHROOM_PATH = "sounds/mushroom.mp3";
        Path.MP3_HIT_PATH = "sounds/hit.mp3";
        Path.MP3_HURT_PATH = "sounds/hurt.mp3";
        Path.MP3_LOSE_PATH = "sounds/lose.mp3";
        /**
         * 粒子特效路径
         */
        Path.PLIST_WIND_PATH = "particles/wind.plist";
        Path.PLIST_COFFEE_PATH = "particles/coffee.plist";
        Path.PLIST_MUSHROOM_PATH = "particles/mushroom.plist";
        Path.PLIST_EAT_PATH = "particles/eat.plist";
        // 游戏图集
        Path.PNG_TEXTURE_PATH = "res/atlas/graphics/small_images.png";
        Path.PLIST_TEXTURE_PATH = "res/atlas/graphics/small_images.atlas";
        // 游戏资源图路径
        Path.SML_IMG_PATH = "small_images/";
        return Path;
    }());
    Global.Path = Path;
})(Global || (Global = {}));
//# sourceMappingURL=Path.js.map