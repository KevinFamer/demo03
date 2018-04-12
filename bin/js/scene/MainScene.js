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
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        var layer = new Sprite();
        _this.addChild(layer);
        _this.m_background = new Background();
        layer.addChild(_this.m_background);
        _this.m_hero = new Hero();
        _this.addChild(_this.m_hero);
        _this.m_itemBatchLayer = new Sprite();
        _this.m_itemBatchLayer.loadImage("res/graphics/texture.png");
        _this.addChild(_this.m_itemBatchLayer);
        _this.m_ui = new GameSceneUI();
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
        GameMgr.initFoodMgr(_this);
        GameMgr.initEnemyMgr(_this);
        _this.init();
        return _this;
    }
    MainScene.prototype.init = function () {
        GameMgr.sound.stop();
        GameMgr.sound.playGameBgMusic();
        if (this.m_gameOverUI)
            this.m_gameOverUI.setVisible(false);
        var winWidth = Browser.width;
        var winHeight = Browser.height;
        this.m_ui.setVisible(true);
        GameData.user.lives = Const.HERO_LIVES;
        GameData.user.score = GameData.user.distance = 0;
        GameData.gameState = Const.GAME_STATE_IDLE;
        this.m_cameraShake = GameData.user.heroSpeed = this.m_background.speed = 0;
        this.m_touchY = winHeight / 2;
        this.m_hero.x = -winWidth / 2;
        this.m_hero.y = winHeight / 2;
        GameMgr.food.init();
        this.stopCoffeeEffect();
        this.stopWindEffect();
        this.stopMushroomEffect();
        Timer.frameLoop(2, this, this.update);
    };
    // _onTouchMoved(PTouches, PEvent):void {
    //     if(GameData.gameState != Const.GAME_STATE_OVER)
    //         this.m_touchY = touches[0].getLocation().y;
    // }
    MainScene.prototype._onMouseMove = function (PEvent) {
        if (GameData.gameState != Const.GAME_STATE_OVER)
            this.m_touchY = PEvent.stageY;
    };
    MainScene.prototype._back = function (PEvent) {
        var keyCode = PEvent["keyCode"];
        if (keyCode == Keyboard.BACKSPACE)
            Game.Main.enterLoginScene();
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
            Laya.loader.load("res/particles/wind.plist", Handler.create(this, this.showWindEffect), null, Loader.JSON);
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
            Laya.loader.load("res/particles/coffee.plist", Handler.create(this, this.showCoffeeEffect), null, Loader.JSON);
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
            Laya.loader.load("res/particles/mushroom.plist", Handler.create(this, this.showMushroomEffect), null, Loader.JSON);
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
        Laya.loader.load("res/particles/eat.plist", Handler.create(this, this.f_playEffect, [itemX, itemY]), null, Loader.JSON);
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
        GameData.gameState = Const.GAME_STATE_OVER;
    };
    MainScene.prototype._gameOver = function () {
        if (!this.m_gameOverUI) {
            this.m_gameOverUI = new GameOverUI(this);
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
        switch (GameData.gameState) {
            case Const.GAME_STATE_IDLE:
                // Take off.
                if (this.m_hero.x < winWidth * 0.5 * 0.5) {
                    this.m_hero.x += ((winWidth * 0.5 * 0.5 + 10) - this.m_hero.x) * 0.05;
                    this.m_hero.y -= (this.m_hero.y - this.m_touchY) * 0.1;
                    GameData.user.heroSpeed += (Const.HERO_MIN_SPEED - GameData.user.heroSpeed) * 0.05;
                    this.m_background.speed = GameData.user.heroSpeed * elapsed;
                }
                else {
                    GameData.gameState = Const.GAME_STATE_FLYING;
                    this.m_hero.state = Const.HERO_STATE_FLYING;
                }
                this._handleHeroPose();
                this.m_ui.update();
                break;
            case Const.GAME_STATE_FLYING:
                // If drank coffee, fly faster for a while.
                if (GameData.user.coffee > 0)
                    GameData.user.heroSpeed += (Const.HERO_MAX_SPEED - GameData.user.heroSpeed) * 0.2;
                else
                    this.stopCoffeeEffect();
                // If not hit by obstacle, fly normally.
                if (GameData.user.hitObstacle <= 0) {
                    this.m_hero.y -= (this.m_hero.y - this.m_touchY) * 0.1;
                    // If this.m_hero is flying extremely fast, create a wind effect and show force field around this.m_hero.
                    if (GameData.user.heroSpeed > Const.HERO_MIN_SPEED + 100) {
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
                    if (GameData.user.coffee <= 0) {
                        // Play this.m_hero animation for obstacle hit.
                        if (this.m_hero.state != Const.HERO_STATE_HIT) {
                            this.m_hero.state = Const.HERO_STATE_HIT;
                        }
                        // Move hero to center of the screen.
                        this.m_hero.y -= (this.m_hero.y - winHeight / 2) * 0.1;
                        // Spin the this.m_hero.
                        if (this.m_hero.y > winHeight * 0.5)
                            this.m_hero.rotation -= GameData.user.hitObstacle * 2;
                        else
                            this.m_hero.rotation += GameData.user.hitObstacle * 2;
                    }
                    // If hit by an obstacle.
                    GameData.user.hitObstacle--;
                    // Camera shake.
                    this.m_cameraShake = GameData.user.hitObstacle;
                    this._shakeAnimation();
                }
                // If we have a mushroom, reduce the value of the power.
                if (GameData.user.mushroom > 0)
                    GameData.user.mushroom -= elapsed;
                else
                    this.stopMushroomEffect();
                // If we have a coffee, reduce the value of the power.
                if (GameData.user.coffee > 0)
                    GameData.user.coffee -= elapsed;
                GameData.user.heroSpeed -= (GameData.user.heroSpeed - Const.HERO_MIN_SPEED) * 0.01;
                // Create food items.
                GameMgr.food.update(this.m_hero, elapsed);
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
                this.m_background.speed = GameData.user.heroSpeed * elapsed;
                // Calculate maximum distance travelled.
                GameData.user.distance += (GameData.user.heroSpeed * elapsed) * 0.1;
                this.m_ui.update();
                break;
            case Const.GAME_STATE_OVER:
                GameMgr.food.removeAll();
                // Dispose the eat particle temporarily.
                // Dispose the wind particle temporarily.
                // Spin the hero.
                this.m_hero.setRotation(30);
                // Make the hero fall.
                // If hero is still on screen, push him down and outside the screen. Also decrease his speed.
                // Checked for +width below because width is > height. Just a safe value.
                if (this.m_hero.y > -this.m_hero.height / 2) {
                    GameData.user.heroSpeed -= GameData.user.heroSpeed * elapsed;
                    this.m_hero.y -= winHeight * elapsed;
                }
                else {
                    // Once he moves out, reset speed to 0.
                    GameData.user.heroSpeed = 0;
                    // Stop game tick.
                    Timer.clearAll(this);
                    // Game over.
                    this._gameOver();
                }
                // Set the background's speed based on hero's speed.
                this.m_background.speed = GameData.user.heroSpeed * elapsed;
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
//# sourceMappingURL=MainScene.js.map