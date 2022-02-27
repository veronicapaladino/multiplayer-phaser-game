var socket;

//Escena inicial del juego...
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  preload() {}

  create() {
    var game = this;
    socket = io();
    var playersQty = 0;
    this.fondoMenu = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setInteractive();

    this.input.mouse.capture = true;

    var selectEquipoLabel = this.add.text(400, 200, "Seleccione el equipo: ", {
      fill: "white",
    });
    var barcoEquipo = this.add
      .image(700, 200, "barco-menu")
      .setScale(0.4)
      .setInteractive({ cursor: "pointer" });

    barcoEquipo.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      //playGame("barco", socket);
      this.scene.start("GameScene");
    });

    var submarinoEquipo = this.add
      .image(800, 200, "submarino-menu")
      .setScale(0.4)
      .setInteractive({ cursor: "pointer" });

    submarinoEquipo.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      // playGame("submarino", socket);
      this.scene.start("GameScene");
    });

    selectEquipoLabel.visible = false;
    submarinoEquipo.visible = false;
    barcoEquipo.visible = false;

    var empezarPartida = this.add.text(600, 100, "Empezar Partida", {
      fill: "white",
      fontSize: "32px",
    });
    empezarPartida.setInteractive({ cursor: "pointer" });

    empezarPartida.on("pointerdown", () => {
      selectEquipoLabel.visible = true;
      submarinoEquipo.visible = true;
      barcoEquipo.visible = true;
      empezarPartida.visible = false;
    });

    var unirsePartida = this.add.text(600, 300, "Unirse Partida", {
      fill: "white",
      fontSize: "32px",
    });
    unirsePartida.setInteractive({ cursor: "pointer" });

    unirsePartida.on("pointerdown", () => {
      console.log("cambiar de escena a: GameScene");
      this.scene.start("GameScene");
    });

    socket.emit("players");
    // preguntamos cuantos jugadores hay
    socket.on("allPlayers", function (players) {
      console.log("players", players);
      playersQty = Object.keys(players).length;
      console.log("playersQty", playersQty);
      // si hay solo un jugador mostramos el crear partida, sino mostramos el unirse
      if (playersQty === 1) {
        unirsePartida.visible = false;
        empezarPartida.visible = true;
      } else {
        unirsePartida.visible = true;
        empezarPartida.visible = false;
      }
    });

    const salir = this.add.text(600, 400, "Salir", {
      fill: "white",
      fontSize: "32px",
    });
    salir.setInteractive({ cursor: "pointer" });

    salir.on("pointerdown", () => {
      console.log("cambiar de escena a: LoginScene");
      this.scene.start("LoginScene");
    });

    function playGame(teamType, socket) {
      socket.emit("newPlayer", { type: teamType });
    }
  }
}

export default MenuScene;
