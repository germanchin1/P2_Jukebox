let canciones = [];
let info = [];
let n_cancion = 0;
let sound;

const cargar_json = async () => {
    let response = await fetch('data.json');
    info = await response.json();

    info.forEach(cancion => {
        console.log(cancion.cancion);
        console.log(cancion.titulo);
    });

    console.log(info);
};

cargar_json();

function empezarMusica() {
    if (info.length === 0) {
        console.log("Data JSON sin cargar");
        return;
    }

    let ruta_cancion = info[n_cancion].cancion;

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

    let portada = document.getElementById("imagen_cancion");
    portada.src = info[n_cancion].imagen;
}

function pararMusica() {
    if (sound) {
        sound.pause();
        console.log("Pausado");
    }
}

function siguienteCancion() {
    if (sound) {
        sound.stop();
    }

    n_cancion++;

    if (n_cancion >= info.length) {
        n_cancion = 0;
    }

    console.log("Poniendo: ", n_cancion);
    empezarMusica();
}

function previaCancion() {
    if (sound) {
        sound.stop();
    }

    n_cancion--;

    if (n_cancion < 0) {
        n_cancion = info.length - 1;
    }

    console.log("Poniendo: ", n_cancion);
    empezarMusica();
}
