MiJuego.EstadoLogin = function (juego) {

};

MiJuego.EstadoLogin.prototype = {

    preload: function()
    {
        // Agregar imágenes
        this.load.html('nameform', '../assets/images/load.png');
        this.load.image('pic', '../assets/images/load.png');
    },

    create: function ()
    {
        this.add.image(400, 300, 'pic');

        const text = this.add.text(10, 10, 'Login', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        const element = this.add.dom(400, 600).createFromCache('nameform');

        element.setPerspective(800);

        element.addListener('click');

        element.on('click', function (event) {

            if (event.target.name === 'loginButton')
            {
                const inputUsername = this.getChildByName('username');
                const inputPassword = this.getChildByName('password');

                // Pregunto si ingresaron algo
                if (inputUsername.value !== '' && inputPassword.value !== '')
                {
                    //  Turn off the click events
                    this.removeListener('click');

                    //  Populate the text with whatever they typed in as the username!
                    text.setText('Hola ' + inputUsername.value);
                }
                else
                {
                    //TODO: mensaje de error
                }
            }

        });
    }
}