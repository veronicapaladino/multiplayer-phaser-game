// escena encargada de cargar los assets

class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "BootLoader" });
  }

  preload() {
    // IMAGES
    this.load.image("barco", "client/assets/sprites/ship.png");
    this.load.image("bala", "client/assets/sprites/cannonBall.png");

    this.load.tilemapTiledJSON("mapa", "client/assets/mapa/mapa.json");
    this.load.image("tiles", "client/assets/mapa/tiles_sheet.png");

    this.load.image("background", "client/assets/images/water.jpg");

    this.load.image(
      "loginButton",
      "client/assets/images/login/loginButton.png"
    );
    this.load.image("background", "client/assets/images/water.jpg");

    // PLUGINS
    var url;
    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js";
    this.load.plugin("rexui", url, true);

    this.load.image(
      "loginButton",
      "client/assets/images/login/loginButton.png"
    );

    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js";
    this.load.plugin("rexbbcodetextplugin", url, true);

    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js";
    this.load.plugin("rextexteditplugin", url, true);

    // AUDIO
    this.load.audio("fondo_menu", "client/assets/audio/fondo_menu.wav");
    this.load.audio("click", "client/assets/audio/click.wav");
  }
  create() {
    this.scene.start("LoginScene");
  }
}

export default Bootloader;
