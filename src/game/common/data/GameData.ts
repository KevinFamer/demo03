/********************* ↓ 数据类定义 ↓ *********************/
namespace GData {
    export class User {
        lives:number = 100;//Const.HERO_LIVES;
        score:number = 0;
        distance:number = 0;
        heroSpeed:number = 0;
        coffee:number = 0;
        mushroom:number = 0;
        hitObstacle:number = 0;
    }
}
/********************* ↑ 数据类定义 ↑ *********************/

class GameData {
    public static gameState:number;
    public static readonly user:UserData = new UserData();
}