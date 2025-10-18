let n_cancion = 1;
let ruta_cancion = `songs/song${n_cancion}.mp3`;
let boton_play = document.getElementById("botonPlay");

let sound;

function empezarMusica() {


    ruta_cancion = `songs/song${n_cancion}.mp3`;

    if (sound) {
        sound.stop();
    }

    sound = new Howl({
        src: [ruta_cancion],
        autoplay: false,
        loop: false,
    });


    sound.play();
    console.log("Reproduciendo: ", ruta_cancion);
}

function pararMusica() {

    sound.pause();
    console.log("stop");
}


function siguienteCancion() {
    sound.stop();
    n_cancion++;
    console.log("Poniendo: ", n_cancion);
    empezarMusica();
}
