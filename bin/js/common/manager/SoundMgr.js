var Sound = Laya.SoundManager;
var SoundMgr = /** @class */ (function () {
    function SoundMgr() {
        this.m_silence = false;
    }
    SoundMgr.prototype.playMenuBgMusic = function () {
        if (!this.m_silence) {
            Sound.playMusic("res/sounds/bgWelcome.mp3", 0);
        }
    };
    SoundMgr.prototype.playGameBgMusic = function () {
        if (!this.m_silence) {
            Sound.playMusic("res/sounds/bgGame.mp3", 0);
        }
    };
    SoundMgr.prototype.playEat = function () {
        if (!this.m_silence) {
            Sound.stopAllSound();
            Sound.playSound("res/sounds/eat.mp3", 1);
        }
    };
    SoundMgr.prototype.playCoffee = function () {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/coffee.mp3", 1);
        }
    };
    SoundMgr.prototype.playMushroom = function () {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/mushroom.mp3", 1);
        }
    };
    SoundMgr.prototype.playHit = function () {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/hit.mp3", 1);
        }
    };
    SoundMgr.prototype.playHurt = function () {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/hurt.mp3", 1);
        }
    };
    SoundMgr.prototype.playLose = function () {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/lose.mp3", 1);
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
//# sourceMappingURL=SoundMgr.js.map