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
    this.fondoMenu = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setInteractive();

    this.input.mouse.capture = true;

    const empezarPartida = this.add.text(500, 100, "Empezar Partida", {
      fill: "white",
      fontSize: "32px",
    });
    empezarPartida.setInteractive();

    empezarPartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });

    const unirsePartida = this.add.text(500, 200, "Unirse Partida", {
      fill: "white",
      fontSize: "32px",
    });
    unirsePartida.setInteractive();

    unirsePartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });

    const salir = this.add.text(500, 300, "Unirse Partida", {
      fill: "white",
      fontSize: "32px",
    });
    salir.setInteractive();

    salir.on("pointerdown", () => {
      console.log("cambiar de escena a: LoginScene");
      this.scene.start("LoginScene");
    });
  }
}

export default MenuScene;
