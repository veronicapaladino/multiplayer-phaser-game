class CongratulationsScene extends Phaser.Scene {
  constructor() {
    super({ key: "CongratulationsScene" });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.restartButton.preload();
  }

  create() {
    this.add.image(410, 250, "background");
    this.restartButton.create();
    this.congratsImage = this.add.image(400, 90, "congratulations");
  }
}

export default CongratulationsScene;
