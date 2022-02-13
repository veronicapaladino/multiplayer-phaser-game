//Escena inicial del juego...
class LoginScene extends Phaser.Scene{

    constructor () {
        super({key: "LoginScene"});
    }

    create(){

       
        //this.add.sprite(0, 100, 'mouse');
    
        this.input.mouse.capture = true;

        const empezarPartida = this.add.text(100, 100, 'Este es el login!!', { fill: '#0f0' });
        empezarPartida.setInteractive();
    
        empezarPartida.on('pointerdown', () => { 
            console.log('cambiar de escena a: MenuScene'); 
            this.scene.start("MenuScene");
        });
    }

   

}


export default LoginScene;