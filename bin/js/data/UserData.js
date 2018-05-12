var Data;
(function (Data) {
    class UserData {
        constructor() {
            this.lives = Global.Const.HERO_LIVES;
            this.score = 0;
            this.distance = 0;
            this.heroSpeed = 0;
            this.coffee = 0;
            this.mushroom = 0;
            this.hitObstacle = 0;
        }
    }
    Data.UserData = UserData;
})(Data || (Data = {}));
//# sourceMappingURL=UserData.js.map