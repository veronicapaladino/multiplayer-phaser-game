//Escena donde se dearrollara la accion/combate del juego
class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init() {}

  preload() {}

  create() {
    var barco;
    const velocidadBarco = 100;
    var game = this;

    //MAPA
    var mapa;
    var cursors;
    var speed = 0;
    var bullets = [];
    var bulletsTime = 0;
    var spaceBar;
    var healText;
    mapa = this.make.tilemap({
      key: "mapa",
    });

    var tilesheets = mapa.addTilesetImage("tiles_sheet", "tiles");

    var agua = mapa.createDynamicLayer("agua", tilesheets, 0, 0);
    var tierra = mapa.createDynamicLayer("tierra", tilesheets, 0, 0);
    //tecla para disparar
    this.keys = this.input.keyboard.createCursorKeys();
    spaceBar = this.keys.space;
    //this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACE]);

    var self = this;
    this.socket = io();

    this.otherPlayers = this.physics.add.group();
    this.otherPlayers.enableBody = true;

    this.socket.on("currentPlayers", function (players) {
      Object.keys(players).forEach(function (id) {
        if (players[id].playerId === self.socket.id) {
          addPlayer(self, players[id]);
        } else {
          addOtherPlayers(self, players[id]);
        }
      });
    });

    this.socket.on("newPlayer", function (playerInfo) {
      addOtherPlayers(self, playerInfo);
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

      //las balas para las cuales no enviaron informacion del servidor
      //seran eliminadas
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
        this.damage(1);

        healthText.setText("\n" + heart.repeat(this.barco.health));

        this.camera.flash(0xff6666, 250);
        this.camera.shake(0.01, 250, true, Phaser.Camera.SHAKE_BOTH, true);
      } else {
        //si la bala impacta en las otras naves

        self.otherPlayers.getChildren().forEach(function (otherPlayer) {
          if (otherPlayer.playerId == id) {
            console.log("otherPlayer", otherPlayer);
            otherPlayer.damage(1);
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
      } else if (
        this.cursors.right.isDown &&
        (this.cursors.up.isDown || this.cursors.down.isDown)
      ) {
        this.barco.setAngularVelocity(100);
      } else {
        this.barco.setAngularVelocity(0);
      }

      const velX = Math.cos((this.barco.angle - 360) * 0.01745);
      const velY = Math.sin((this.barco.angle - 360) * 0.01745);
      if (this.cursors.up.isDown) {
        this.barco.setVelocityX(200 * velX);
        this.barco.setVelocityY(200 * velY);
      } else if (this.cursors.down.isDown) {
        this.barco.setVelocityX(-100 * velX);
        this.barco.setVelocityY(-100 * velY);
      } else {
        this.barco.setAcceleration(0);
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
      }

      //para saber si no estamos disparando
      if (!this.keys.space.isDown) this.barco.shoot = false;

      //enviamos los datos de nuestro movieminto al servidor, si nos estamos movimendo
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
    }
  }
}

export default GameScene;
