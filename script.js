let canciones = [];
let info = [];
let n_cancion = 0;
let sound;
let duracion_cancion;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const cargar_json = async () => {
    let response = await fetch('data.json');
    info = await response.json();

    info.forEach(cancion => {
        console.log(cancion.cancion);
        console.log(cancion.titulo);
        console.log("-")
    });

    console.log(info);
};




cargar_json();

function empezarMusica() {

    let ruta_cancion = info[n_cancion].cancion;

    if (sound) {
        sound.stop();
    }

  sound = new Howl({
        src: [ruta_cancion],
        autoplay: false,
        loop: false,
        onload: async function () {
            const duracion = sound.duration();
            const tiempo_aleatorio = Math.random() * duracion;
            while(tiempo_aleatorio > duracion - 5){ 
                tiempo_aleatorio = Math.random() * duracion;
            }  
                console.log("Empieza en ", tiempo_aleatorio);
                sound.seek(tiempo_aleatorio);
                sound.play();
                await sleep(5000);
                sound.stop();
                console.log("Acaba en", tiempo_aleatorio + 5);
                
        }
    });


    duracion_cancion = sound.duration();

    sound.play();
    console.log("Reproduciendo: ", ruta_cancion);
    console.log("Título: ", info[n_cancion].titulo);

    console.log("Duración: ", duracion_cancion);




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
        console.log("Tiempo Actual ", nuevo_tiempo);
    }
}









/*=== Cargar JSON de radios ===/
let soundRadio;

let radios = [];

const cargar_jsonRadios = async () => {
    // detener reproducción de pistas si están sonando
    if (sound) sound.stop();

    try {
        let response = await fetch('data_radios.json');
        radios = await response.json();

        radios.forEach(radio => {
            console.log('Radio cargada:', radio.numero, radio.nombre, radio.link);
        });

        console.log('Radios:', radios);
    } catch (err) {
        console.error('Error cargando radios:', err);
        radios = [];
    }
};

// === Función para reproducir la radio seleccionada ===
function Radio(numeroRadio) {
    if (soundRadio) {
        soundRadio.stop();
    }
    const radioSeleccionada = radios.find(r => r.numero === numeroRadio);
    if (!radioSeleccionada) {
        console.error('No se encontró la radio con número:', numeroRadio);
        return;
    }

    // Crear el sonido con Howler usando la URL de la radio seleccionada
    try {
        soundRadio = new Howl({
            src: [radioSeleccionada.link],
            html5: true, // necesario para streams online
            autoplay: true,
            loop: true
        });

        console.log('Reproduciendo radio:', radioSeleccionada.nombre, radioSeleccionada.link);
    } catch (err) {
        console.error('Error creando Howl para la radio:', err);
    }
}

// === Llamada inicial para cargar el JSON ===
// cargar radios al inicio para tenerlas disponibles
cargar_jsonRadios();

// función auxiliar llamada desde el botón "Activar Radio"
function activarRadio(){
    if (radios.length === 0) {
        // si aún no se cargaron, cargar y reproducir la primera si existe
        cargar_jsonRadios().then(()=>{
            if (radios.length>0) Radio(radios[0].numero);
        });
    } else {
        // reproducir la primera radio por defecto
        Radio(radios[0].numero);
    }
}
    /*=== Fin Cargar JSON de radios ===/*/
