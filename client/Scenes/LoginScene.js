//Escena inicial del juego...
class LoginScene extends Phaser.Scene {
  constructor() {
    super({ key: "LoginScene" });
  }

  create() {
    //this.add.sprite(0, 100, 'mouse');

    this.input.mouse.capture = true;

    const empezarPartida = this.add.text(100, 100, "Este es el login!!", {
      fill: "#0f0",
    });
    empezarPartida.setInteractive();

    empezarPartida.on("pointerdown", () => {
      console.log("cambiar de escena a: MenuScene");
      this.scene.start("MenuScene");
    });
  }
}

export default LoginScene;

/* ESTO NO FUNCIONA!!
var game2;
class LoginScene extends Phaser.Scene{

    constructor (game) {
        console.log('viene game', game);
        super({key: "LoginScene"});
    }

     preload()
    {
        this.load.html('nameform', 'client/assets/components/login-form.html');
        this.load.html('form', 'client/assets/images/load.png');
    }

    create()
    {
        const text = this.add.text(10, 10, 'Login', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        console.log('ESTE ES ', game2);
        const element = this.add.dom(400, 600).createFromCache('form');

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
                    this.scene.launch('PasswordModal');
                    this.scene.bringToTop('PasswordModal');
                    this.scene.setVisible(true,this.currentScene);
                }
            }
        });
    }

   

}


export default LoginScene; */
