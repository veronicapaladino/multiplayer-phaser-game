//Escena inicial del juego...
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
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
