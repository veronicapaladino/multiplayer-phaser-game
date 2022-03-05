var selectedTeam;
//Escena donde se dearrollara la accion/combate del juego
class GameScene extends Phaser.Scene {
  constructor(data) {
    super({ key: "GameScene" });
  }

  init(data) {
    this.liveCounter = new LiveCounter(this, 3);
  }

  preload() {}

  create(data) {
    selectedTeam = data.team;

    var barco;
    var carguero1;
    var carguero2;
    var carguero3;
    var carguero4;
    var carguero5;
    var game = this;
    var self = this;
    this.socket = io.connect();
    var mapa;
    var explotar;
    var cursors;
    var speed = 0;
    var bullets = [];
    var spaceBar;
    var healText;
    mapa = this.make.tilemap({
      key: "mapa",
    });

    var tilesheets = mapa.addTilesetImage("tiles_sheet", "tiles");
    this.gameOverSample = this.sound.add("gameoversample");
    this.winSample = this.sound.add("winsample");
    this.startGameSample = this.sound.add("startgamesample");
    this.liveLostSample = this.sound.add("livelostsample");
    this.sonido_bomba = this.sound.add("explode-sound", {
      loop: false,
      volume: 0.2,
    });
    var agua = mapa.createLayer("agua", tilesheets, 0, 0);
    var tierra = mapa.createLayer("tierra", tilesheets, 0, 0);
    this.physics.world.setBounds(0, 0, 1600, 850);
    //tecla para disparar
    this.keys = this.input.keyboard.createCursorKeys();
    spaceBar = this.keys.space;

    this.otherPlayers = this.physics.add.group();
    // se crea la animación de explosión
    this.otherPlayers.enableBody = true;
    explotar = {
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        start: 0,
        end: 23,
        first: 23,
      }),
      frameRate: 20,
    };
    this.anims.create(explotar);

    var guardar = this.add
      .image(410, 250, "guardar")
      .setScale(0.4)
      .setInteractive({ cursor: "pointer" });

    guardar.on("pointerdown", () => {
      console.log("al hacer click guardamos partida");
      this.socket.emit("creoPartida");
      self.socket.on("partidaCreada", function (idPartida) {
        console.log("jugador: ", self.barco);
        console.log("idPartida: ", idPartida);
        self.socket.emit("crearJugador", [
          self.socket.id,
          idPartida,
          self.barco.team,
          self.barco.x,
          self.barco.y,
        ]);
        self.socket.on("jugadorCreado", function (status) {
          self.otherPlayers.getChildren().forEach(function (otherPlayer) {
            console.log("jugador2:", otherPlayer);
            self.socket.emit("crearJugador2", [
              otherPlayer.playerId,
              idPartida,
              otherPlayer.team,
              otherPlayer.x,
              otherPlayer.y,
            ]);
          });
        });
      });

      //this.scene.start("GameScene", { team: "barco" });
    });

    /*     this.hearts = this.add.group();

    this.hearts.createMultiple({
      key: "ui-heart-full",
      setXY: {
        x: 10,
        y: 10,
        stepX: 16,
      },
      quantity: 3,
    }); */

    this.socket.on("currentPlayers", function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === self.socket.id) {
          // self.socket.emit("creoPartida");
          //self.socket.on("partidaCreada", function (idPartida) {
          /* self.socket.emit("crearJugador", [
            players[id].playerId,
            idPartida,
            selectedTeam,
          ]); */
          addPlayer(self, players[id], selectedTeam);
          // });
        } else {
          addOtherPlayers(self, players[id], selectedTeam);
        }
      });
    });

    this.socket.on("newPlayer", function (playerInfo) {
      addOtherPlayers(self, playerInfo, selectedTeam);
    });

    this.socket.on("playerDisconnected", function (playerId) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.socket.on("playerMoved", function (playerInfo) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setRotation(playerInfo.rotation);
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    this.socket.on("carguero1Moved", function (playerInfo) {
      carguero1.setRotation(playerInfo.rotation);
      carguero1.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero2Moved", function (playerInfo) {
      carguero2.setRotation(playerInfo.rotation);
      carguero2.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero3Moved", function (playerInfo) {
      carguero3.setRotation(playerInfo.rotation);
      carguero3.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero4Moved", function (playerInfo) {
      carguero4.setRotation(playerInfo.rotation);
      carguero4.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero5Moved", function (playerInfo) {
      carguero5.setRotation(playerInfo.rotation);
      carguero5.setPosition(playerInfo.x, playerInfo.y);
    });

    // le avisamos a el otro usuario que el submarino cambió de nivel
    this.socket.on("submarinoLevel", function (nivel) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.nivel = nivel;
        }
      });
    });

    //recibimos los datos de las balas
    this.socket.on("bulletsUpdate", function (bulletsInfo) {
      for (var i = 0; i < bulletsInfo.length; i++) {
        var bullet = bulletsInfo[i];
        //agregamos una nueva bala o actualizamos sus datos
        if (bullets[i] === undefined) {
          //creamos la bala
          bullets[i] = game.add.sprite(bullet.x, bullet.y, "bullet");
          bullets[i].rotation = bullet.rotation;
        } else {
          //actulizamos los datos de la bala
          bullets[i].x = bullet.x;
          bullets[i].y = bullet.y;
        }
      }

      // las balas para las cuales no enviaron informacion del servidor seran eliminadas
      for (var i = bulletsInfo.length; i < bullets.length; i++) {
        bullets[i].destroy();
        bullets.splice(i, 1);
        i--;
      }
    });

    //recibimos el evento del impacto de la bala en un jugador
    this.socket.on("playerHit", function (id) {
      //si la bala impacta en nuestra nave
      if (id === self.socket.id) {
        console.log("Entra 1");
        overlapEvent_impactoBombaJugador(self, self.barco);
      } else {
        //si la bala impacta en las otras naves

        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (otherPlayer.playerId == id) {
            console.log("otherPlayer", otherPlayer);
            otherPlayer.health = otherPlayer.health - 1;
            console.log("Entra 2");
            overlapEvent_impactoBombaJugador(self, otherPlayer);
          }
        });
      }
    });
  }

  update() {
    if (this.barco) {
      //teclas de movimiento de rotacion, teclas para avanzar
      if (
        this.cursors.left.isDown &&
        (this.cursors.up.isDown || this.cursors.down.isDown)
      ) {
        this.barco.setAngularVelocity(-100);
        if (selectedTeam === "barco") {
          this.carguero1.setAngularVelocity(-100);
          this.carguero2.setAngularVelocity(-100);
          this.carguero3.setAngularVelocity(-100);
          this.carguero4.setAngularVelocity(-100);
          this.carguero5.setAngularVelocity(-100);
        }
      } else if (
        this.cursors.right.isDown &&
        (this.cursors.up.isDown || this.cursors.down.isDown)
      ) {
        this.barco.setAngularVelocity(100);
        if (selectedTeam === "barco") {
          this.carguero1.setAngularVelocity(100);
          this.carguero2.setAngularVelocity(100);
          this.carguero3.setAngularVelocity(100);
          this.carguero4.setAngularVelocity(100);
          this.carguero5.setAngularVelocity(100);
        }
      } else {
        this.barco.setAngularVelocity(0);
        if (selectedTeam === "barco") {
          this.carguero1.setAngularVelocity(0);
          this.carguero2.setAngularVelocity(0);
          this.carguero3.setAngularVelocity(0);
          this.carguero4.setAngularVelocity(0);
          this.carguero5.setAngularVelocity(0);
        }
      }

      const velX = Math.cos((this.barco.angle - 360) * 0.01745);
      const velY = Math.sin((this.barco.angle - 360) * 0.01745);
      const velXCarguero1 = Math.cos((this.carguero1.angle - 360) * 0.01745);
      const velYCarguero1 = Math.sin((this.carguero1.angle - 360) * 0.01745);
      const velXCarguero2 = Math.cos((this.carguero2.angle - 360) * 0.01745);
      const velYCarguero2 = Math.sin((this.carguero2.angle - 360) * 0.01745);
      const velXCarguero3 = Math.cos((this.carguero3.angle - 360) * 0.01745);
      const velYCarguero3 = Math.sin((this.carguero3.angle - 360) * 0.01745);
      const velXCarguero4 = Math.cos((this.carguero4.angle - 360) * 0.01745);
      const velYCarguero4 = Math.sin((this.carguero4.angle - 360) * 0.01745);
      const velXCarguero5 = Math.cos((this.carguero5.angle - 360) * 0.01745);
      const velYCarguero5 = Math.sin((this.carguero5.angle - 360) * 0.01745);

      if (this.cursors.up.isDown) {
        this.barco.setVelocityX(200 * velX);
        this.barco.setVelocityY(200 * velY);

        if (selectedTeam === "barco") {
          this.carguero1.setVelocityX(200 * velXCarguero1);
          this.carguero1.setVelocityY(200 * velYCarguero1);

          this.carguero2.setVelocityX(200 * velXCarguero2);
          this.carguero2.setVelocityY(200 * velYCarguero2);

          this.carguero3.setVelocityX(200 * velXCarguero3);
          this.carguero3.setVelocityY(200 * velYCarguero3);

          this.carguero4.setVelocityX(200 * velXCarguero4);
          this.carguero4.setVelocityY(200 * velYCarguero4);

          this.carguero5.setVelocityX(200 * velXCarguero5);
          this.carguero5.setVelocityY(200 * velYCarguero5);
        }
      } else if (this.cursors.down.isDown) {
        this.barco.setVelocityX(-100 * velX);
        this.barco.setVelocityY(-100 * velY);

        if (selectedTeam === "barco") {
          this.carguero1.setVelocityX(-100 * velXCarguero1);
          this.carguero1.setVelocityY(-100 * velYCarguero1);

          this.carguero2.setVelocityX(-100 * velXCarguero2);
          this.carguero2.setVelocityY(-100 * velYCarguero2);

          this.carguero3.setVelocityX(-100 * velXCarguero3);
          this.carguero3.setVelocityY(-100 * velYCarguero3);

          this.carguero4.setVelocityX(-100 * velXCarguero4);
          this.carguero4.setVelocityY(-100 * velYCarguero4);

          this.carguero5.setVelocityX(-100 * velXCarguero5);
          this.carguero5.setVelocityY(-100 * velYCarguero5);
        }
      } else {
        this.barco.setAcceleration(0);
        if (selectedTeam === "barco") {
          this.carguero1.setAcceleration(0);
          this.carguero2.setAcceleration(0);
          this.carguero3.setAcceleration(0);
          this.carguero4.setAcceleration(0);
          this.carguero5.setAcceleration(0);
        }
      }

      // enviamos los datos de nuestro movieminto al servidor, si nos estamos movimendo
      var x = this.barco.x;
      var y = this.barco.y;
      var r = this.barco.rotation;
      if (
        this.barco.oldPosition &&
        (x !== this.barco.oldPosition.x ||
          y !== this.barco.oldPosition.y ||
          r !== this.barco.oldPosition.rotation)
      ) {
        this.socket.emit("playerMovement", {
          x: this.barco.x,
          y: this.barco.y,
          rotation: this.barco.rotation,
        });
      }

      this.barco.oldPosition = {
        x: this.barco.x,
        y: this.barco.y,
        rotation: this.barco.rotation,
      };

      // if (selectedTeam === "barco") {
      var xCarguero1 = this.carguero1.x;
      var yCarguero1 = this.carguero1.y;
      var rCarguero1 = this.carguero1.rotation;
      if (
        this.carguero1.oldPosition &&
        (xCarguero1 !== this.carguero1.oldPosition.x ||
          yCarguero1 !== this.carguero1.oldPosition.y ||
          rCarguero1 !== this.carguero1.oldPosition.rotation)
      ) {
        this.socket.emit("carguero1Movement", {
          x: this.carguero1.x,
          y: this.carguero1.y,
          rotation: this.carguero1.rotation,
        });
      }

      this.carguero1.oldPosition = {
        x: this.carguero1.x,
        y: this.carguero1.y,
        rotation: this.carguero1.rotation,
      };

      var xCarguero2 = this.carguero2.x;
      var yCarguero2 = this.carguero2.y;
      var rCarguero2 = this.carguero2.rotation;
      if (
        this.carguero2.oldPosition &&
        (xCarguero2 !== this.carguero2.oldPosition.x ||
          yCarguero2 !== this.carguero2.oldPosition.y ||
          rCarguero2 !== this.carguero2.oldPosition.rotation)
      ) {
        this.socket.emit("carguero2Movement", {
          x: this.carguero2.x,
          y: this.carguero2.y,
          rotation: this.carguero2.rotation,
        });
      }

      this.carguero2.oldPosition = {
        x: this.carguero2.x,
        y: this.carguero2.y,
        rotation: this.carguero2.rotation,
      };

      var xCarguero3 = this.carguero3.x;
      var yCarguero3 = this.carguero3.y;
      var rCarguero3 = this.carguero3.rotation;
      if (
        this.carguero3.oldPosition &&
        (xCarguero3 !== this.carguero3.oldPosition.x ||
          yCarguero3 !== this.carguero3.oldPosition.y ||
          rCarguero3 !== this.carguero3.oldPosition.rotation)
      ) {
        this.socket.emit("carguero3Movement", {
          x: this.carguero3.x,
          y: this.carguero3.y,
          rotation: this.carguero3.rotation,
        });
      }

      this.carguero3.oldPosition = {
        x: this.carguero3.x,
        y: this.carguero3.y,
        rotation: this.carguero3.rotation,
      };

      var xCarguero4 = this.carguero4.x;
      var yCarguero4 = this.carguero4.y;
      var rCarguero4 = this.carguero4.rotation;
      if (
        this.carguero4.oldPosition &&
        (xCarguero4 !== this.carguero4.oldPosition.x ||
          yCarguero4 !== this.carguero4.oldPosition.y ||
          rCarguero4 !== this.carguero4.oldPosition.rotation)
      ) {
        this.socket.emit("carguero4Movement", {
          x: this.carguero4.x,
          y: this.carguero4.y,
          rotation: this.carguero4.rotation,
        });
      }

      this.carguero4.oldPosition = {
        x: this.carguero4.x,
        y: this.carguero4.y,
        rotation: this.carguero4.rotation,
      };

      var xCarguero5 = this.carguero5.x;
      var yCarguero5 = this.carguero5.y;
      var rCarguero5 = this.carguero5.rotation;
      if (
        this.carguero5.oldPosition &&
        (xCarguero5 !== this.carguero5.oldPosition.x ||
          yCarguero5 !== this.carguero5.oldPosition.y ||
          rCarguero5 !== this.carguero5.oldPosition.rotation)
      ) {
        this.socket.emit("carguero5Movement", {
          x: this.carguero5.x,
          y: this.carguero5.y,
          rotation: this.carguero5.rotation,
        });
      }

      this.carguero5.oldPosition = {
        x: this.carguero5.x,
        y: this.carguero5.y,
        rotation: this.carguero5.rotation,
      };
      //     }

      //tecla para disparar
      if (this.keys.space.isDown && !this.barco.shoot) {
        // this.bullets.length < 4
        //velocidad del movimiento de la bala
        var speed_x = Math.cos(this.barco.rotation) * 10;
        var speed_y = Math.sin(this.barco.rotation) * 10;

        //bandera para saber si estamos disparando
        this.barco.shoot = true;

        //emitimos el evento del disparo al servidor
        this.socket.emit("shootBullet", {
          x: this.barco.x,
          y: this.barco.y,
          rotation: this.barco.rotation,
          speed_x: speed_x,
          speed_y: speed_y,
        });
      }

      // Estos chequeos son para cuando el barco toca uno de los bordes de la pantalla
      if (this.barco.body.onWall()) {
        this.barco.body.setVelocity(0, 0);
      }
      if (this.barco.body.onFloor()) {
        this.barco.body.setVelocity(0, 0);
      }
      if (this.barco.body.onCeiling()) {
        this.barco.body.setVelocity(0, 0);
      }

      //para saber si no estamos disparando
      if (!this.keys.space.isDown) this.barco.shoot = false;

      this.input.keyboard.on("keydown", (evento) => {
        if (evento.key === "1") {
          changePlayerLevel(this.barco, 1, selectedTeam);
        }
        if (evento.key === "2") {
          changePlayerLevel(this.barco, 2, selectedTeam);
        }
        if (evento.key === "3") {
          changePlayerLevel(this.barco, 3, selectedTeam);
        }
        // vista lateral
        if (evento.key === "4")
          this.scene.start("VistaLateralScene", { team: selectedTeam });
      });
    }
  }

  endGame(completed = false) {
    if (!completed) {
      this.gameOverSample.play();
      this.scene.start("GameoverScene");
    } else {
      this.scene.start("CongratulationsScene");
    }
  }
}

export default GameScene;
