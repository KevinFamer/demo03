var GameData;
(function (GameData_1) {
    /********************* ↓ 数据类定义 ↓ *********************/
    var User = /** @class */ (function () {
        function User() {
            this.lives = 100; //Const.HERO_LIVES;
            this.score = 0;
            this.distance = 0;
            this.heroSpeed = 0;
            this.coffee = 0;
            this.mushroom = 0;
            this.hitObstacle = 0;
        }
        return User;
    }());
    /********************* ↑ 数据类定义 ↑ *********************/
    GameData_1.user = new User();
    var GameData = /** @class */ (function () {
        function GameData() {
        }
        return GameData;
    }());
    GameData_1.GameData = GameData;
})(GameData || (GameData = {}));
//# sourceMappingURL=GameData.js.map