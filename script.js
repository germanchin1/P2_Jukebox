let ruta_cancion = "songs\\song1.mp3"
let boton_play = document.getElementById("botonPlay")

var sound = new Howl({
    src: [ruta_cancion],
    autoplay: true,
    loop: false,
});



function empezarMusica(){
    sound.play();
    console.log("play")
    console.log(sound)
}
function pararMusica(){
    sound.pause();
    console.log("stop")
}