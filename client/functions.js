//FUNCIONES GAME SCENE:
function addPlayer(self, playerInfo, selectedTeam) {
  self.barco = self.physics.add
    .image(playerInfo.x, playerInfo.y, selectedTeam)
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50);

  self.barco.alive = true;
  self.barco.health = 3;
  self.barco.setCollideWorldBounds(true);
  self.barco.setDrag(1000);
}

function addOtherPlayers(self, playerInfo, selectedTeam) {
  const otherTeam = selectedTeam === "barco" ? "submarino" : "barco";
  const otherPlayer = self.physics.add
    .image(playerInfo.x, playerInfo.y, otherTeam)
    .setOrigin(0.5, 0.5)
    .setDisplaySize(50, 50)
    .setRotation(playerInfo.rotation);

  otherPlayer.playerId = playerInfo.playerId;
  otherPlayer.health = playerInfo.health;
  otherPlayer.alive = true;
  self.otherPlayers.add(otherPlayer);
}
