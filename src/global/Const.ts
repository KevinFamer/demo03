module Global {
    export class Const {
        // 位图字体标识
        public static BMP_FONT_NAME:string = "GameFont";

        // 玩家状态
        public static GAME_STATE_IDLE:number = 0;
        public static GAME_STATE_FLYING:number = 1;
        public static GAME_STATE_OVER:number = 2;

        // 英雄状态
        public static HERO_STATE_IDLE:number = 0;
        public static HERO_STATE_FLYING:number = 1;
        public static HERO_STATE_HIT:number = 2;
        public static HERO_STATE_FALL:number = 3;

        // 食物普通道具类型
        public static ITEM_TYPE_1:number = 1;
        public static ITEM_TYPE_2:number = 2;
        public static ITEM_TYPE_3:number = 3;
        public static ITEM_TYPE_4:number = 4;
        public static ITEM_TYPE_5:number = 5;
        // 特殊道具：咖啡
        public static ITEM_TYPE_COFFEE:number = 6;
        // 特殊道具：蘑菇
        public static ITEM_TYPE_MUSHROOM:number = 7;
        
        // 敌人类型 ------------------------------------------
        public static ENEMY_TYPE_1:number = 1;   //飞机
        public static ENEMY_TYPE_2:number = 2;   //太空船
        public static ENEMY_TYPE_3:number = 3;   //太空艇
        public static ENEMY_TYPE_4:number = 4;   //直升机
        
        // 粒子效果类型 ------------------------------------------
        public static PARTICLE_TYPE_1:number = 1;   // 发光
        public static PARTICLE_TYPE_2:number = 2;   // 风力
        
        // 英雄属性 -----------------------------------------
        public static HERO_LIVES:number = 5;    // 生命
        public static HERO_MIN_SPEED:number = 650;  // 最小速度
        public static HERO_MAX_SPEED:number = 1400; // 最大速度，吃了食物咖啡
        public static GRAVITY:number = 10;  // 重力，影响速度
        
        // 敌人属性 -------------------------------------
        public static ENEMY_GAP:number = 1200;      //出现频率
        public static ENEMY_SPEED:number = 300;     //速度

        // 游戏实际的范围距离上下界面框的距离
        public static GAME_AREA_TOP_BOTTOM:number = 100;
    }
}