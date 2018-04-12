class SoundMgr {
    private m_silence:boolean;

    constructor() {
        this.m_silence = false;
    }

    playMenuBgMusic():void {
        if (!this.m_silence) {
            Sound.playMusic("res/sounds/bgWelcome.mp3", 0);
        }
    }

    playGameBgMusic():void {
        if (!this.m_silence) {
            Sound.playMusic("res/sounds/bgGame.mp3", 0);
        }
    }

    playEat():void {
        if (!this.m_silence) {
            Sound.stopAllSound();
            Sound.playSound("res/sounds/eat.mp3", 1);
        }
    }

    playCoffee():void {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/coffee.mp3", 1);
        }
    }

    playMushroom():void {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/mushroom.mp3", 1);
        }
    }

    playHit():void {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/hit.mp3", 1);
        }
    }

    playHurt():void {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/hurt.mp3", 1);
        }
    }

    playLose():void {
        if (!this.m_silence) {
            Sound.playSound("res/sounds/lose.mp3", 1);
        }
    }

    stop():void {
        Sound.stopAll();
    }

    toggleOnOff():void {
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