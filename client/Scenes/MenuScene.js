//Escena inicial del juego...
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {}

  create() {
    var self = this;
    this.socket = io();
    var playersQty = 0;
    this.fondoMenu = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setInteractive();

    this.input.mouse.capture = true;

    var empezarPartida = this.add.text(600, 100, "Empezar Partida", {
      fill: "white",
      fontSize: "32px",
    });
    empezarPartida.setInteractive();

    empezarPartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });

    var unirsePartida = this.add.text(600, 200, "Unirse Partida", {
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

    /*     this.socket.on("currentPlayers", function (players) {
      console.log("players", players);
      playersQty = Object.keys(players).length;
      console.log("playersQty", playersQty);
      if (playersQty === 1) {
        unirsePartida.visible = false;
        empezarPartida.visible = true;
      } else {
        unirsePartida.visible = true;
        empezarPartida.visible = false;
      }
    }); */
  }
}

export default MenuScene;
