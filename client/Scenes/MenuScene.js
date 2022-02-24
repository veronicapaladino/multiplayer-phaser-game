//Escena inicial del juego...
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {}

  create() {
    this.fondoMenu = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setInteractive();

    this.input.mouse.capture = true;

    const empezarPartida = this.add.text(600, 100, "Empezar Partida", {
      fill: "white",
      fontSize: "32px",
    });
    empezarPartida.setInteractive();

    empezarPartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });

    const unirsePartida = this.add.text(600, 200, "Unirse Partida", {
      fill: "white",
      fontSize: "32px",
    });
    unirsePartida.setInteractive();

    unirsePartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });

    const salir = this.add.text(600, 300, "Salir", {
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
