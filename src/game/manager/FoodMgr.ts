module Game {
    import Pool = Laya.Pool;
    import Sprite = Laya.Sprite;
    
    export class FoodMgr extends Core.Singleton 
    {
        /** 获取单例实例 */
        public static getInstance():FoodMgr
        {
            return Core.Singleton.getInstanceOrCreate(FoodMgr);
        }

        private m_container:Sprite;
        private m_gameScene:MainScene;
        private m_itemsToAnimate:Array<Item>;

        /** Current pattern of food items - 0 = horizontal, 1 = vertical, 2 = zigzag, 3 = random, 4 = special item. */
        private m_pattern:number = 0;
        //物品Y坐标
        private m_patternPosY:number = 0;
        /** How far away are the patterns created vertically. */
        private m_patternStep:number = 0;
        /** Direction of the pattern creation - used only for zigzag. */
        private m_patternDirection:number = 0;
        /** Gap between each item in the pattern horizontally. */
        private m_patternGap:number = 0;
        /** Pattern gap counter. */
        private m_patternGapCount:number = 0;
        /** How far should the player fly before the pattern changes. */
        private m_patternChangeDistance:number = 0;
        /** How long are patterns created verticaly? */
        private m_patternLength:number = 0;
        /** A trigger used if we want to run a one-time command in a pattern. */
        private m_patternOnce:boolean = false;
        /** Y position for the entire pattern - Used for vertical pattern only. */
        private m_patternPosYstart:number = 0;
        
        protected onCreate():void 
        {
            this.m_gameScene = SceneMgr.getInstance().getCurScene() as MainScene;
            this.m_container = this.m_gameScene.itemBatchLayer;
            this.m_itemsToAnimate = new Array();
        }

        protected onDestroy():void 
        {
        }

        init():void 
        {
            this.removeAll();
            this.m_pattern = 1;
            this.m_patternPosY = Laya.Browser.height - Global.Const.GAME_AREA_TOP_BOTTOM;
            this.m_patternStep = 15;
            this.m_patternChangeDistance = 1;
            this.m_patternGap = 20;
            this.m_patternGapCount = 0;
            this.m_patternChangeDistance = 100;
            this.m_patternLength = 50;
            this.m_patternOnce = true;
            Data.user.coffee = Data.user.mushroom = 0;
        }

        removeAll():void 
        {
            if (this.m_itemsToAnimate.length > 0) {
                let len = this.m_itemsToAnimate.length - 1;
                let item:Item = null;
                for (let i = len; i >= 0; i--) {
                    item = this.m_itemsToAnimate[i];
                    this.m_itemsToAnimate.splice(i, 1);
                    item.unuse();
                }
            }
        }

        update(PHero, PElapsed):void 
        {
            this.setFoodPattern(PElapsed);
            this.createFoodPattern(PElapsed);
            this.animateFoodItems(PHero, PElapsed);
        }

        private setFoodPattern(PElapsed):void 
        {
            // If hero has not travelled the required distance, don't change the pattern.
            if (this.m_patternChangeDistance > 0) {
                this.m_patternChangeDistance -= Data.user.heroSpeed * PElapsed;
            } else {
                // If hero has travelled the required distance, change the pattern.
                if (Math.random() < 0.7) {
                    // If random number is < normal item chance (0.7), decide on a random pattern for items.
                    this.m_pattern = Math.ceil(Math.random() * 4);
                } else {
                    // If random number is > normal item chance (0.3), decide on a random special item.
                    this.m_pattern = Math.ceil(Math.random() * 2) + 9;
                }

                if (this.m_pattern == 1) {
                    // Vertical Pattern
                    this.m_patternStep = 15;
                    this.m_patternChangeDistance = Math.random() * 500 + 500;
                } else if (this.m_pattern == 2) {
                    // Horizontal Pattern
                    this.m_patternOnce = true;
                    this.m_patternStep = 40;
                    this.m_patternChangeDistance = this.m_patternGap * Math.random() * 3 + 5;
                } else if (this.m_pattern == 3) {
                    // ZigZag Pattern
                    this.m_patternStep = Math.round(Math.random() * 2 + 2) * 10;
                    if (Math.random() > 0.5) {
                        this.m_patternDirection *= -1;
                    }
                    this.m_patternChangeDistance = Math.random() * 800 + 800;
                } else if (this.m_pattern == 4) {
                    // Random Pattern
                    this.m_patternStep = Math.round(Math.random() * 3 + 2) * 50;
                    this.m_patternChangeDistance = Math.random() * 400 + 400;
                } else {
                    this.m_patternChangeDistance = 0;
                }
            }
        }

        private createFoodPattern(PElapsed):void 
        {
            // Create a food item after we pass some distance (patternGap).
            if (this.m_patternGapCount < this.m_patternGap) {
                this.m_patternGapCount += Data.user.heroSpeed * PElapsed;
            } else if (this.m_pattern != 0) {
                // If there is a pattern already set.
                this.m_patternGapCount = 0;
                let winWidth = Laya.stage.width;
                let winHeight = Laya.stage.height;
                let item:Item = null;    //Item

                switch (this.m_pattern) {
                    case 1:
                        // Horizontal, creates a single food item, and changes the position of the pattern randomly.
                        if (Math.random() > 0.9) {
                            // Set a new random position for the item, making sure it's not too close to the edges of the screen.
                            this.m_patternPosY = Math.floor(Math.random() * (winHeight - 2 * Global.Const.GAME_AREA_TOP_BOTTOM)) + Global.Const.GAME_AREA_TOP_BOTTOM;
                        }

                        // Checkout item from pool and set the type of item.
                        item = Pool.getItemByClass("Item", Item);
                        item.reuse(Math.ceil(Math.random() * 5));

                        // Reset position of item.
                        item.x = winWidth + item.width;
                        item.y = this.m_patternPosY;

                        // Mark the item for animation.
                        this.m_itemsToAnimate.push(item);
                        this.m_container.addChild(item);
                        break;

                    case 2:
                        // Vertical, creates a line of food items that could be the height of the entire screen or just a small part of it.
                        if (this.m_patternOnce == true) {
                            this.m_patternOnce = false;
                            this.m_patternPosY = Math.floor(Math.random() * (winHeight - 2 * Global.Const.GAME_AREA_TOP_BOTTOM)) + Global.Const.GAME_AREA_TOP_BOTTOM;
                            // Set a random length not shorter than 0.4 of the screen, and not longer than 0.8 of the screen.
                            this.m_patternLength = (Math.random() * 0.4 + 0.4) * winHeight;
                        }

                        // Set the start position of the food items pattern.
                        this.m_patternPosYstart = this.m_patternPosY;

                        // Create a line based on the height of patternLength, but not exceeding the height of the screen.
                        while (this.m_patternPosYstart + this.m_patternStep < this.m_patternPosY + this.m_patternLength
                            && this.m_patternPosYstart + this.m_patternStep < winHeight * 0.8) {
                            item = Pool.getItemByClass("Item", Item);
                            item.reuse(Math.ceil(Math.random() * 5));
                            item.x = winWidth + item.width;
                            item.y = this.m_patternPosYstart;
                            this.m_itemsToAnimate.push(item);
                            this.m_container.addChild(item);

                            // Increase the position of the next item based on patternStep.
                            this.m_patternPosYstart += this.m_patternStep;
                        }
                        break;

                    case 3:
                        // ZigZag, creates a single item at a position, and then moves bottom
                        // until it hits the edge of the screen, then changes its direction and creates items
                        // until it hits the upper edge.

                        // Switch the direction of the food items pattern if we hit the edge.
                        if (this.m_patternDirection == 1 && this.m_patternPosY < Global.Const.GAME_AREA_TOP_BOTTOM) {
                            this.m_patternDirection = -1;
                        } else if (this.m_patternDirection == -1 && this.m_patternPosY > winHeight - Global.Const.GAME_AREA_TOP_BOTTOM) {
                            this.m_patternDirection = 1;
                        }

                        if (this.m_patternPosY <= winHeight - Global.Const.GAME_AREA_TOP_BOTTOM && this.m_patternPosY >= Global.Const.GAME_AREA_TOP_BOTTOM) {
                            item = Pool.getItemByClass("Item", Item);
                            item.reuse(Math.ceil(Math.random() * 5));
                            item.x = winWidth + item.width;
                            item.y = this.m_patternPosY;
                            this.m_itemsToAnimate.push(item);
                            this.m_container.addChild(item);
                            this.m_patternPosY += this.m_patternStep * this.m_patternDirection;
                        } else {
                            this.m_patternPosY = winHeight - Global.Const.GAME_AREA_TOP_BOTTOM;
                        }

                        break;

                    case 4:
                        // Random, creates a random number of items along the screen.
                        if (Math.random() > 0.5) {
                            // Choose a random starting position along the screen.
                            this.m_patternPosY = Math.floor(Math.random() * (winHeight - 2 * Global.Const.GAME_AREA_TOP_BOTTOM)) + Global.Const.GAME_AREA_TOP_BOTTOM;
                            item = Pool.getItemByClass("Item", Item);
                            item.reuse(Math.ceil(Math.random() * 5));
                            item.x = winWidth + item.width;
                            item.y = this.m_patternPosY;
                            this.m_itemsToAnimate.push(item);
                            this.m_container.addChild(item);
                        }
                        break;

                    case 10:
                        // Coffee, this item gives you extra speed for a while, and lets you break through obstacles.

                        // Set a new random position for the item, making sure it's not too close to the edges of the screen.
                        this.m_patternPosY = Math.floor(Math.random() * (winHeight - 2 * Global.Const.GAME_AREA_TOP_BOTTOM)) + Global.Const.GAME_AREA_TOP_BOTTOM;
                        item = Pool.getItemByClass("Item", Item);
                        item.reuse(Global.Const.ITEM_TYPE_COFFEE);
                        item.x = winWidth + item.width;
                        item.y = this.m_patternPosY;
                        this.m_itemsToAnimate.push(item);
                        this.m_container.addChild(item); // addChildAt(item, 2)
                        break;

                    case 11:
                        // Mushroom, this item makes all the food items fly towards the hero for a while.

                        // Set a new random position for the food item, making sure it's not too close to the edges of the screen.
                        this.m_patternPosY = Math.floor(Math.random() * (winHeight - 2 * Global.Const.GAME_AREA_TOP_BOTTOM)) + Global.Const.GAME_AREA_TOP_BOTTOM;
                        item = Pool.getItemByClass("Item", Item);
                        item.reuse(Global.Const.ITEM_TYPE_MUSHROOM);
                        item.x = winWidth + item.width;
                        item.y = this.m_patternPosY;
                        this.m_itemsToAnimate.push(item);
                        this.m_container.addChild(item); // addChildAt(item, 3)
                        break;
                }
            }
        }

        private animateFoodItems(PHero, PElapsed):void 
        {
            let item;
            for (let i = this.m_itemsToAnimate.length - 1; i >= 0; i--) {
                item = this.m_itemsToAnimate[i];

                if (item) {
                    // If hero has eaten a mushroom, make all the items move towards him.
                    if (Data.user.mushroom > 0 && item.type <= Global.Const.ITEM_TYPE_5) {
                        // Move the item towards the player.
                        item.x -= (item.x - PHero.x) * 0.2;
                        item.y -= (item.y - PHero.y) * 0.2;
                    } else {
                        // If hero hasn't eaten a mushroom,
                        // Move the items normally towards the left.
                        item.x -= Data.user.heroSpeed * PElapsed;
                    }

                    // If the item passes outside the screen on the left, remove it (check-in).

                    if (item.x < -80 || Data.gameState == Global.Const.GAME_STATE_OVER) {
                        this.m_itemsToAnimate.splice(i, 1);
                        item.unuse();
                        continue;
                    } else {
                        // Collision detection - Check if the hero eats a food item.
                        let heroItem_xDist = item.x - PHero.x;
                        let heroItem_yDist = item.y - PHero.y;
                        let heroItem_sqDist = heroItem_xDist * heroItem_xDist + heroItem_yDist * heroItem_yDist;

                        if (heroItem_sqDist < 5000) {
                            // If hero eats an item, add up the score.
                            if (item.type <= Global.Const.ITEM_TYPE_5) {
                                Data.user.score += item.type;
                                SoundMgr.getInstance().playEat();
                            } else if (item.type == Global.Const.ITEM_TYPE_COFFEE) {
                                // If hero drinks coffee, add up the score.
                                Data.user.score += 1;

                                // How long does coffee power last? (in seconds)
                                Data.user.coffee = 5;
                                this.m_gameScene.showCoffeeEffect();
                                SoundMgr.getInstance().playCoffee();
                            } else if (item.type == Global.Const.ITEM_TYPE_MUSHROOM) {
                                // If hero eats a mushroom, add up the score.
                                Data.user.score += 1;

                                // How long does mushroom power last? (in seconds)
                                Data.user.mushroom = 4;
                                this.m_gameScene.showMushroomEffect();
                                SoundMgr.getInstance().playMushroom();
                            }

                            // Create an eat particle at the position of the food item that was eaten.
                            this.m_gameScene.showEatEffect(item.x, item.y);

                            // Dispose the food item.
                            this.m_itemsToAnimate.splice(i, 1);
                            item.unuse();
                        }
                    }
                }
            }
        }
    }
}
