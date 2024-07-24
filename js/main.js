
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
// Luis Fernando Paxel Cojolón 06/07/2024

const containerInicio = document.querySelector("#containerInicio");
const meencanta = document.querySelector("#meecanta");


btAlbum.addEventListener("click", (e) => {
    e.preventDefault();
    containerMusic.style.display = "none";
    containerAlbum.style.display = "flex";

});

backalbum.addEventListener("click", (e) => {
    e.preventDefault();
    containerMusic.style.display = "flex";
    containerAlbum.style.display = "none";
});

function BackSongs() {
    containerSongs.style.display = "none";
    containerAlbum.style.display = "flex";
}


let playindex = 0;
let isplay = "off";
let isshufle = "off";
let id = 0;

let istheme = "light";

localStorage.setItem("theme", istheme);



// INICIALIZANDO ALBUM
const album = new ALbumSong();
let itemsAlbum = document.querySelectorAll("#containerAlbum .itemAlbum");
let albmunActive = album.eletronic;
let NombreAlbumclick = "";



const currentTimeSong = document.querySelector("#time");

// INICIALIZANDO LA CLASE PRINCIPAL
let musicPlayer = new MusicPlayer();
musicPlayer.inicializarTodo(albmunActive, progress, currentTimeSong);


window.onload = function (e) {
    context3 = new AudioContext();
    SetTheme();
    Limpiar();

    let ima = localStorage.getItem("ima");
    if (!localStorage.getItem("perfil")) {
        containerMusic.style.display = "none";
        containerInicio.style.display = "flex";
    } else {

        RenderProfile(ima);
        AlertaUser("success", `Bienvenido ${localStorage.getItem("perfil")}! ¡Que tenga un gran día!`, "#23ffed");
        containerInicio.style.display = "none";
        containerAlbum.style.display = "flex";
    }
}

meencanta.addEventListener("click", (e) => {
    e.preventDefault();
    initMusic(albmunActive, 2);
    CrearListado(albmunActive, "Electronic", "Electronic");
    CreateListActive(albmunActive, "Musica Electronica", "electronic");
});


VerContenidoAlbums();

function VerContenidoAlbums() {
    for (btn of itemsAlbum) {
        btn.addEventListener("click", function (e) {
            document.querySelector("#containerSongs .boxcontainer").innerHTML = "";

            containerAlbum.style.display = "none";
            containerSongs.style.display = "flex";
            let valor = this.id;
            NombreAlbumclick = valor;
            let nombre = "", AlbumLista = "";


            if (NombreAlbumclick == "electronic") {
                AlbumLista = album.eletronic;
                nombre = "Música Electrónica";
            }
            if (NombreAlbumclick == "noventas") {
                AlbumLista = album.noventas;
                nombre = "90s Música";
            }
            if (NombreAlbumclick == "Cristianas") {
                AlbumLista = album.Cristianas;
                nombre = "Música Cristiana";
            }
            if (NombreAlbumclick == "rehabilitacion") {
                AlbumLista = album.rehabilitacion;
                nombre = "Música Rehabilitación";
            }

            main(AlbumLista);
            async function main(AlbumLista) {
                try {
                    await addSongDurations(AlbumLista);
                    CrearListado(AlbumLista, nombre, NombreAlbumclick);
                } catch (error) {
                }
            }
        });
    }
}



function CrearListado(nombreAlbum, nombre, clasificacion) {
    let cadena = `
      <div class="header" id="titleheader">
        <i id="backsongs" onclick="BackSongs()" class="bx bx-arrow-back"></i>
        <h4>${nombre}</h4>
        <i class="bx bx-menu" id="btconf"></i>
      </div>
    `;

    let cuerpo = nombreAlbum.map(element => {
        let songactive = element.id === id && nombreAlbum === albmunActive ? "songActive" : "";
        return `
        <div class="itemSong ${clasificacion}${element.id} ${songactive}" id="${element.id}" name="${clasificacion}">
          <div class="imagedetailA"><img loading="lazy" src="${element.image}" /></div>
          <div class="detailitem">
            <div class="detail">
              <span>${element.name}</span><br />
              <span>${element.autor}</span>
            </div>
            <div class="timeitem"><span>${element.duration}</span></div>
          </div>
          <div class="opcionesitem">
            <i class="bx bx-dots-vertical-rounded"></i>
          </div>
        </div>
      `;
    }).join('');

    document.querySelector("#containerSongs .boxcontainer").innerHTML = cadena + cuerpo;
    ObtenerSongItem();
}

async function addSongDurations(songs) {
    try {
        await Promise.all(songs.map(async song => {
            let duration = await getSongDuration(song.path);
            let convertir = convertirAminutos(duration);
            song.duration = convertir;
        }));
        return songs;
    } catch (error) {
        throw new Error(`Error al procesar las canciones: ${error.message}`);
    }
}

