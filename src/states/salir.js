MiJuego.EstadoSalir = function (juego) {

};

MiJuego.EstadoSalir.prototype = {

    create: function () {

        //Fondo y texto
        this.stage.backgroundColor = '#ca1c1c';
        this.texto = this.add.text(juego.world.centerX -100, juego.world.centerY - 50, 'Estado Salir', { fontSize: '32px', fill: '#FFF' });

        //Menú Botones
        crearMenu();

    }

};