var config = {
  type: Phaser.AUTO,
  parent: 'the_silent_war_of_the_atlantic',
  width: 1280,
  height: 600,
  backgroundColor:'black',
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  },
  state: {},
  scene: {
    preload: preloadScene,
    create: createScene,
    update: updateScene
  }
}

var game = new Phaser.Game(config)

// TODO: Fix states

//Creador de estados
game.state.add('EstadoInicio', MiJuego.EstadoInicio);
// juego.state.add('EstadoOpciones', MiJuego.EstadoOpciones);
// juego.state.add('EstadoJugar', MiJuego.EstadoJugar);
game.state.add('EstadoSalir', MiJuego.EstadoSalir);

//Inicio el estado por defecto
game.state.start('EstadoInicio');


var barco;
const velocidadBarco = 100;
const vidaBarco = 4;
const municionInical = 100;
var balas  = [];
var spaceBar;

var mapa;

function preloadScene() {

  this.load.image('car', 'src/assets/car.png');

  this.load.image("barco","src/assets/sprites/ship.png");
  this.load.image("bala","src/assets/sprites/cannonBall.png");

  this.load.tilemapTiledJSON('mapa','src/assets/mapa/mapa.json');
  this.load.image('tiles','src/assets/mapa/tiles_sheet.png');

}

function createScene() 
{
  mapa = this.make.tilemap({
    key: 'mapa'
  });
  var tilesheets = mapa.addTilesetImage('tiles_sheet','tiles');

  var agua =  mapa.createDynamicLayer('agua',tilesheets,0,0);
  var tierra = mapa.createDynamicLayer('tierra',tilesheets,0,0);
 


  var self = this
  this.socket = io()
  this.otherPlayers = this.physics.add.group()

  this.socket.on('currentPlayers', function (players) {
    Object.keys(players).forEach(function (id) {
      if (players[id].playerId === self.socket.id) {
        addPlayer(self, players[id])
      } else {
        addOtherPlayers(self, players[id])
      }
    })
  })

  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo)
  })

  this.socket.on('playerDisconnected', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy()
      }
    })
  })

  this.cursors = this.input.keyboard.createCursorKeys()

  this.socket.on('playerMoved', function (playerInfo) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setRotation(playerInfo.rotation)
        otherPlayer.setPosition(playerInfo.x, playerInfo.y)
      }
    })
  })
}

function addPlayer(self, playerInfo) {
  self.car = self.physics.add.image(playerInfo.x, playerInfo.y, 'barco')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50)

  self.car.setCollideWorldBounds(true)
  self.car.setTint(playerInfo.color)
  self.car.setDrag(1000)
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.physics.add.image(playerInfo.x, playerInfo.y, 'barco')
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50)
    .setRotation(playerInfo.rotation)
    
  otherPlayer.playerId = playerInfo.playerId
  otherPlayer.setTint(playerInfo.color)
  self.otherPlayers.add(otherPlayer)
}

function updateScene() {
  if (this.car) {
    if (this.cursors.left.isDown && (this.cursors.up.isDown || this.cursors.down.isDown)) {
      this.car.setAngularVelocity(-100)
    } else if (this.cursors.right.isDown && (this.cursors.up.isDown || this.cursors.down.isDown)) {
      this.car.setAngularVelocity(100)
    } else {
      this.car.setAngularVelocity(0)
    }

    const velX = Math.cos((this.car.angle - 360) * 0.01745)
    const velY = Math.sin((this.car.angle - 360) * 0.01745)
    if (this.cursors.up.isDown) {
      this.car.setVelocityX(200 * velX)
      this.car.setVelocityY(200 * velY)
    } else if (this.cursors.down.isDown) {
      this.car.setVelocityX(-100 * velX)
      this.car.setVelocityY(-100 * velY)
    } else {
      this.car.setAcceleration(0)
    }

    var x = this.car.x
    var y = this.car.y
    var r = this.car.rotation
    if (this.car.oldPosition && (x !== this.car.oldPosition.x || y !== this.car.oldPosition.y || r !== this.car.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.car.x, y: this.car.y, rotation: this.car.rotation })
    }

    this.car.oldPosition = {
      x: this.car.x,
      y: this.car.y,
      rotation: this.car.rotation
    }
  }
}