function getSongDuration(songPath) {
    return new Promise((resolve, reject) => {
        const audioElement = new Audio(songPath);
        audioElement.onloadedmetadata = () => {
            resolve(audioElement.duration);
        };
        audioElement.onerror = () => {
            // reject(new Error(`Error al procesar la canción ${songPath}`));
        };
    });
}

 


function Premium() {
    let pre = document.querySelectorAll(".bx-dots-vertical-rounded");

    for (iterator of pre) {
        iterator.addEventListener("click", function () {
            AlertaUser("info", "Unicamente Para Usuarios Premium", "#dbe600");

        });
    }
}

const imageProfile = document.querySelector(".imageProfile");

imageProfile.addEventListener("click", () => {
    AlertaUser("info", "Unicamente Para Usuarios Premium", "#dbe600");

});



function CreateListActive(nombreAlbum, nombre, clasificacion) {
    cadena02 = ` <div class="headlista">
              <h4>${nombre}</h4>
              <span>En Reproduccion</span>
            </div>`;

    let cuerpo = "";
    nombreAlbum.forEach(element => {

        let songactive = "";

        if (element.id == id && nombreAlbum == albmunActive) {
            songactive = "songActive";
        }

        cuerpo += `     
        <div class="itemSong ${clasificacion}${element.id} ${songactive}" id="${element.id}" name ="${clasificacion}"  >
          <div class="imagedetailA"><img loading="lazy" src="${element.image}" /></div>
          <div class="detailitem">
            <div class="detail">
              <span>${element.name}</span> <br />
              <span>${element.autor}</span>
            </div>
            <div class="timeitem"> <i class='bx bx-equalizer bx-burst' ></i> <span>${element.duration}</span></div>
          </div>
          <div  class="opcionesitem">
            <i class="bx bx-dots-vertical-rounded"></i>
          </div>
        </div>
        `;
    });

    cadena02 += cuerpo;
    document.querySelector(".cuerpoLista").innerHTML = cadena02;
    ObtenerSongItem();
    Premium();
}




function ObtenerSongItem() {
    let itemsSong = document.querySelectorAll(".itemSong");
    for (iterator of itemsSong) {
        iterator.addEventListener("click", function (e) {
            id = this.id;
            let name = this.getAttribute("name");
            let nombre = "";
            if (name == "electronic") {
                nombre = "Música Electrónica";
                albmunActive = album.eletronic;
            }
            if (name == "noventas") {
                albmunActive = album.noventas;
                nombre = "90s Música";
            }

            if (name == "Cristianas") {
                albmunActive = album.Cristianas;
                nombre = "Música Cristiana";
            }
            if (name == "rehabilitacion") {
                albmunActive = album.rehabilitacion;
                nombre = "Música Rehabilitación";
            }
            initMusic(albmunActive, id);
            CreateListActive(albmunActive, nombre, name);
        });
    }

}


function initMusic(albmunActive, id) {
    musicPlayer.destroy();
    musicPlayer.inicializarTodo(albmunActive, progress, currentTimeSong);
    musicPlayer.playSong(Number(id));
    let datos = buscarPorIndice(albmunActive, Number(id));
    pintarDataSong(datos);
    actualizarTiempoDeLaCancion(musicPlayer);
    ActualizarTiem002(musicPlayer);
    initMP3PlayerCanva(musicPlayer);
    Repetir();
    // SongActiveList(id);

    if (isplay == "on") {
        musicPlayer.resume();
    } else {
        musicPlayer.pause();
    }

    containerAlbum.style.display = "none";
    containerSongs.style.display = "none";
    containerMusic.style.display = "flex";


}

function SongActiveList(clase) {
    let itemsSong = document.querySelectorAll(".itemSong");
    itemsSong.forEach(element => {
        element.classList.remove("songActive");
    });

    let idBuscar = clase;
    let miDiv = document.getElementById(idBuscar);
    let segundaClase = miDiv.classList[1];
    var songActive = document.querySelector("." + segundaClase + "");
    songActive.classList.add("songActive")
}



// Ejemplo de uso


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

    playPause(playindex, albmunActive);

});

function playPause(playindex, albumActive) {

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
function actualizarTiempoDeLaCancion(musicPlayer) {

    musicPlayer.audio.addEventListener('timeupdate', (e) => {
        let duracion = musicPlayer.audio.currentTime;
        let entero = convertirDeFloatAEntero(duracion);
        let tiempo = convertirAminutos(entero);
        document.querySelector("#time").innerHTML = tiempo;
    });
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
    SongActiveList(index);
    id = index;
});

