var selectedTeam;
var game;
//Escena donde se visualizan las vistas laterales
class VistaLateralScene extends Phaser.Scene {
  constructor() {
    super({ key: "VistaLateralScene" });
  }

  preload() {}

  create(data) {
    game = this;
    selectedTeam = data.team;
    this.keys = this.input.keyboard.createCursorKeys();

    if (selectedTeam === "barco") {
      this.fondo = this.add
        .image(0, 0, "water-lateral")
        .setOrigin(0.2, 0.2)
        .setInteractive();

      this.input.mouse.capture = true;

      this.barco = this.add
        .image(610, 500, "barco-lateral")
        .setOrigin(0.4, 0.4)
        .setInteractive();
    } else {
      this.fondo = this.add.image(0, 0, "oceano").setInteractive();

      this.fondo = this.add
        .image(200, 200, "submarino-lateral")
        .setOrigin(0)
        .setInteractive();
    }
  }

  update() {
    this.input.keyboard.on("keydown", (evento) => {
      console.log("Entraa");
      // volver al juego
      if (evento.key === "4") {
        console.log("Entraaa");
        game.scene.start("GameScene", { team: selectedTeam });
      }
    });
  }
}

export default VistaLateralScene;
