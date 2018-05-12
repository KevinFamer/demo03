var Game;
(function (Game) {
    class GameMgr {
        static get enemy() {
            return this.m_enemy;
        }
        static get food() {
            return this.m_food;
        }
        static initEnemyMgr(PGameScene) {
            if (!this.m_enemy) {
                this.m_enemy = new Game.EnemyMgr(PGameScene);
            }
        }
        static initFoodMgr(PGameScene) {
            if (!this.m_food) {
                this.m_food = new Game.FoodMgr(PGameScene);
            }
        }
    }
    // 声音管理器
    GameMgr.sound = new Game.SoundMgr();
    Game.GameMgr = GameMgr;
})(Game || (Game = {}));
//# sourceMappingURL=GameMgr.js.map