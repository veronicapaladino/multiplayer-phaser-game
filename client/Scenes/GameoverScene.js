class GameoverScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameoverScene" });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.restartButton.preload();
  }

  create() {
    this.fondoMenu = this.add
      .image(0, 0, "background")
      .setOrigin(0)
      .setInteractive();
    this.sonido_fondo = this.sound.add("fondo_menu", {
      loop: true,
      volume: 0.2,
    });
    this.sonido_click = this.sound.add("click", { loop: true });

    this.fondoMenu.on(Phaser.Input.Events.POINTER_DOWN, () => {
      this.sonido_fondo.play();
    });
    this.restartButton.create();
    this.gameoverImage = this.add.image(800, 90, "gameover");
  }
}

export default GameoverScene;
