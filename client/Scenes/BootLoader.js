// escena encargada de cargar los assets

class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "BootLoader" });
  }

  preload() {
    // IMAGES
    this.load.image("barco", "client/assets/images/game/ship.png");
    this.load.image(
      "barco-lateral",
      "client/assets/images/game/barco-lateral.png"
    );
    this.load.image("barco-aereo", "client/assets/images/game/barco-aereo.png");
    this.load.image("submarino", "client/assets/images/game/submarino.png");
    this.load.image("tiles", "client/assets/mapa/tiles_sheet.png");
    this.load.image("carguero", "client/assets/images/game/carguero.png");
    this.load.image("background", "client/assets/images/water.jpg");
    this.load.image("bullet", "client/assets/sprites/bullet.png");
    this.load.image("torpedo", "client/assets/sprites/torpedo.png");
    this.load.image("barco-menu", "client/assets/images/menu/barco.png");
    this.load.image(
      "submarino-menu",
      "client/assets/images/menu/submarino.png"
    );
    this.load.image(
      "loginButton",
      "client/assets/images/login/loginButton.png"
    );
    this.load.image("gameover", "client/assets/images/gameover.png");
    this.load.image(
      "congratulations",
      "client/assets/images/congratulations.png"
    );

    // TILEMAP
    this.load.tilemapTiledJSON("mapa", "client/assets/mapa/mapa.json");

    // PLUGINS
    var url;
    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js";
    this.load.plugin("rexui", url, true);

    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js";
    this.load.plugin("rexbbcodetextplugin", url, true);

    url =
      "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js";
    this.load.plugin("rextexteditplugin", url, true);

    // AUDIO
    this.load.audio("fondo_menu", "client/assets/audio/fondo_menu.wav");
    this.load.audio("click", "client/assets/audio/click.wav");
    this.load.audio("gameoversample", "client/assets/audio/gameover.ogg");
    this.load.audio("livelostsample", "client/assets/audio/live-lost.ogg");
    this.load.audio("startgamesample", "client/assets/audio/start-game.ogg");
    this.load.audio("winsample", "client/assets/audio/you_win.ogg");

    // ANIMACIONES
    this.load.atlas(
      "explotion",
      "client/assets/animaciones/explosion.png",
      "client/assets/animaciones/explosion_atlas.json",
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );
  }

  create() {
    this.scene.start("LoginScene");
  }
}

export default Bootloader;
