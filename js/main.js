

let progress = document.querySelector("#progress");
let prev = document.querySelector(".prev");
let play = document.querySelector(".bx-play");
let next = document.querySelector(".next");

let song = document.querySelector("#song");
// INICIANDO CON EL MODAL DE LOS ALBUMS
const btAlbum = document.querySelector("#btAlbum");
const containerMusic = document.querySelector("#containerMusic");
const containerAlbum = document.querySelector("#containerAlbum");
const backalbum = document.querySelector("#backalbum");
const containerSongs = document.querySelector("#containerSongs");
const backsongs = document.querySelector("#backsongs");

containerSongs.style.display = "none";
containerMusic.style.display = "flex";
containerAlbum.style.display = "none";

btAlbum.addEventListener("click", () => {
    containerMusic.style.display = "none";
    containerAlbum.style.display = "flex";
});

backalbum.addEventListener("click", () => {
    containerMusic.style.display = "flex";
    containerAlbum.style.display = "none";
});

function BackSongs() {
    containerSongs.style.display = "none";
    containerAlbum.style.display = "flex";

}


// INICIALIZANDO ALBUM
const album = new ALbumSong();
let itemsAlbum = document.querySelectorAll("#containerAlbum .itemSong");
let albmunActive = album.eletronic;

const currentTimeSong = document.querySelector("#time");

// INICIALIZANDO LA CLASE PRINCIPAL
let musicPlayer = new MusicPlayer();
musicPlayer.inicializarTodo(albmunActive, progress, currentTimeSong);

for (btn of itemsAlbum) {
    btn.addEventListener("click", function (e) {
        let valor = this.id;
        uno = valor;
        let nombre = "", AlbumLista = "";

        containerAlbum.style.display = "none";
        containerSongs.style.display = "flex";

        if (uno == "electronic") {
            AlbumLista = album.eletronic;
            nombre = "Electronic Music";
        }

        if (uno == "noventas") {
            AlbumLista = album.noventas;
            nombre = "90s Music";
        }

        CrearListado(AlbumLista, nombre, uno);
    });

}



function CrearListado(nombreAlbum, nombre, clasificacion) {

    cadena = ` <div class="header" id="titleheader">
          <i id="backsongs" onclick = "BackSongs()" class="bx bx-arrow-back"></i>
          <h4>${nombre}</h4>
          <i class="bx bx-menu" id="btconf"></i>
        </div>`;

    nombreAlbum.forEach(element => {
        

        cadena += `     
        <div class="itemSong" id="${element.id}" name ="${clasificacion}" >
          <div class="imagedetailA"><img src="${element.image}" /></div>
          <div class="detailitem">
            <div class="detail">
              <span>${element.name}</span> <br />
              <span>${element.autor}</span>
            </div>
            <div class="timeitem"><span></span></div>
          </div>
          <div class="opcionesitem">
            <i class="bx bx-dots-vertical-rounded"></i>
          </div>
        </div>
        `;
    });

    document.querySelector("#containerSongs .boxcontainer").innerHTML = cadena;
    ObtenerSongItem();
}

function ObtenerSongItem() {
    let itemsSong = document.querySelectorAll("#containerSongs .itemSong");
    for (iterator of itemsSong) {
        iterator.addEventListener("click", function () {
            let id = this.id - 1;
            let name = this.getAttribute("name");

            if (name == "electronic") {
                albmunActive = album.eletronic;

            }

            if (name == "noventas") {
                albmunActive = album.noventas;

            }
            musicPlayer.destroy();
            musicPlayer.inicializarTodo(albmunActive, progress, currentTimeSong);
            musicPlayer.playSong(Number(id));

            let datos = buscarPorIndice(albmunActive, Number(id));

            pintarDataSong(datos);
            containerAlbum.style.display = "none";
            containerSongs.style.display = "none";
            containerMusic.style.display = "flex";
            // initMP3Player();

        });
    }
    
}





// Ejemplo de uso


let playindex = 0;
let isplay = "off";
let isshufle = "off";

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
    initMP3Player();
}



play.addEventListener("click", () => {
    context.resume().then(() => {
        if (musicPlayer.iniciado === 0) {
            musicPlayer.playSong(playindex);
            let data = buscarPorIndice(albmunActive, playindex);
            pintarDataSong(data);
            // isplay = "on";
        }
        if (musicPlayer.iniciado === 1) {
            playPause();
           
        }
    });
});

