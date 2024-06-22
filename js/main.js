const modalconf = document.querySelector("#modalconf");
const btconf = document.querySelector("#btconf");
const icocerrar = document.querySelector(".ico-cerrar");


btconf.addEventListener("click", () => {
    modalconf.showModal();
});

icocerrar.addEventListener("click", () => {
    modalconf.close();
});

let progress = document.querySelector("#progress");
let prev = document.querySelector(".prev");
let play = document.querySelector(".bx-play");
let next = document.querySelector(".next");

let song = document.querySelector("#song");

let songsAlbum1 = [
    {
        id: 1,
        name: "Angeles Fuimos",
        autor: "Luis Fernando",
        path: "music/Dragon_Ball_Z_Angeles.mp3",
        image: "images/img3.jpg"
    },
    {
        id: 2,
        name: "Legends Never Die",
        autor: "Celine Dion",
        path: "music/legends_never_dieRemix.mp3",
        image: "images/img21.jpg"
    },
    {
        id: 3,
        name: "No We Are Free",
        autor: "Serena Belle",
        path: "music/noweare.mp3",
        image: "images/gladiator.jpg"
    }

]


// Ejemplo de uso
const audioFiles = songsAlbum1;
// audioFiles.forEach(element => {
//      console.log(element.path);
// });

const currentTimeSong = document.querySelector("#time");

// INICIALIZANDO LA CLASE PRINCIPAL
const musicPlayer = new MusicPlayer(audioFiles, progress, currentTimeSong);
// musicPlayer.playSong(1);

let playindex = 0;
let isplay = false;

function buscarPorIndice(array, indice) {
    return array.find((_, index) => index === indice);
}

const nameSong = document.querySelector("#nameSong");
const author = document.querySelector("#author");
const imageSong = document.querySelector("#imageSong");

function pintarDataSong(data) {
    nameSong.innerHTML = data.name;
    author.innerHTML = data.autor;
    imageSong.src = data.image;

}

play.addEventListener("click", () => {
    context.resume().then(() => {
        if (musicPlayer.iniciado === 0) {
            musicPlayer.playSong(playindex);
            const data = buscarPorIndice(songsAlbum1, playindex);
            pintarDataSong(data);
        }
        if (musicPlayer.iniciado === 1) {
            playPause();
        }

    });


});

prev.addEventListener("click", () => {
    const index = musicPlayer.playPreviousSong();
    const data = buscarPorIndice(songsAlbum1, index);
    pintarDataSong(data);
});

next.addEventListener("click", () => {
    const index = musicPlayer.playNextSong();
    const data = buscarPorIndice(songsAlbum1, index);
    pintarDataSong(data);
});

const repeat = document.querySelector(".bx-repeat");

function toggle(value, ...options) {
    const currentIndex = options.indexOf(value);
    if (currentIndex === -1) {
        return options[0];
    } else if (currentIndex === options.length - 1) {
        return options[0];
    } else {
        return options[currentIndex + 1];
    }
}

let currentValue = 'desactivado';

// Función de manejo del clic
function handleToggleClick() {
    currentValue = toggle(currentValue, 'on', 'off', 'desactivado');
    console.log(currentValue);


    if (currentValue == "off") {
        musicPlayer.audio.loop = false;
        repeat.classList.add("apagado");
        repeat.classList.remove("encendido", "desactivado");
    }
    if (currentValue == 'on') {
        musicPlayer.audio.loop = true;
        repeat.classList.add("encendido");
        repeat.classList.remove("apagado", "desactivado");
    }
    if (currentValue == 'desactivado') {
        repeat.classList.add("desactivado");
        repeat.classList.remove("apagado", "encendido");
    }
}


function getIndexOfSong(songTitle) {
    const index = musicPlayer.audioFiles.indexOf(songTitle);
    if (index !== -1) {
        return index;
    } else {
        console.log(`La canción "${songTitle}" no se encontró en la lista.`);
    }
}

repeat.addEventListener("click", handleToggleClick);





function playPause() {
    if (isplay) {
        musicPlayer.pause();
        play.classList.add("bx-pause");
        play.classList.remove("bx-play");
    } else {
        musicPlayer.resume();
        play.classList.remove("bx-pause");
        play.classList.add("bx-play");
    }
    isplay = !isplay;
}


musicPlayer.audio.addEventListener('timeupdate', () => {
    let duracion = musicPlayer.audio.currentTime;
    let entero = convertirDeFloatAEntero(duracion);
    let tiempo = convertirAminutos(entero);
    document.querySelector("#time").innerHTML = tiempo;

});


