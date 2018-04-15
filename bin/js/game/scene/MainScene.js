var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var userData = Data.user;
    var Sprite = Laya.Sprite;
    var Browser = Laya.Browser;
    var Timer = Laya.timer;
    var Handler = Laya.Handler;
    var Loader = Laya.Loader;
    var Particle2D = Laya.Particle2D;
    var Keyboard = Laya.Keyboard;
    var MainScene = /** @class */ (function (_super) {
        __extends(MainScene, _super);
        function MainScene() {
            var _this = _super.call(this) || this;
            var layer = new Sprite();
            _this.addChild(layer);
            _this.m_background = new Game.Background();
            layer.addChild(_this.m_background);
            _this.m_hero = new Game.Hero();
            _this.addChild(_this.m_hero);
            _this.m_itemBatchLayer = new Sprite();
            _this.m_itemBatchLayer.loadImage(Global.Path.PNG_TEXTURE_PATH);
            _this.addChild(_this.m_itemBatchLayer);
            _this.m_ui = new Game.GameSceneUI();
            _this.addChild(_this.m_ui);
            _this.m_ui.update();
            // if("touches" in cc.sys.capabilities)
            //     cc.eventManager.addListener({event: cc.EventListener.TOUCH_ALL_AT_ONCE, onTouchesMoved: this._onTouchMoved.bind(this)}, this);
            // else
            //     cc.eventManager.addListener({event: cc.EventListener.MOUSE, onMouseMove: this._onMouseMove.bind(this)}, this);
            // cc.eventManager.addListener({event: cc.EventListener.KEYBOARD, onKeyReleased: this._back}, this);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, _this, _this._onMouseMove);
            // 键盘事件监听
            Laya.stage.on(Laya.Event.KEY_UP, _this, _this._back);
            Game.GameMgr.initFoodMgr(_this);
            Game.GameMgr.initEnemyMgr(_this);
            _this.init();
            return _this;
        }
        MainScene.prototype.init = function () {
            Game.GameMgr.sound.stop();
            Game.GameMgr.sound.playGameBgMusic();
            if (this.m_gameOverUI)
                this.m_gameOverUI.setVisible(false);
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            this.m_ui.setVisible(true);
            userData.lives = Global.Const.HERO_LIVES;
            userData.score = userData.distance = 0;
            Data.gameState = Global.Const.GAME_STATE_IDLE;
            this.m_cameraShake = userData.heroSpeed = this.m_background.speed = 0;
            this.m_touchY = winHeight / 2;
            this.m_hero.x = -winWidth / 2;
            this.m_hero.y = winHeight / 2;
            Game.GameMgr.food.init();
            this.stopCoffeeEffect();
            this.stopWindEffect();
            this.stopMushroomEffect();
            Timer.frameLoop(2, this, this.update);
        };
        // _onTouchMoved(PTouches, PEvent):void {
        //     if(Data.gameState != Global.Const.GAME_STATE_OVER)
        //         this.m_touchY = touches[0].getLocation().y;
        // }
        MainScene.prototype._onMouseMove = function (PEvent) {
            if (Data.gameState != Global.Const.GAME_STATE_OVER)
                this.m_touchY = PEvent.stageY;
        };
        MainScene.prototype._back = function (PEvent) {
            var keyCode = PEvent["keyCode"];
            if (keyCode == Keyboard.BACKSPACE)
                Game.main.enterLoginScene();
        };
        MainScene.prototype._handleHeroPose = function () {
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            // Rotate this.m_hero based on mouse position.
            if (Math.abs(-(this.m_hero.y - this.m_touchY) * 0.2) < 30)
                this.m_hero.setRotation((this.m_hero.y - this.m_touchY) * 0.2);
            // Confine the this.m_hero to stage area limit
            if (this.m_hero.y < this.m_hero.height * 0.5) {
                this.m_hero.y = this.m_hero.height * 0.5;
                this.m_hero.setRotation(0);
            }
            if (this.m_hero.y > winHeight - this.m_hero.height * 0.5) {
                this.m_hero.y = winHeight - this.m_hero.height * 0.5;
                this.m_hero.setRotation(0);
            }
        };
        MainScene.prototype._shakeAnimation = function () {
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
        };
        MainScene.prototype.showWindEffect = function (PPS) {
            if (PPS === void 0) { PPS = null; }
            if (this.m_windEffect)
                return;
            if (!PPS) {
                Laya.loader.load(Global.Path.PLIST_WIND_PATH, Handler.create(this, this.showWindEffect), null, Loader.JSON);
                return;
            }
            this.m_windEffect = new Particle2D(PPS);
            this.m_windEffect.x = Browser.width;
            this.m_windEffect.y = Browser.height / 2;
            this.m_windEffect.setScaleX(100);
            this.addChild(this.m_windEffect);
            this.m_windEffect.emitter.start();
            this.m_windEffect.play();
        };
        MainScene.prototype.stopWindEffect = function () {
            if (this.m_windEffect) {
                this.m_windEffect.stopSystem();
                this.removeChild(this.m_windEffect);
                this.m_windEffect = null;
            }
        };
        MainScene.prototype.showCoffeeEffect = function (PPS) {
            if (PPS === void 0) { PPS = null; }
            if (this.m_coffeeEffect)
                return;
            if (!PPS) {
                Laya.loader.load(Global.Path.PLIST_COFFEE_PATH, Handler.create(this, this.showCoffeeEffect), null, Loader.JSON);
                return;
            }
            this.m_coffeeEffect = new Particle2D(PPS);
            this.addChild(this.m_coffeeEffect);
            this.m_coffeeEffect.x = this.m_hero.x + this.m_hero.width / 4;
            this.m_coffeeEffect.y = this.m_hero.y;
            this.m_coffeeEffect.emitter.start();
            this.m_coffeeEffect.play();
        };
        MainScene.prototype.stopCoffeeEffect = function () {
            if (this.m_coffeeEffect) {
                this.m_coffeeEffect.stopSystem();
                this.removeChild(this.m_coffeeEffect);
                this.m_coffeeEffect = null;
            }
        };
        MainScene.prototype.showMushroomEffect = function (PPS) {
            if (PPS === void 0) { PPS = null; }
            if (this.m_mushroomEffect)
                return;
            if (!PPS) {
                Laya.loader.load(Global.Path.PLIST_MUSHROOM_PATH, Handler.create(this, this.showMushroomEffect), null, Loader.JSON);
                return;
            }
            this.m_mushroomEffect = new Particle2D(PPS);
            this.addChild(this.m_mushroomEffect);
            this.m_mushroomEffect.x = this.m_hero.x + this.m_hero.width / 4;
            this.m_mushroomEffect.y = this.m_hero.y;
            this.m_mushroomEffect.emitter.start();
            this.m_mushroomEffect.play();
        };
        MainScene.prototype.stopMushroomEffect = function () {
            if (this.m_mushroomEffect) {
                this.m_mushroomEffect.stopSystem();
                this.removeChild(this.m_mushroomEffect);
                this.m_mushroomEffect = null;
            }
        };
        MainScene.prototype.showEatEffect = function (itemX, itemY) {
            Laya.loader.load(Global.Path.PLIST_EAT_PATH, Handler.create(this, this.f_playEffect, [itemX, itemY]), null, Loader.JSON);
        };
        MainScene.prototype.f_playEffect = function (PPS, PX, PY) {
            var effect = new Particle2D(PPS);
            effect.emitter.start();
            effect.play();
            effect.x = PX;
            effect.y = PY;
            this.addChild(effect);
        };
        /**
         * hero被碰撞N次后，结束游戏；结束之前，先播放hero掉落的动画
         */
        MainScene.prototype.endGame = function () {
            this.x = 0;
            this.y = 0;
            Data.gameState = Global.Const.GAME_STATE_OVER;
        };
        MainScene.prototype._gameOver = function () {
            if (!this.m_gameOverUI) {
                this.m_gameOverUI = new Game.GameOverUI(this);
                this.addChild(this.m_gameOverUI);
            }
            this.m_gameOverUI.setVisible(true);
            this.m_gameOverUI.init();
        };
        /**
         *
         * @param elapsed 秒
         */
        MainScene.prototype.update = function (elapsed) {
            var winWidth = Browser.width;
            var winHeight = Browser.height;
            switch (Data.gameState) {
                case Global.Const.GAME_STATE_IDLE:
                    // Take off.
                    if (this.m_hero.x < winWidth * 0.5 * 0.5) {
                        this.m_hero.x += ((winWidth * 0.5 * 0.5 + 10) - this.m_hero.x) * 0.05;
                        this.m_hero.y -= (this.m_hero.y - this.m_touchY) * 0.1;
                        userData.heroSpeed += (Global.Const.HERO_MIN_SPEED - userData.heroSpeed) * 0.05;
                        this.m_background.speed = userData.heroSpeed * elapsed;
                    }
                    else {
                        Data.gameState = Global.Const.GAME_STATE_FLYING;
                        this.m_hero.state = Global.Const.HERO_STATE_FLYING;
                    }
                    this._handleHeroPose();
                    this.m_ui.update();
                    break;
                case Global.Const.GAME_STATE_FLYING:
                    // If drank coffee, fly faster for a while.
                    if (userData.coffee > 0)
                        userData.heroSpeed += (Global.Const.HERO_MAX_SPEED - userData.heroSpeed) * 0.2;
                    else
                        this.stopCoffeeEffect();
                    // If not hit by obstacle, fly normally.
                    if (userData.hitObstacle <= 0) {
                        this.m_hero.y -= (this.m_hero.y - this.m_touchY) * 0.1;
                        // If this.m_hero is flying extremely fast, create a wind effect and show force field around this.m_hero.
                        if (userData.heroSpeed > Global.Const.HERO_MIN_SPEED + 100) {
                            this.showWindEffect();
                            // Animate this.m_hero faster.
                            this.m_hero.toggleSpeed(true);
                        }
                        else {
                            // Animate this.m_hero normally.
                            this.m_hero.toggleSpeed(false);
                            this.stopWindEffect();
                        }
                        this._handleHeroPose();
                    }
                    else {
                        // Hit by obstacle
                        if (userData.coffee <= 0) {
                            // Play this.m_hero animation for obstacle hit.
                            if (this.m_hero.state != Global.Const.HERO_STATE_HIT) {
                                this.m_hero.state = Global.Const.HERO_STATE_HIT;
                            }
                            // Move hero to center of the screen.
                            this.m_hero.y -= (this.m_hero.y - winHeight / 2) * 0.1;
                            // Spin the this.m_hero.
                            if (this.m_hero.y > winHeight * 0.5)
                                this.m_hero.rotation -= userData.hitObstacle * 2;
                            else
                                this.m_hero.rotation += userData.hitObstacle * 2;
                        }
                        // If hit by an obstacle.
                        userData.hitObstacle--;
                        // Camera shake.
                        this.m_cameraShake = userData.hitObstacle;
                        this._shakeAnimation();
                    }
                    // If we have a mushroom, reduce the value of the power.
                    if (userData.mushroom > 0)
                        userData.mushroom -= elapsed;
                    else
                        this.stopMushroomEffect();
                    // If we have a coffee, reduce the value of the power.
                    if (userData.coffee > 0)
                        userData.coffee -= elapsed;
                    userData.heroSpeed -= (userData.heroSpeed - Global.Const.HERO_MIN_SPEED) * 0.01;
                    // Create food items.
                    Game.GameMgr.food.update(this.m_hero, elapsed);
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
                    this.m_background.speed = userData.heroSpeed * elapsed;
                    // Calculate maximum distance travelled.
                    userData.distance += (userData.heroSpeed * elapsed) * 0.1;
                    this.m_ui.update();
                    break;
                case Global.Const.GAME_STATE_OVER:
                    Game.GameMgr.food.removeAll();
                    // Dispose the eat particle temporarily.
                    // Dispose the wind particle temporarily.
                    // Spin the hero.
                    this.m_hero.setRotation(30);
                    // Make the hero fall.
                    // If hero is still on screen, push him down and outside the screen. Also decrease his speed.
                    // Checked for +width below because width is > height. Just a safe value.
                    if (this.m_hero.y > -this.m_hero.height / 2) {
                        userData.heroSpeed -= userData.heroSpeed * elapsed;
                        this.m_hero.y -= winHeight * elapsed;
                    }
                    else {
                        // Once he moves out, reset speed to 0.
                        userData.heroSpeed = 0;
                        // Stop game tick.
                        Timer.clearAll(this);
                        // Game over.
                        this._gameOver();
                    }
                    // Set the background's speed based on hero's speed.
                    this.m_background.speed = userData.heroSpeed * elapsed;
                    break;
            }
            if (this.m_mushroomEffect) {
                this.m_mushroomEffect.x = this.m_hero.x + this.m_hero.width / 4;
                this.m_mushroomEffect.y = this.m_hero.y;
            }
            if (this.m_coffeeEffect) {
                this.m_coffeeEffect.x = this.m_hero.x + this.m_hero.width / 4;
                this.m_coffeeEffect.y = this.m_hero.y;
            }
        };
        return MainScene;
    }(Sprite));
    Game.MainScene = MainScene;
})(Game || (Game = {}));
//# sourceMappingURL=MainScene.js.map