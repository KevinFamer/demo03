var Game;
(function (Game) {
    var Sound = Laya.SoundManager;
    class SoundMgr extends Core.Singleton {
        /** 获取单例实例 */
        static getInstance() {
            return Core.Singleton.getInstanceOrCreate(SoundMgr);
        }
        onCreate() {
            this.m_silence = false;
        }
        onDestroy() {
        }
        playMenuBgMusic() {
            if (!this.m_silence) {
                Sound.playMusic(Global.Path.MP3_WELCOME_PATH, 0);
            }
        }
        playGameBgMusic() {
            if (!this.m_silence) {
                Sound.playMusic(Global.Path.MP3_BG_PATH, 0);
            }
        }
        playEat() {
            if (!this.m_silence) {
                Sound.stopAllSound();
                Sound.playSound(Global.Path.MP3_EAT_PATH, 1);
            }
        }
        playCoffee() {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_COFFEE_PATH, 1);
            }
        }
        playMushroom() {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_MUSHROOM_PATH, 1);
            }
        }
        playHit() {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_HIT_PATH, 1);
            }
        }
        playHurt() {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_HURT_PATH, 1);
            }
        }
        playLose() {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_LOSE_PATH, 1);
            }
        }
        stop() {
            Sound.stopAll();
        }
        toggleOnOff() {
            if (this.m_silence) {
                this.m_silence = false;
                Sound.setMusicVolume(1);
                Sound.setSoundVolume(1);
            }
            else {
                this.m_silence = true;
                Sound.setMusicVolume(0);
                Sound.setSoundVolume(0);
            }
        }
    }
    Game.SoundMgr = SoundMgr;
})(Game || (Game = {}));
//# sourceMappingURL=SoundMgr.js.map