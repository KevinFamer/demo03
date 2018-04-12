class GameMgr {
    // 声音管理器
    public static readonly sound:SoundMgr = new SoundMgr();

    // 敌人管理器
    private static m_enemy:EnemyMgr;
    public static get enemy():EnemyMgr {
        return this.m_enemy;
    }

    // 食物管理器
    private static m_food:FoodMgr;
    public static get food():FoodMgr {
        return this.m_food;
    }
    
    public static initEnemyMgr(PGameScene):void {
        if (!this.m_enemy) {
            this.m_enemy = new EnemyMgr(PGameScene);
        }
    }

    public static initFoodMgr(PGameScene):void {
        if (!this.m_food) {
            this.m_food = new FoodMgr(PGameScene);
        }
    }
}