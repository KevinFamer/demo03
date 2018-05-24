module Game {
    import Sound = Laya.SoundManager;

    export class SoundMgr extends Core.BaseSingleton
    {
        /** 获取单例实例 */
        public static getInstance():SoundMgr
        {
            return Core.BaseSingleton.getInstanceOrCreate(SoundMgr);
        }

        private m_silence:boolean;

        protected onCreate():void 
        {
            this.m_silence = false;
        }

        protected onDestroy():void
        {
        }

        playMenuBgMusic():void 
        {
            if (!this.m_silence) {
                Sound.playMusic(Global.Path.MP3_WELCOME_PATH, 0);
            }
        }

        playGameBgMusic():void 
        {
            if (!this.m_silence) {
                Sound.playMusic(Global.Path.MP3_BG_PATH, 0);
            }
        }

        playEat():void 
        {
            if (!this.m_silence) {
                Sound.stopAllSound();
                Sound.playSound(Global.Path.MP3_EAT_PATH, 1);
            }
        }

        playCoffee():void 
        {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_COFFEE_PATH, 1);
            }
        }

        playMushroom():void 
        {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_MUSHROOM_PATH, 1);
            }
        }

        playHit():void 
        {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_HIT_PATH, 1);
            }
        }

        playHurt():void 
        {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_HURT_PATH, 1);
            }
        }

        playLose():void 
        {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_LOSE_PATH, 1);
            }
        }

        stop():void 
        {
            Sound.stopAll();
        }

        toggleOnOff():void 
        {
            if (this.m_silence) {
                this.m_silence = false;
                Sound.setMusicVolume(1);
                Sound.setSoundVolume(1);
            } else {
                this.m_silence = true;
                Sound.setMusicVolume(0);
                Sound.setSoundVolume(0);
            }
        }
    }
}