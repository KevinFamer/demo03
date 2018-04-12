module GameData {
    /********************* ↓ 数据类定义 ↓ *********************/
    class User {
        lives:number = 100;//Const.HERO_LIVES;
        score:number = 0;
        distance:number = 0;
        heroSpeed:number = 0;
        coffee:number = 0;
        mushroom:number = 0;
        hitObstacle:number = 0;
    }
    /********************* ↑ 数据类定义 ↑ *********************/

    export let user:User = new User();

    export class GameData {
        public static gameState:number;
        // public static readonly user:GData.User = new GData.User();
    }
}