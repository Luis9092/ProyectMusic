class MusicPlayer {
    constructor(audio, progressElement, currentTimeSong) {
        this.audio = audio;
        this.audioFiles = this.extraerAudio();
        this.currentIndex = 0;
        this.iniciado = 0;
        this.audio = new Audio();
        // this.index = this.index
        this.audio.autoplay = false;
        this.audio.controls = true;
        // this.audio.loop = true;
        this.progressElement = progressElement;
        this.currentTimeSong = currentTimeSong;

        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });
        // this.totalAudiof = this.audio.duration;

        // this.audio.addEventListener('ended',
        //     this.playNextSong.bind(this)
        // );
    }

    playNextSong() {
        this.currentIndex = (this.currentIndex + 1) % this.audioFiles.length;
        this.playSong(this.currentIndex);
        return this.currentIndex;
    }

    playPreviousSong() {
        this.currentIndex = (this.currentIndex - 1 + this.audioFiles.length) % this.audioFiles.length;
        this.playSong(this.currentIndex);
        return this.currentIndex;
    }

    playSong(index) {
        this.audio.src = this.audioFiles[index];
        this.audio.play();
        this.iniciado = 1;
    }

    pause() {
        this.audio.pause();
    }

    resume() {
        this.audio.play();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    updateProgress() {
        const currentTime = this.audio.currentTime;
        const totalDuration = this.audio.duration;
        // this.currentTimeSong.innerHTML= currentTime;
        this.progressElement.value = currentTime;
    }

    extraerAudio() {
        const myArray = [];
        this.audio.forEach(element => {
            myArray.push(element.path);
        });
        return myArray;
    }


}
