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



    //VINILO GIRANDO ¿?
    let portada = document.getElementById("imagen_cancion");
    let vinyl = document.getElementById("vinyl");
    if (info[n_cancion].imagen) {
        portada.src = info[n_cancion].imagen;
        vinyl.src = info[n_cancion].imagen;
    } else {
        portada.removeAttribute('src');
        vinyl.removeAttribute('src');
    }

    if (vinyl) vinyl.classList.add('spinning');
}




function pararMusica() {
    if (sound) {
        console.log
        sound.pause();
        console.log("Pausado", sound);
        
        //VINILO PARADO ¿?
        let vinyl = document.getElementById('vinyl');
        if (vinyl) vinyl.classList.remove('spinning');
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



function volumen(value){
    if (sound) {
        sound.volume(value);
        console.log(value);
    }
}

function cambiarTiempo(value){
    if (sound) {
        let duracion = sound.duration();
        let nuevo_tiempo = duracion * value;
        sound.seek(nuevo_tiempo);
        console.log("Tiempo cambiado a: ", nuevo_tiempo);
    }
}



let soundRadio;

const cargar_jsonRadios = async () => {
    let response = await fetch('data_radios.json');
    info = await response.json();

    info.forEach(radio => {
        console.log(radio.nombre);
        console.log(radio.link); // corregido: antes era "radio.url"
    });

    console.log(info);
};

// === Función para reproducir la radio seleccionada ===
function Radio(numeroRadio) {
    // Si ya hay una radio sonando, la detenemos
    if (soundRadio) {
        soundRadio.stop();
    }

    // Buscar la radio según su número en el JSON
    const radioSeleccionada = info.find(r => r.numero === numeroRadio);

    if (!radioSeleccionada) {
        console.error("No se encontró la radio con número:", numeroRadio);
        return;
    }

    // Crear el sonido con Howler
    soundRadio = new Howl({
        src: [info.link],
        html5: true,    // necesario para streams online
        autoplay: true,
        loop: false
    });

    console.log("Reproduciendo:", radioSeleccionada.nombre);
}

// === Llamada inicial para cargar el JSON ===
cargar_jsonRadios();
