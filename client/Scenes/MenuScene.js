//Escena inicial del juego...
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {
    var url;
    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js";
    this.load.plugin("rexui", url, true);

    this.load.image("background", "client/assets/images/water.jpg");

    this.load.image(
      "loginButton",
      "client/assets/images/login/loginButton.png"
    );
  }

  create() {
    //this.add.sprite(0, 100, 'mouse');

    this.input.mouse.capture = true;

    const empezarPartida = this.add.text(100, 100, "Empezar Partida", {
      fill: "#0f0",
    });
    empezarPartida.setInteractive();

    empezarPartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });
  }
}

export default MenuScene;
