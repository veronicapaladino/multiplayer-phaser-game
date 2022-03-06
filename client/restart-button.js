class RestartButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet(
      "button",
      "client/assets/images/restart.png",
      {
        frameWidth: 190,
        frameHeight: 49,
      }
    );
  }

  create() {
    this.startButton = this.relatedScene.add
      .sprite(800, 230, "button")
      .setInteractive({ cursor: "pointer" });

    this.startButton.on("pointerover", () => {
      this.startButton.setFrame(1);
    });
    this.startButton.on("pointerout", () => {
      this.startButton.setFrame(0);
    });
    this.startButton.on("pointerdown", () => {
      this.relatedScene.scene.start("MenuScene");
    });
  }
}
