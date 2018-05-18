module Game {
    import Browser = Laya.Browser;
    import Sprite = Laya.Sprite;
    
    export class EnemyMgr extends Core.Singleton
    {
        /** 获取单例实例 */
        public static getInstance():EnemyMgr
        {
            return Core.Singleton.getInstanceOrCreate(EnemyMgr);
        }

        private m_container:Sprite;
        private m_gameScene:MainScene;
        private m_obstaclesToAnimate:Array<Enemy>;

        /** Obstacle count - to track the frequency of obstacles. */
        private m_obstacleGapCount;

        protected onCreate():void
        {
            this.m_gameScene = SceneMgr.getInstance().getCurScene() as MainScene;
            this.m_container = this.m_gameScene.itemBatchLayer;
            this.m_obstaclesToAnimate = new Array();
        }

        protected onDestroy():void
        {

        }

        init():void 
        {
            this.removeAll();
            Data.user.hitObstacle = 0;
        }

        removeAll():void 
        {
            if (this.m_obstaclesToAnimate.length > 0) {
                for (var i = this.m_obstaclesToAnimate.length - 1; i >= 0; i--) {
                    var item = this.m_obstaclesToAnimate[i];
                    this.m_obstaclesToAnimate.splice(i, 1);
                    item.unuse();
                }
            }
        }

        update(PHero, PElapsed):void 
        {
            // Create an obstacle after hero travels some distance (obstacleGap).
            if (this.m_obstacleGapCount < Global.Const.ENEMY_GAP) {
                this.m_obstacleGapCount += Data.user.heroSpeed * PElapsed;
            }
            else if (this.m_obstacleGapCount != 0) {
                this.m_obstacleGapCount = 0;

                // Create any one of the obstacles.
                this.createObstacle(Math.ceil(Math.random() * 4), Math.random() * 1000 + 1000);
            }
            this.animateObstacles(PHero, PElapsed);
        }

        private createObstacle(PType, PDistance):void 
        {
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            var x = winWidth;
            var y = 0;
            var position = null;
            // For only one of the obstacles, make it appear in either the top or bottom of the screen.
            if (PType <= Global.Const.ENEMY_TYPE_3) {
                if (Math.random() > 0.5) {
                    y = winHeight - Global.Const.GAME_AREA_TOP_BOTTOM;
                    position = "top";
                }
                else {
                    y = Global.Const.GAME_AREA_TOP_BOTTOM;
                    position = "bottom";
                }
            }
            else {
                y = Math.floor(Math.random() * (winHeight - 2 * Global.Const.GAME_AREA_TOP_BOTTOM)) + Global.Const.GAME_AREA_TOP_BOTTOM;
                position = "middle";
            }

            var obstacle:Enemy = Laya.Pool.getItemByClass("Enemy", Enemy);
            obstacle.reuse(PType, true, position, Global.Const.ENEMY_SPEED, PDistance)
            obstacle.x = x + obstacle.width/2;
            obstacle.y = y;
            this.m_obstaclesToAnimate.push(obstacle);
            this.m_container.addChild(obstacle);
        }

        private animateObstacles(PHero, PElapsed):void 
        {
            var obstacle;
            for (var i = this.m_obstaclesToAnimate.length - 1; i >= 0; i--) {
                obstacle = this.m_obstaclesToAnimate[i];

                // If the distance is still more than 0, keep reducing its value, without moving the obstacle.
                if (obstacle.distance > 0) {
                    obstacle.distance -= Data.user.heroSpeed * PElapsed;
                }
                else {
                    // Otherwise, move the obstacle based on hero's speed, and check if he hits it. 

                    // Remove the look out sign.
                    obstacle.hideLookout();

                    // Move the obstacle based on hero's speed.
                    obstacle.x -= (Data.user.heroSpeed + obstacle.speed) * PElapsed;
                }

                // If the obstacle passes beyond the screen, remove it.
                if (obstacle.x < -obstacle.width || Data.gameState == Global.Const.GAME_STATE_OVER) {
                    this.m_obstaclesToAnimate.splice(i, 1);
                    obstacle.unuse();
                    continue;
                }

                // Collision detection - Check if hero collides with any obstacle.
                var heroObstacle_xDist = obstacle.x - PHero.x;
                var heroObstacle_yDist = obstacle.y - PHero.y;
                var heroObstacle_sqDist = heroObstacle_xDist * heroObstacle_xDist + heroObstacle_yDist * heroObstacle_yDist;

                if (heroObstacle_sqDist < 5000 && !obstacle.alreadyHit) {
                    obstacle.alreadyHit = true;
                    obstacle.crash();
                    SoundMgr.getInstance().playHit();

                    if (Data.user.coffee > 0) {
                        // If hero has a coffee item, break through the obstacle.
                        if (obstacle.position == "bottom") obstacle.setRotation(100);
                        else obstacle.setRotation(-100);

                        // Set hit obstacle value.
                        Data.user.hitObstacle = 30;

                        // Reduce hero's speed
                        Data.user.heroSpeed *= 0.8;
                    }
                    else {
                        if (obstacle.position == "bottom") obstacle.setRotation(70);
                        else obstacle.setRotation(-70);

                        // Otherwise, if hero doesn't have a coffee item, set hit obstacle value.
                        Data.user.hitObstacle = 30;

                        // Reduce hero's speed.
                        Data.user.heroSpeed *= 0.5;

                        // Play hurt sound.
                        SoundMgr.getInstance().playHurt();

                        // Update lives.
                        Data.user.lives--;

                        if (Data.user.lives <= 0) {
                            Data.user.lives = 0;
                            this.m_gameScene.endGame();
                        }
                    }
                }
            }
        }
    }
}