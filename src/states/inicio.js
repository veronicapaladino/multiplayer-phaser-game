//Variable MiJuego
const MiJuego = {};

//Inicializo la función EstadoInicio vacía
MiJuego.EstadoInicio = function (juego) {

};

//Este es el prototipo o "plantilla" que se cargará cada vez que inicialice una nueva función  MiJuego.EstadoInicio
MiJuego.EstadoInicio.prototype = {

    preload: function () {

        //Cargo las imágenes para los botones
        this.load.spritesheet('botonInicio', '../assets/images/load.png', 100, 25);
        this.load.spritesheet('botonOpciones', '../assets/images/load.png', 100, 25);
        this.load.spritesheet('botonJugar', '../assets/images/load.png', 100, 25);
        this.load.spritesheet('botonSalir', '../assets/images/load.png', 100, 25);

    },

    create: function () {

        //Pinto el fondo y el texto
        this.stage.backgroundColor = '#95c11f';
        this.texto = this.add.text(juego.world.centerX -100, juego.world.centerY - 50, 'Estado Inicio', { fontSize: '32px', fill: '#FFF' });

        //Creo el menú de botones
        crearMenu();

    },

};

function crearMenu(){

    //Creo un grupo para el menú
    menu = juego.add.group();

    //Añado los cuatro botones al menú
    this.botonInicio = juego.make.button(125, 50, 'botonInicio', cambiarEstado, this, 2, 1, 0); //over, out, pressed
    menu.add(this.botonInicio);

    this.botonOpciones = juego.make.button(275, 50, 'botonOpciones', cambiarEstado, this, 2, 1, 0);
    menu.add(this.botonOpciones);

    this.botonJugar = juego.make.button(425, 50, 'botonJugar', cambiarEstado, this, 2, 1, 0);
    menu.add(this.botonJugar);

    this.botonSalir = juego.make.button(575, 50, 'botonSalir', cambiarEstado, this, 2, 1, 0);
    menu.add(this.botonSalir);

    //Fijo los botones para que no se muevan al moverse la cámara
    menu.fixedToCamera = true;

}

function cambiarEstado(item){

    //Cambio el estado al hacr clic en un botón
    var estado = 'Estado'+item.key.substr(5);
    juego.state.start(estado);

}