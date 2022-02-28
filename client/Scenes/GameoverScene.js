class GameoverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameoverScene" });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.restartButton.preload();
  }

  create() {
    this.add.image(410, 250, "background");
    this.restartButton.create();
    this.gameoverImage = this.add.image(400, 90, "gameover");
  }
}

export default GameoverScene;
