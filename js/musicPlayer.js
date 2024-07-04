class MusicPlayer {
    constructor() {

    }

    inicializarTodo(audio, progressElement, currentTimeSong) {
        this.audio = audio;
        this.audioFiles = this.extraerAudio();
        this.currentIndex = 0;
        this.iniciado = 0;
        this.audio = new Audio();
        this.audio.autoplay = false;
        this.audio.controls = true;
        this.progressElement = progressElement;
        this.currentTimeSong = currentTimeSong;

        this.audio.addEventListener('timeupdate', () => {
            this.updateProgress();
        });

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
        // this.audio.play();
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
        this.progressElement.value = currentTime;
    }

    extraerAudio() {
        const myArray = [];
        this.audio.forEach(element => {
            myArray.push(element.path);
        });

        return myArray;
    }

    destroy() {
        // Liberar recursos y remover eventos
        this.audio.removeEventListener('timeupdate', this.updateProgress);
        this.audio.pause();
        this.audio = null;
        this.progressElement = null;
        this.currentTimeSong = null;
        this.audioFiles = null;

    }

    convertirAminutos(duracion) {
        const duracionSegundos = duracion;
        const minutos = Math.floor(duracionSegundos / 60);
        const segundos = Math.floor(duracionSegundos % 60);

        return `${minutos}:${segundos.toString().padStart(2, '0')}`;
    }


    convertirDeFloatAEntero(numeroFloat) {
        if (typeof numeroFloat === 'number' && !isNaN(numeroFloat)) {
            return Math.trunc(numeroFloat);
        }
    }



}