function playPause() {
    if (isplay == "off") {
        isplay = "on";
        musicPlayer.resume();
        play.classList.remove("bx-pause");
        play.classList.add("bx-play");
        play.classList.add("encendido");

    } else {
        isplay = "off";
        musicPlayer.pause();
        play.classList.add("bx-pause");
        play.classList.remove("bx-play");
        play.classList.remove("encendido");

    }
}


prev.addEventListener("click", () => {
    const index = musicPlayer.playPreviousSong();
    const data = buscarPorIndice(albmunActive, index);
    pintarDataSong(data);
    if (isplay == "on") {
        musicPlayer.resume();
    } else {
        musicPlayer.pause();
    }
});

next.addEventListener("click", () => {
    const index = musicPlayer.playNextSong();
    const data = buscarPorIndice(albmunActive, index);
    pintarDataSong(data);
    if (isplay == "on") {
        musicPlayer.resume();
    } else {
        musicPlayer.pause();
    }

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

let isrepeat = 'desactivado';

// Función de manejo del clic
function RepetirSong() {
    isrepeat = toggle(isrepeat, 'on', 'off', 'desactivado');


    if (isrepeat == "off") {
        musicPlayer.audio.loop = false;
        repeat.classList.add("apagado");
        repeat.classList.remove("encendido", "desactivado");
    }
    if (isrepeat == "on") {
        musicPlayer.audio.loop = true;
        repeat.classList.add("encendido");
        repeat.classList.remove("apagado", "desactivado");
    }
    if (isrepeat == "desactivado") {
        repeat.classList.add("desactivado");
        repeat.classList.remove("apagado", "encendido");
    }

    if (isshufle == "on") {
        isshufle = "off";
        bxshuffle.classList.remove("encendido");
        bxshuffle.classList.add("apagado");
    }

}


function getIndexOfSong(songTitle) {
    const index = musicPlayer.audioFiles.indexOf(songTitle);
    if (index !== -1) {
        return index;
    }
}

repeat.addEventListener("click", RepetirSong);


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
    function getRandomIndex(array) {
        return Math.floor(Math.random() * array.length);
    }
    function playNextSong1() {
        const randomIndex = getRandomIndex(songs);
        nombre = randomIndex;
    }
    playNextSong1();
    return nombre;

}
const bxshuffle = document.querySelector(".bx-shuffle");



bxshuffle.addEventListener("click", () => {
    ShuffleSong();
});

function ShuffleSong() {


    isshufle = toggle(isshufle, 'on', 'off');

    if (isshufle == "off") {
        bxshuffle.classList.remove("encendido");
        bxshuffle.classList.add("apagado");

    }

    if (isshufle == "on") {
        bxshuffle.classList.remove("apagado");
        bxshuffle.classList.add("encendido");
    }

    if (isrepeat == "on" || isrepeat == "off") {
        musicPlayer.audio.loop = false;
        isrepeat = "desactivado";
        repeat.classList.add("desactivado");
        repeat.classList.remove("apagado", "encendido");

    }

}

musicPlayer.audio.addEventListener("ended", () => {
    if (isrepeat == "desactivado" && isshufle == "off") {
        musicPlayer.playNextSong();
        const audioName = musicPlayer.audio.src.split('/').pop();
        let pathSong = "music/" + audioName;
        let index = getIndexOfSong(pathSong);
        const data = buscarPorIndice(albmunActive, index);
        pintarDataSong(data);
        if (isplay == "on") {
            musicPlayer.resume();
        } else {
            musicPlayer.pause();
        }
    }

    if (isrepeat == "desactivado" && isshufle == "on") {
        let songIndex = playRandomSongs(musicPlayer.audioFiles);
        musicPlayer.playSong(songIndex);
        const audioName = musicPlayer.audio.src.split('/').pop();
        let pathSong = "music/" + audioName;
        let index = getIndexOfSong(pathSong);
        const data = buscarPorIndice(albmunActive, index);
        pintarDataSong(data);
        if (isplay == "on") {
            musicPlayer.resume();
        } else {
            musicPlayer.pause();
        }
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
    }
}


progress.onchange = function () {
    musicPlayer.audio.currentTime = progress.value;
}


let context;
window.onload = function () {
    context = new AudioContext();
    SetTheme();
    // initMP3Player();
    

}

let colors = "#23ffed";

// AUDIO CANVAS ANIMATION
var canvas, ctx, source, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

function initMP3Player() {
    
        analyser = context.createAnalyser();
        canvas = document.getElementById("analyser_render");
        ctx = canvas.getContext('2d');
        source = context.createMediaElementSource(musicPlayer.audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
     
}

function frameLooper() {
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colors;

    bars = 100;
    for (var i = 0; i < bars; i++) {
        bar_x = i * 4;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);

    }
}
// window.addEventListener("load", initMP3Player, false);


// FUNCIONES ADICIONALES -DESCARGAR CANCION
const downloadSong = document.querySelector("#downloadSong");

function DownloadSong() {
    const tempLink = document.createElement('a');
    tempLink.href = musicPlayer.audio.src;
    const audioName = musicPlayer.audio.src.split('/').pop();
    tempLink.download = audioName; // Nombre del archivo descargado
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
    });

    Toast.fire({
        icon: "success",
        title:
            "<h5 style='color:var(--color-text);  font-weight: bold;' > Descarga completada</h5>",
    }).then(function () {

    });
}

