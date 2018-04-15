var Game;
(function (Game) {
    var Sound = Laya.SoundManager;
    var SoundMgr = /** @class */ (function () {
        function SoundMgr() {
            this.m_silence = false;
        }
        SoundMgr.prototype.playMenuBgMusic = function () {
            if (!this.m_silence) {
                Sound.playMusic(Global.Path.MP3_WELCOME_PATH, 0);
            }
        };
        SoundMgr.prototype.playGameBgMusic = function () {
            if (!this.m_silence) {
                Sound.playMusic(Global.Path.MP3_BG_PATH, 0);
            }
        };
        SoundMgr.prototype.playEat = function () {
            if (!this.m_silence) {
                Sound.stopAllSound();
                Sound.playSound(Global.Path.MP3_EAT_PATH, 1);
            }
        };
        SoundMgr.prototype.playCoffee = function () {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_COFFEE_PATH, 1);
            }
        };
        SoundMgr.prototype.playMushroom = function () {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_MUSHROOM_PATH, 1);
            }
        };
        SoundMgr.prototype.playHit = function () {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_HIT_PATH, 1);
            }
        };
        SoundMgr.prototype.playHurt = function () {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_HURT_PATH, 1);
            }
        };
        SoundMgr.prototype.playLose = function () {
            if (!this.m_silence) {
                Sound.playSound(Global.Path.MP3_LOSE_PATH, 1);
            }
        };
        SoundMgr.prototype.stop = function () {
            Sound.stopAll();
        };
        SoundMgr.prototype.toggleOnOff = function () {
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
        };
        return SoundMgr;
    }());
    Game.SoundMgr = SoundMgr;
})(Game || (Game = {}));
//# sourceMappingURL=SoundMgr.js.map