function playRandomSongs(songs) {
    // Verificar si se proporcionó un array de canciones
    let nombre;
    if (!Array.isArray(songs) || songs.length === 0) {
        console.error('Debes proporcionar un array de canciones válido.');
        return;
    }

    // Función auxiliar para obtener un índice aleatorio
    function getRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }

    // Función principal para reproducir canciones aleatoriamente
    function playNextSong1() {
        const randomIndex = getRandomIndex(songs);
        nombre = randomIndex;
    }
    playNextSong1();
    return nombre;

}
const bxshuffle = document.querySelector(".bx-shuffle");

let isshufle = "off";

bxshuffle.addEventListener("click", () => {
    bxshuffle.classList.toggle("encendido");
    if (isshufle == "off") {
        isshufle = "on";
    } else {
        isshufle = "off";
    }
    console.log(isshufle);
});

musicPlayer.audio.addEventListener("ended", () => {
    if (currentValue == "desactivado" && isshufle == "off") {
        musicPlayer.playNextSong();
        const audioName = musicPlayer.audio.src.split('/').pop();
        let pathSong = "music/" + audioName;
        let index = getIndexOfSong(pathSong);
        const data = buscarPorIndice(songsAlbum1, index);
        pintarDataSong(data);
    }

    if (currentValue == "desactivado" && isshufle == "on") {
        let songIndex = playRandomSongs(musicPlayer.audioFiles);
        musicPlayer.playSong(songIndex);
        const audioName = musicPlayer.audio.src.split('/').pop();
        let pathSong = "music/" + audioName;
        let index = getIndexOfSong(pathSong);
        const data = buscarPorIndice(songsAlbum1, index);
        pintarDataSong(data);

    }
})




musicPlayer.audio.onloadedmetadata = function () {
    progress.max = musicPlayer.audio.duration;
    progress.value = musicPlayer.audio.currentTime;
    const numeroEntero = convertirDeFloatAEntero(musicPlayer.audio.duration);
    const dur = convertirAminutos(numeroEntero);
    document.querySelector("#totalTime").innerHTML = dur;


}

function convertirAminutos(duracion) {
    const duracionSegundos = duracion;
    const minutos = Math.floor(duracionSegundos / 60);
    const segundos = Math.floor(duracionSegundos % 60);

    return `${minutos}:${segundos.toString().padStart(2, '0')}`;

}


function convertirDeFloatAEntero(numeroFloat) {
    if (typeof numeroFloat === 'number' && !isNaN(numeroFloat)) {
        return Math.trunc(numeroFloat);
    } else {
        return "No se puede convertir a entero";
    }
}


progress.onchange = function () {
    // song.play();
    musicPlayer.audio.currentTime = progress.value;
}


let context;
window.onload = function () {
    context = new AudioContext();

}


// AUDIO CANVAS ANIMATION

var canvas, ctx, source, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function initMP3Player() {
    if (!musicPlayer.audio.src) {
        // let context = new AudioContext();
        analyser = context.createAnalyser();
        canvas = document.getElementById("analyser_render");
        ctx = canvas.getContext('2d');
        source = context.createMediaElementSource(musicPlayer.audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
    }
}

function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#23ffb9';

    bars = 100;
    for (var i = 0; i < bars; i++) {
        bar_x = i * 4;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

    }
}
window.addEventListener("load", initMP3Player, false);


// FUNCIONES ADICIONALES -DESCARGAR CANCION

const downloadSong = document.querySelector("#downloadSong");

function DownloadSong() {
    const tempLink = document.createElement('a');
    tempLink.href = musicPlayer.audio.src;
    const audioName = musicPlayer.audio.src.split('/').pop();
    tempLink.download = audioName; // Nombre del archivo descargado
    // Agregar el enlace al DOM, hacer clic y luego eliminarlo
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    return 1;
}

downloadSong.addEventListener("click", () => {
    let descargar = DownloadSong();
    if (descargar == 1) {
        AlertSongDownload();
    }
});

function AlertSongDownload() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        iconColor: "#23ffcc",
        timer: 1000,
        timerProgressBar: true,
        // didOpen: (toast) => {
        //   toast.addEventListener("mouseenter", Swal.stopTimer);
        //   toast.addEventListener("mouseleave", Swal.resumeTimer);
        // },
    });

    Toast.fire({
        icon: "success",
        title:
            "<h5 style='color:var(--color-text);  font-weight: bold;' > Descarga completada</h5>",
    }).then(function () {

    });

}











