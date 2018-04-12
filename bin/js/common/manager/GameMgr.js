var GameMgr = /** @class */ (function () {
    function GameMgr() {
    }
    Object.defineProperty(GameMgr, "enemy", {
        get: function () {
            return this.m_enemy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "food", {
        get: function () {
            return this.m_food;
        },
        enumerable: true,
        configurable: true
    });
    GameMgr.initEnemyMgr = function (PGameScene) {
        if (!this.m_enemy) {
            this.m_enemy = new EnemyMgr(PGameScene);
        }
    };
    GameMgr.initFoodMgr = function (PGameScene) {
        if (!this.m_food) {
            this.m_food = new FoodMgr(PGameScene);
        }
    };
    // 声音管理器
    GameMgr.sound = new SoundMgr();
    return GameMgr;
}());
//# sourceMappingURL=GameMgr.js.map