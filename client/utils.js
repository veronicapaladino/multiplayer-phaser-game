// FUNCIONES AUXILIARES DE GAME SCENE:

function addPlayer(self, playerInfo, selectedTeam) {
  const team = selectedTeam;
  self.barco = self.physics.add
    .image(playerInfo.x, playerInfo.y, team)
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.barco.alive = true;
  self.barco.health = team === "barco" ? 6 : 3;
  self.barco.setCollideWorldBounds(true);
  self.barco.setDrag(1000);
  self.barco.team = selectedTeam;
  self.barco.level = 1;

  if (team === "barco") {
    addCargueros(self);
  }
}

function addOtherPlayers(self, playerInfo, selectedTeam) {
  const team = selectedTeam === "barco" ? "submarino" : "barco";
  const otherPlayer = self.physics.add
    .image(playerInfo.x, playerInfo.y, team)
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50)
    .setRotation(playerInfo.rotation);

  otherPlayer.playerId = playerInfo.playerId;
  otherPlayer.health = team === "barco" ? 6 : 3;
  otherPlayer.alive = true;
  otherPlayer.team = team;
  otherPlayer.level = 1;
  self.otherPlayers.add(otherPlayer);

  if (team === "barco") {
    addCargueros(self);
  }
}

// Encargado de ejecutar la explosión
function overlapEvent_impactoBombaJugador(self, jugador) {
  console.log("Entra overlapEvent_impactoBombaJugador");
  if (jugador.level === 1) {
    boom = self.add.sprite(jugador.x, jugador.y, "explosion");
    boom.anims.play("explode");
    self.sonido_bomba.play();
  }
}

// encargado de cambiar el nivel del submarino y el color
function changePlayerLevel(player, level, selectedTeam) {
  console.log("player", player);
  console.log("selectedTeam", selectedTeam);
  console.log("level", level);
  if (selectedTeam === "barco") {
    player.level = level;
    if (level === 1) player.setTint("Black");
    if (level === 2) {
      player.tintFill = true;
      player.setTint("#0000CC");
    }
    if (level === 3) player.setTint("#FF0000");
  }
}

// encargado de agregar los cargueros
function addCargueros(self) {
  // carguero 1
  self.carguero1 = self.physics.add
    .sprite(30, 30, "carguero")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.carguero1.setDrag(1000);
  self.carguero1.alive = true;
  self.carguero1.setCollideWorldBounds(true);

  // carguero 2
  self.carguero2 = self.physics.add
    .sprite(30, 110, "carguero")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.carguero2.setDrag(1000);
  self.carguero2.alive = true;
  self.carguero2.setCollideWorldBounds(true);

  // carguero 3
  self.carguero3 = self.physics.add
    .sprite(30, 190, "carguero")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.carguero3.setDrag(1000);
  self.carguero3.alive = true;
  self.carguero3.setCollideWorldBounds(true);

  // carguero 4
  self.carguero4 = self.physics.add
    .sprite(30, 270, "carguero")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.carguero4.setDrag(1000);
  self.carguero4.alive = true;
  self.carguero4.setCollideWorldBounds(true);

  // carguero 5
  self.carguero5 = self.physics.add
    .sprite(30, 360, "carguero")
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.carguero5.setDrag(1000);
  self.carguero5.alive = true;
  self.carguero5.setCollideWorldBounds(true);
}

// encargado de ir eliminando cargueros
function destroyCargueros(self, jugador) {
  console.log("Entra destroy cargueros");
  console.log("jugador.health", jugador.health);
  if (jugador.health === 6) self.carguero5.destroy();
  if (jugador.health === 5) self.carguero4.destroy();
  if (jugador.health === 4) self.carguero3.destroy();
  if (jugador.health === 3) self.carguero2.destroy();
  if (jugador.health === 2) self.carguero1.destroy();
}
