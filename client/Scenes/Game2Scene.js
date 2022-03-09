var selectedTeam;
var game;
var carguero1;
var carguero2;
var carguero3;
var carguero4;
var carguero5;
var winningZone;
//Escena donde se dearrollara la accion/combate del juego
class Game2Scene extends Phaser.Scene {
  constructor(data) {
    super({ key: "Game2Scene" });
  }

  init(data) {
    this.liveCounter = new LiveCounter(this, 3);
  }

  preload() {}

  create(data) {
    selectedTeam = data.team;
    const win = () => {
      this.scene.start("CongratulationsScene");
    };
    const lose = () => {
      this.scene.start("GameoverScene");
    };
    var barco;
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

    // zona de vitoria
    winningZone = this.add.zone(1600, 820).setSize(200, 200);
    this.physics.world.enable(winningZone);

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

    
    this.socket.emit("cargarPartida");
    self.socket.on("partidaCargada", function (id){
      console.log("id",id);

      self.socket.emit("obtenerjugador",[id,selectedTeam]);
    });

    self.socket.on("jugadorObtenido", function (jugador){
      console.log("jugador",jugador);
      self.barco.x=jugador.coordenadaX;
      self.barco.y=jugador.coordenadaY;
      self.barco.health=jugador.vida;
      
      console.log("jugador1",self.barco);
      if (selectedTeam === "barco"){
        self.barco._rotation=jugador.Rotacion
        game.carguero1.x=self.barco.x-60;
        game.carguero1.y=self.barco.y-120;
        game.carguero2.x=self.barco.x-60;
        game.carguero2.y=self.barco.y-40;
        game.carguero3.x=self.barco.x-60;
        game.carguero3.y=self.barco.y+40;
        game.carguero4.x=self.barco.x-60;
        game.carguero4.y=self.barco.y+120;
        game.carguero5.x=self.barco.x-60;
        game.carguero5.y=self.barco.y+210;
        game.carguero1._rotation=self.barco.rotation;
        game.carguero2._rotation=self.barco.rotation;
        game.carguero3._rotation=self.barco.rotation;
        game.carguero4._rotation=self.barco.rotation;
        game.carguero5._rotation=self.barco.rotation;
      }
      else {
        self.barco._rotation=-jugador.Rotacion
        game.barco.level=jugador.Profundidad;
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        game.carguero1.x=otherPlayer.x-60;
        game.carguero1.y=otherPlayer.y-120;
        game.carguero2.x=otherPlayer.x-60;
        game.carguero2.y=otherPlayer.y-40;
        game.carguero3.x=otherPlayer.x-60;
        game.carguero3.y=otherPlayer.y+40;
        game.carguero4.x=otherPlayer.x-60;
        game.carguero4.y=otherPlayer.y+120;
        game.carguero5.x=otherPlayer.x-60;
        game.carguero5.y=otherPlayer.y+210;
        game.carguero1._rotation=otherPlayer.rotation;
        game.carguero2._rotation=otherPlayer.rotation;
        game.carguero3._rotation=otherPlayer.rotation;
        game.carguero4._rotation=otherPlayer.rotation;
        game.carguero5._rotation=otherPlayer.rotation;
        });
      }
    });





    var guardar = this.add
      .image(800, 20, "guardar")
      .setScale(1)
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
          self.barco.health,
          self.barco.level,
          self.barco._rotation,
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
              otherPlayer.health,
              otherPlayer.level,
              self.barco._rotation,
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

    /*     this.socket.on("playerDeleted", function (playerInfo) {
      this.socket.emit("partidaTerminada");
    }); */

    this.socket.on("carguero1Moved", function (playerInfo) {
      game.carguero1.setRotation(playerInfo.rotation);
      game.carguero1.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero1Deleted", function (carguero) {
      game.carguero1.alive = false;
      game.carguero1.destroy();
    });

    this.socket.on("carguero2Moved", function (playerInfo) {
      game.carguero2.setRotation(playerInfo.rotation);
      game.carguero2.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero2Deleted", function (carguero) {
      game.carguero2.alive = false;
      game.carguero2.destroy();
    });

    this.socket.on("carguero3Moved", function (playerInfo) {
      game.carguero3.setRotation(playerInfo.rotation);
      game.carguero3.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero3Deleted", function (carguero) {
      game.carguero3.alive = false;
      game.carguero3.destroy();
    });

    this.socket.on("carguero4Moved", function (playerInfo) {
      game.carguero4.setRotation(playerInfo.rotation);
      game.carguero4.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero4Deleted", function (carguero) {
      game.carguero4.alive = false;
      game.carguero4.destroy();
    });

    this.socket.on("carguero5Moved", function (playerInfo) {
      game.carguero5.setRotation(playerInfo.rotation);
      game.carguero5.setPosition(playerInfo.x, playerInfo.y);
    });

    this.socket.on("carguero5Deleted", function (carguero) {
      game.carguero5.alive = false;
      game.carguero5.destroy();
    });

    // le avisamos a el otro usuario que el submarino cambió de nivel
    this.socket.on("submarinoLevel", function (level) {
      self.otherPlayers.getChildren().forEach(function (otherPlayer) {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.level = level;
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
        overlapEvent_impactoBombaJugador(self, self.barco);
        if (self.barco.health === 0) {
          self.barco.alive = false;
          self.barco.destroy();
          this.socket.emit("partidaTerminada");
        }
      } else {
        //si la bala impacta en las otras naves
        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (otherPlayer.playerId == id) {
            overlapEvent_impactoBombaJugador(self, otherPlayer);
            if (otherPlayer.health === 0) {
              otherPlayer.alive = false;
              otherPlayer.destroy();
              self.socket.emit("partidaTerminada");
            }
          }
        });
      }
    });

    this.socket.on("ganarPartida", function () {
      win();
    });
    this.socket.on("perderPartida", function () {
      lose();
    });
  }

  update() {
    var game = this;
    if (this.barco) {
      //teclas de movimiento de rotacion, teclas para avanzar, si somos barco tambien movemos los cargueros que van atrás
      if (
        this.cursors.left.isDown &&
        (this.cursors.up.isDown || this.cursors.down.isDown)
      ) {
        this.barco.setAngularVelocity(-100);
        if (selectedTeam === "barco") {
          if (this.carguero1.alive) this.carguero1.setAngularVelocity(-100);
          if (this.carguero2.alive) this.carguero2.setAngularVelocity(-100);
          if (this.carguero3.alive) this.carguero3.setAngularVelocity(-100);
          if (this.carguero4.alive) this.carguero4.setAngularVelocity(-100);
          if (this.carguero5.alive) this.carguero5.setAngularVelocity(-100);
        }
      } else if (
        this.cursors.right.isDown &&
        (this.cursors.up.isDown || this.cursors.down.isDown)
      ) {
        this.barco.setAngularVelocity(100);
        if (selectedTeam === "barco") {
          if (this.carguero1.alive) this.carguero1.setAngularVelocity(100);
          if (this.carguero2.alive) this.carguero2.setAngularVelocity(100);
          if (this.carguero3.alive) this.carguero3.setAngularVelocity(100);
          if (this.carguero4.alive) this.carguero4.setAngularVelocity(100);
          if (this.carguero5.alive) this.carguero5.setAngularVelocity(100);
        }
      } else {
        this.barco.setAngularVelocity(0);
        if (selectedTeam === "barco") {
          if (this.carguero1.alive) this.carguero1.setAngularVelocity(0);
          if (this.carguero2.alive) this.carguero2.setAngularVelocity(0);
          if (this.carguero3.alive) this.carguero3.setAngularVelocity(0);
          if (this.carguero4.alive) this.carguero4.setAngularVelocity(0);
          if (this.carguero5.alive) this.carguero5.setAngularVelocity(0);
        }
      }

      const velX = Math.cos((this.barco.angle - 360) * 0.01745);
      const velY = Math.sin((this.barco.angle - 360) * 0.01745);

      if (this.cursors.up.isDown) {
        this.barco.setVelocityX(200 * velX);
        this.barco.setVelocityY(200 * velY);

        if (selectedTeam === "barco") {
          if (this.carguero1.alive) {
            const velXCarguero1 = Math.cos(
              (this.carguero1.angle - 360) * 0.01745
            );
            const velYCarguero1 = Math.sin(
              (this.carguero1.angle - 360) * 0.01745
            );
            this.carguero1.setVelocityX(200 * velXCarguero1);
            this.carguero1.setVelocityY(200 * velYCarguero1);
          }
          if (this.carguero2.alive) {
            const velXCarguero2 = Math.cos(
              (this.carguero2.angle - 360) * 0.01745
            );
            const velYCarguero2 = Math.sin(
              (this.carguero2.angle - 360) * 0.01745
            );
            this.carguero2.setVelocityX(200 * velXCarguero2);
            this.carguero2.setVelocityY(200 * velYCarguero2);
          }

          if (this.carguero3.alive) {
            const velXCarguero3 = Math.cos(
              (this.carguero3.angle - 360) * 0.01745
            );
            const velYCarguero3 = Math.sin(
              (this.carguero3.angle - 360) * 0.01745
            );
            this.carguero3.setVelocityX(200 * velXCarguero3);
            this.carguero3.setVelocityY(200 * velYCarguero3);
          }

          if (this.carguero4.alive) {
            const velXCarguero4 = Math.cos(
              (this.carguero4.angle - 360) * 0.01745
            );
            const velYCarguero4 = Math.sin(
              (this.carguero4.angle - 360) * 0.01745
            );
            this.carguero4.setVelocityX(200 * velXCarguero4);
            this.carguero4.setVelocityY(200 * velYCarguero4);
          }

          if (this.carguero5.alive) {
            const velXCarguero5 = Math.cos(
              (this.carguero5.angle - 360) * 0.01745
            );
            const velYCarguero5 = Math.sin(
              (this.carguero5.angle - 360) * 0.01745
            );
            this.carguero5.setVelocityX(200 * velXCarguero5);
            this.carguero5.setVelocityY(200 * velYCarguero5);
          }
        }
      } else if (this.cursors.down.isDown) {
        this.barco.setVelocityX(-100 * velX);
        this.barco.setVelocityY(-100 * velY);

        if (selectedTeam === "barco") {
          if (this.carguero1.alive) {
            this.carguero1.setVelocityX(-100 * velXCarguero1);
            this.carguero1.setVelocityY(-100 * velYCarguero1);
          }

          if (this.carguero2.alive) {
            this.carguero2.setVelocityX(-100 * velXCarguero2);
            this.carguero2.setVelocityY(-100 * velYCarguero2);
          }

          if (this.carguero3.alive) {
            this.carguero3.setVelocityX(-100 * velXCarguero3);
            this.carguero3.setVelocityY(-100 * velYCarguero3);
          }

          if (this.carguero4.alive) {
            this.carguero4.setVelocityX(-100 * velXCarguero4);
            this.carguero4.setVelocityY(-100 * velYCarguero4);
          }

          if (this.carguero5.alive) {
            this.carguero5.setVelocityX(-100 * velXCarguero5);
            this.carguero5.setVelocityY(-100 * velYCarguero5);
          }
        }
      } else {
        this.barco.setAcceleration(0);
        if (selectedTeam === "barco") {
          if (this.carguero1.alive) this.carguero1.setAcceleration(0);
          if (this.carguero2.alive) this.carguero2.setAcceleration(0);
          if (this.carguero3.alive) this.carguero3.setAcceleration(0);
          if (this.carguero4.alive) this.carguero4.setAcceleration(0);
          if (this.carguero5.alive) this.carguero5.setAcceleration(0);
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

      if (this.carguero1.alive) {
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
      }

      if (this.carguero2.alive) {
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
      }

      if (this.carguero3.alive) {
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
      }

      if (this.carguero4.alive) {
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
      }

      if (this.carguero5.alive) {
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
      }

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

        if (!this.carguero5.alive) {
          this.socket.emit("carguero5Delete", {});
        } else {
          console.log("Entra a borrar carguero 4");
          if (!this.carguero4.alive) {
            console.log("Entra a borrar carguero 2");
            this.socket.emit("carguero4Delete", {});
          } else {
            if (!this.carguero3.alive) {
              this.socket.emit("carguero3Delete", {});
            } else {
              if (!this.carguero2.alive) {
                this.socket.emit("carguero2Delete", {});
              } else {
                if (!this.carguero1.alive) {
                  this.socket.emit("carguero1Delete", {});
                }
              }
            }
          }
        }
      }

      /*       if (!this.barco.level === 1) {
        this.socket.emit("carguero5Delete", {});
      } else {
        console.log("Entra a borrar carguero 4");
        if (!this.carguero4.alive) {
          console.log("Entra a borrar carguero 2");
          this.socket.emit("carguero4Delete", {});
        } else {
          if (!this.carguero3.alive) {
            this.socket.emit("carguero3Delete", {});
          } else {
            if (!this.carguero2.alive) {
              this.socket.emit("carguero2Delete", {});
            } else {
              if (!this.carguero1.alive) {
                this.socket.emit("carguero1Delete", {});
              }
            }
          }
        }
      }
    } */

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

      // condición de ganar partida para el barco al llegar a la isla
      game.physics.add.overlap(
        this.barco,
        winningZone,
        () => {
          this.socket.emit("partidaTerminada");
        },
        null,
        self
      );
    }
  }
}

export default Game2Scene;
