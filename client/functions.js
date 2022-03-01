// FUNCIONES GAME SCENE:
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
}

// Encargado de ejecutar la explosión
function overlapEvent_impactoBombaJugador(self, jugador) {
  if (jugador.level === 1) {
    boom = self.add.sprite(jugador.x, jugador.y, "explosion");
    boom.anims.play("explode");
    self.sonido_bomba.play();
  }
}

// encargado de cambiar el nivel del submarino y el color
function changePlayerLevel(player, level, selectedTeam) {
  console.log("changePlayerLevel");
  console.log("selectedTeam", selectedTeam);
  console.log("level", level);
  if (selectedTeam === "submarino") {
    player.level = level;
    if (level === 1) player.setTint("Black");
    if (level === 2) player.setTint("#0000CC");
    if (level === 3) player.setTint("#FF0000");
  }
}
