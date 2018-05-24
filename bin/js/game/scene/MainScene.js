var Game;
(function (Game) {
    var Sprite = Laya.Sprite;
    var Keyboard = Laya.Keyboard;
    class MainScene extends Core.BaseScene {
        onInit() {
            this.sceneId = Global.SceneId.MAIN;
        }
        onShow() {
            super.onShow();
            this.initUI();
        }
        onDestroy() {
            super.onDestroy();
        }
        initUI() {
            this._backgroundUI = new Game.BackgroundUI();
            this.addChild(this._backgroundUI);
            this._hero = new Game.Hero();
            this.addChild(this._hero);
            this.itemBatchLayer = new Sprite();
            this.addChild(this.itemBatchLayer);
            this._mainUI = new Game.GameMainUI();
            this.addChild(this._mainUI);
            this._mainUI.update();
            // if("touches" in cc.sys.capabilities)
            //     cc.eventManager.addListener({event: cc.EventListener.TOUCH_ALL_AT_ONCE, onTouchesMoved: this._onTouchMoved.bind(this)}, this);
            // else
            //     cc.eventManager.addListener({event: cc.EventListener.MOUSE, onMouseMove: this._onMouseMove.bind(this)}, this);
            // cc.eventManager.addListener({event: cc.EventListener.KEYBOARD, onKeyReleased: this._back}, this);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this._onMouseMove);
            // 键盘事件监听
            Laya.stage.on(Laya.Event.KEY_UP, this, this._back);
            this.init();
        }
        init() {
            Game.SoundMgr.getInstance().stop();
            Game.SoundMgr.getInstance().playGameBgMusic();
            Game.viewMgr.hideView(Global.ViewId.GAMEOVER_VIEW);
            var winWidth = Laya.stage.width;
            var winHeight = Laya.stage.height;
            this._mainUI.visible = true;
            Data.user.lives = Global.Const.HERO_LIVES;
            Data.user.score = Data.user.distance = 0;
            Data.gameState = Global.Const.GAME_STATE_IDLE;
            this.m_cameraShake = Data.user.heroSpeed = this._backgroundUI.speed = 0;
            this.m_touchY = winHeight / 2;
            this._hero.x = -winWidth / 2;
            this._hero.y = winHeight / 2;
            Game.FoodMgr.getInstance().init();
            // this.stopCoffeeEffect();
            // this.stopWindEffect();
            // this.stopMushroomEffect();
            Laya.timer.frameLoop(2, this, this.update);
        }
        // _onTouchMoved(PTouches, PEvent):void {
        //     if(Data.gameState != Global.Const.GAME_STATE_OVER)
        //         this.m_touchY = touches[0].getLocation().y;
        // }
        _onMouseMove(PEvent) {
            if (Data.gameState != Global.Const.GAME_STATE_OVER)
                this.m_touchY = PEvent.stageY;
        }
        _back(PEvent) {
            var keyCode = PEvent["keyCode"];
            if (keyCode == Keyboard.BACKSPACE) {
                Game.sceneMgr.enterScene(Global.SceneId.LOGIN);
            }
        }
        _handleHeroPose() {
            var winWidth = Laya.stage.width;
            var winHeight = Laya.stage.height;
            // Rotate this.m_hero based on mouse position.
            if (Math.abs(-(this._hero.y - this.m_touchY) * 0.2) < 30)
                this._hero.rotation = (this._hero.y - this.m_touchY) * 0.2;
            // Confine the this.m_hero to stage area limit
            if (this._hero.y < this._hero.height * 0.5) {
                this._hero.y = this._hero.height * 0.5;
                this._hero.rotation = 0;
            }
            if (this._hero.y > winHeight - this._hero.height * 0.5) {
                this._hero.y = winHeight - this._hero.height * 0.5;
                this._hero.rotation = 0;
            }
        }
        _shakeAnimation() {
            // Animate quake effect, shaking the camera a little to the sides and up and down.
            if (this.m_cameraShake > 0) {
                this.m_cameraShake -= 0.1;
                this.x = Math.random() * this.m_cameraShake - this.m_cameraShake * 0.5;
                this.y = Math.random() * this.m_cameraShake - this.m_cameraShake * 0.5;
            }
            else if (this.x != 0) {
                // If the shake value is 0, reset the stage back to normal. Reset to initial position.
                this.x = 0;
                this.y = 0;
            }
        }
        /**
         * hero被碰撞N次后，结束游戏；结束之前，先播放hero掉落的动画
         */
        endGame() {
            this.x = 0;
            this.y = 0;
            Data.gameState = Global.Const.GAME_STATE_OVER;
        }
        /**
         *
         * @param elapsed 秒
         */
        update() {
            let elapsed = 0.05;
            var winWidth = Laya.stage.width;
            var winHeight = Laya.stage.height;
            switch (Data.gameState) {
                case Global.Const.GAME_STATE_IDLE:
                    // Take off.
                    if (this._hero.x < winWidth * 0.5 * 0.5) {
                        this._hero.x += ((winWidth * 0.5 * 0.5 + 10) - this._hero.x) * 0.05;
                        this._hero.y -= (this._hero.y - this.m_touchY) * 0.1;
                        Data.user.heroSpeed += (Global.Const.HERO_MIN_SPEED - Data.user.heroSpeed) * 0.05;
                        this._backgroundUI.speed = Data.user.heroSpeed * elapsed;
                    }
                    else {
                        Data.gameState = Global.Const.GAME_STATE_FLYING;
                        this._hero.state = Global.Const.HERO_STATE_FLYING;
                    }
                    this._handleHeroPose();
                    this._mainUI.update();
                    break;
                case Global.Const.GAME_STATE_FLYING:
                    // If drank coffee, fly faster for a while.
                    if (Data.user.coffee > 0)
                        Data.user.heroSpeed += (Global.Const.HERO_MAX_SPEED - Data.user.heroSpeed) * 0.2;
                    else 
                    // this.stopCoffeeEffect();
                    // If not hit by obstacle, fly normally.
                    if (Data.user.hitObstacle <= 0) {
                        this._hero.y -= (this._hero.y - this.m_touchY) * 0.1;
                        // If this.m_hero is flying extremely fast, create a wind effect and show force field around this.m_hero.
                        if (Data.user.heroSpeed > Global.Const.HERO_MIN_SPEED + 100) {
                            // this.showWindEffect();
                            // Animate this.m_hero faster.
                            this._hero.toggleSpeed(true);
                        }
                        else {
                            // Animate this.m_hero normally.
                            this._hero.toggleSpeed(false);
                            // this.stopWindEffect();
                        }
                        this._handleHeroPose();
                    }
                    else {
                        // Hit by obstacle
                        if (Data.user.coffee <= 0) {
                            // Play this.m_hero animation for obstacle hit.
                            if (this._hero.state != Global.Const.HERO_STATE_HIT) {
                                this._hero.state = Global.Const.HERO_STATE_HIT;
                            }
                            // Move hero to center of the screen.
                            this._hero.y -= (this._hero.y - winHeight / 2) * 0.1;
                            // Spin the this.m_hero.
                            if (this._hero.y > winHeight * 0.5)
                                this._hero.rotation -= Data.user.hitObstacle * 2;
                            else
                                this._hero.rotation += Data.user.hitObstacle * 2;
                        }
                        // If hit by an obstacle.
                        Data.user.hitObstacle--;
                        // Camera shake.
                        this.m_cameraShake = Data.user.hitObstacle;
                        this._shakeAnimation();
                    }
                    // If we have a mushroom, reduce the value of the power.
                    if (Data.user.mushroom > 0)
                        Data.user.mushroom -= elapsed;
                    // else this.stopMushroomEffect();
                    // If we have a coffee, reduce the value of the power.
                    if (Data.user.coffee > 0)
                        Data.user.coffee -= elapsed;
                    Data.user.heroSpeed -= (Data.user.heroSpeed - Global.Const.HERO_MIN_SPEED) * 0.01;
                    // Create food items.
                    Game.FoodMgr.getInstance().update(this._hero, elapsed);
                    // Create obstacles.
                    //                // Store the hero's current x and y positions (needed for animations below).
                    //                heroX = hero.x;
                    //                heroY = hero.y;
                    //
                    //                // Animate elements.
                    //                this._animateFoodItems();
                    //                this._animateObstacles();
                    //                this._animateEatParticles();
                    //                this._animateWindParticles();
                    // Set the background's speed based on hero's speed.
                    this._backgroundUI.speed = Data.user.heroSpeed * elapsed;
                    // Calculate maximum distance travelled.
                    Data.user.distance += (Data.user.heroSpeed * elapsed) * 0.1;
                    this._mainUI.update();
                    break;
                case Global.Const.GAME_STATE_OVER:
                    Game.FoodMgr.getInstance().removeAll();
                    // Dispose the eat particle temporarily.
                    // Dispose the wind particle temporarily.
                    // Spin the hero.
                    this._hero.rotation = 30;
                    // Make the hero fall.
                    // If hero is still on screen, push him down and outside the screen. Also decrease his speed.
                    // Checked for +width below because width is > height. Just a safe value.
                    if (this._hero.y > -this._hero.height / 2) {
                        Data.user.heroSpeed -= Data.user.heroSpeed * elapsed;
                        this._hero.y -= winHeight * elapsed;
                    }
                    else {
                        // Once he moves out, reset speed to 0.
                        Data.user.heroSpeed = 0;
                        // Stop game tick.
                        Laya.timer.clearAll(this);
                        // Game over.
                        Game.viewMgr.showView(Global.ViewId.GAMEOVER_VIEW);
                    }
                    // Set the background's speed based on hero's speed.
                    this._backgroundUI.speed = Data.user.heroSpeed * elapsed;
                    break;
            }
            if (this.m_mushroomEffect) {
                this.m_mushroomEffect.x = this._hero.x + this._hero.width / 4;
                this.m_mushroomEffect.y = this._hero.y;
            }
            if (this.m_coffeeEffect) {
                this.m_coffeeEffect.x = this._hero.x + this._hero.width / 4;
                this.m_coffeeEffect.y = this._hero.y;
            }
        }
    }
    Game.MainScene = MainScene;
})(Game || (Game = {}));
//# sourceMappingURL=MainScene.js.map