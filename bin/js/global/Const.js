var Global;
(function (Global) {
    var Const = /** @class */ (function () {
        function Const() {
        }
        // 位图字体标识
        Const.BMP_FONT_NAME = "GameFont";
        // 玩家状态
        Const.GAME_STATE_IDLE = 0;
        Const.GAME_STATE_FLYING = 1;
        Const.GAME_STATE_OVER = 2;
        // 英雄状态
        Const.HERO_STATE_IDLE = 0;
        Const.HERO_STATE_FLYING = 1;
        Const.HERO_STATE_HIT = 2;
        Const.HERO_STATE_FALL = 3;
        // 食物普通道具类型
        Const.ITEM_TYPE_1 = 1;
        Const.ITEM_TYPE_2 = 2;
        Const.ITEM_TYPE_3 = 3;
        Const.ITEM_TYPE_4 = 4;
        Const.ITEM_TYPE_5 = 5;
        // 特殊道具：咖啡
        Const.ITEM_TYPE_COFFEE = 6;
        // 特殊道具：蘑菇
        Const.ITEM_TYPE_MUSHROOM = 7;
        // 敌人类型 ------------------------------------------
        Const.ENEMY_TYPE_1 = 1; //飞机
        Const.ENEMY_TYPE_2 = 2; //太空船
        Const.ENEMY_TYPE_3 = 3; //太空艇
        Const.ENEMY_TYPE_4 = 4; //直升机
        // 粒子效果类型 ------------------------------------------
        Const.PARTICLE_TYPE_1 = 1; // 发光
        Const.PARTICLE_TYPE_2 = 2; // 风力
        // 英雄属性 -----------------------------------------
        Const.HERO_LIVES = 5; // 生命
        Const.HERO_MIN_SPEED = 650; // 最小速度
        Const.HERO_MAX_SPEED = 1400; // 最大速度，吃了食物咖啡
        Const.GRAVITY = 10; // 重力，影响速度
        // 敌人属性 -------------------------------------
        Const.ENEMY_GAP = 1200; //出现频率
        Const.ENEMY_SPEED = 300; //速度
        // 游戏实际的范围距离上下界面框的距离
        Const.GAME_AREA_TOP_BOTTOM = 100;
        return Const;
    }());
    Global.Const = Const;
})(Global || (Global = {}));
//# sourceMappingURL=Const.js.map