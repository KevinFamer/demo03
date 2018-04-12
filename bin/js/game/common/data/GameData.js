/********************* ↓ 数据类定义 ↓ *********************/
var GData;
(function (GData) {
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
    GData.User = User;
})(GData || (GData = {}));
/********************* ↑ 数据类定义 ↑ *********************/
var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.user = new UserData();
    return GameData;
}());
//# sourceMappingURL=GameData.js.map