const volume = document.querySelector(".bx-volume-full");
const volumeSlider = document.querySelector("#volume-slider");


ismute = "off";

volume.addEventListener("click", () => {
    volume.classList.toggle("encendido");
    if (ismute == "off") {
        ismute = "on";
        volume.classList.add("bx-volume-mute");
        volume.classList.remove("bx-volume-full");
        musicPlayer.audio.volume = 0;
    } else {
        ismute = "off";
        volume.classList.remove("bx-volume-mute");
        volume.classList.add("bx-volume-full");
        musicPlayer.audio.volume = 1;
    }
});


volumeSlider.addEventListener('input', () => {
    musicPlayer.audio.volume = volumeSlider.value;
    if (musicPlayer.audio.volume == 0) {
        ismute = "on";
        volume.classList.add("bx-volume-mute");
        volume.classList.remove("bx-volume-full");
        volume.classList.add("encendido");
    } else {
        ismute = "off";
        volume.classList.remove("bx-volume-mute");
        volume.classList.add("bx-volume-full");
        volume.classList.remove("encendido");
    }
});


// DESPLEGAR LISTA DIMANICA
const despliegue = document.querySelector(".container .ListandoReproduccion");
const enReproduccion = document.querySelector(".enReproduccion");

enReproduccion.addEventListener("click", () => {
    despliegue.classList.toggle("desplegar");
})













// THEME DATA
const body = document.querySelector("body");
const themebtn = document.querySelector("#theme");
let istheme = "light";
localStorage.setItem("theme", istheme);

themebtn.addEventListener("click", () => {
    SetTheme();
});


function SetTheme() {
    const root = document.documentElement;


    if (localStorage.getItem("theme") == "light") {
        istheme = "dark";
        themebtn.classList.remove("bxs-sun", "activado");
        themebtn.classList.add("bxs-moon");

        localStorage.setItem("theme", istheme);
    } else {
        istheme = "light";
        themebtn.classList.add("bxs-sun", "activado");
        themebtn.classList.remove("bxs-moon");
        localStorage.setItem("theme", istheme);
    }
    root.setAttribute("data-theme", istheme);
}

let cambiarColor = document.querySelector(".bxs-color");


$(".bxs-color").spectrum({
    color: "#f00",
    showPalette: false,
    showAlpha: true,
    showButtons: false,
     
})

var styleElement = document.createElement("style");
styleElement.rel = "stylesheet";
styleElement.href = "css/elementos.css";
document.head.appendChild(styleElement);

$(".bxs-color").on("dragstop.spectrum", function (e, color) {

    styleElement.textContent = `
    input[type="range"]::-webkit-slider-thumb {
     height: 0.6rem;
     width: 0.6rem;
     -webkit-appearance: none;
     cursor: pointer;
     box-shadow: -100em 0 0 100em ${color.toHexString()};
     -webkit-appearance: none;
     border: 3px solid white;
     border-radius: 50%;
     background: ${color.toHexString()};
   }
    .encendido{
    color: ${color.toHexString()} !important;
    }
   `;
    colors = color.toHexString();

    //    $("#meecanta").css("color", color.toHexString());
    //    ctx.fillStyle = 
});



// Establecer el contenido CSS