next.addEventListener("click", (e) => {
    e.preventDefault();
    const index = musicPlayer.playNextSong();
    const data = buscarPorIndice(albmunActive, index);
    pintarDataSong(data);
    SongActiveList(index);
    id = index;
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


function playRandomSongs(songs) {
    // Verificar si se proporcionó un array de canciones
    let nombre;
    if (!Array.isArray(songs) || songs.length === 0) {
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


function Repetir() {
    musicPlayer.audio.addEventListener("ended", () => {
        if (isrepeat == "desactivado" && isshufle == "off") {
            musicPlayer.playNextSong();
            const audioName = musicPlayer.audio.src.split('/').pop();
            let pathSong = "music/" + audioName;
            let index = getIndexOfSong(pathSong);
            const data = buscarPorIndice(albmunActive, index);
            pintarDataSong(data);
            SongActiveList(index);
            id = index;
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
            SongActiveList(index);
            id = index;
            if (isplay == "on") {
                musicPlayer.resume();
            } else {
                musicPlayer.pause();
            }
        }
    });
}


function ActualizarTiem002(musicPlayer) {
    musicPlayer.audio.onloadedmetadata = function () {
        progress.max = musicPlayer.audio.duration;
        progress.value = musicPlayer.audio.currentTime;
        const numeroEntero = convertirDeFloatAEntero(musicPlayer.audio.duration);
        const dur = convertirAminutos(numeroEntero);
        document.querySelector("#totalTime").innerHTML = dur;
    }

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


let colors = "#23ffed";


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
    let nameSong = document.querySelector("#nameSong").textContent;
    Swal.fire({
        title: "Descargar",
        text: '¿Desea descargar "' + nameSong + '" ?',
        icon: "question",
        iconColor: colors,
        showCancelButton: true,
        confirmButtonColor: colors,
        cancelButtonColor: "#ff005d",
        confirmButtonText: "Si"
    }).then((result) => {
        if (result.isConfirmed) {
            DownloadSong();
            Swal.fire({
                title: "Descargando...",
                text: "Descarga en proceso ❤️",
                icon: "success",
                iconColor: colors,
                confirmButtonColor: colors,
            });
        }
    });
});


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
});


// THEME DATA
const body = document.querySelector("body");
const themebtn = document.querySelector("#theme");

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

// spectrum patronus
$(".bxs-color").spectrum({
    color: "#f00",
    showPalette: false,
    showAlpha: true,
    showButtons: false,
});

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
    .songActive {
  border: 1px solid ${color.toHexString()} !important;
  color: ${color.toHexString()} !important;
  box-shadow: none !important;
 }

 ::-webkit-scrollbar-thumb {
  background-color: ${color.toHexString()} !important;
  border-radius: 0.2rem;
}

   `;
    colors = color.toHexString();

});


// INICIO FORMULARIO

let avatar = document.querySelectorAll("#avatar");
let name = "inactivo";

for (avr of avatar) {
    avr.addEventListener("click", function (e) {
        removeClassAvatar();
        name = this.getAttribute("name");
        let clase = this.getAttribute("class");
        let rico = document.querySelector("." + clase + "");
        rico.classList.toggle("imageActive");

    });
}

function removeClassAvatar() {
    avatar.forEach(element => {
        element.classList.remove("imageActive")
    });
}


function EnviarForm(name) {
    const username = document.querySelector("#username").value;

    if (username === null) {
        alert("Escribir Nombre");
        AlertaUser("error", "Por favor ingrese un username y elija un avatar.", "#e4004c");

    }
    if (username === "") {
        AlertaUser("error", "Por favor ingrese un username y elija un avatar.", "#e4004c");

    }
    if (username && name != "inactivo") {
        containerAlbum.style.display = "flex";
        containerInicio.style.display = "none";
        AlertaUser("success", `Bienvenido ${username}! ¡Que tenga un gran día!`, "#23ffed");
        RenderProfile(name);
        localStorage.setItem("ima", name);
        localStorage.setItem("perfil", username);
    }
}

// OBTENIENDO LOS DATOS DEL USUARIO
document.querySelector("#iniciar").addEventListener("click", () => {
    EnviarForm(name);
})


function AlertaUser(icon, titulo, color) {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        iconColor: color,
        timer: 3412,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: titulo
    });
}

function RenderProfile(nameImage) {
    let imageProfile = document.querySelector(".imageProfile");
    let cadena = `<img loading="lazy" src="images/${nameImage}.png" alt="" />`
    imageProfile.innerHTML = cadena;
}



function Limpiar() {
    containerAlbum.style.display = "none";
    containerInicio.style.display = "none";
    containerMusic.style.display = "none";
    containerSongs.style.display = "none";
}