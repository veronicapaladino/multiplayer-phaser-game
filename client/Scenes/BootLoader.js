// escena encargada de cargar los assets
class Bootloader extends Phaser.Scene {
  constructor() {
    super({ key: "BootLoader" });
  }

  preload() {
    // IMAGES
    this.load.image("guardar", "client/assets/images/botonGuardar.png");
    this.load.image("barco", "client/assets/images/game/ship.png");
    this.load.image(
      "barco-lateral",
      "client/assets/images/game/barco-lateral.png"
    );
    this.load.image(
      "ui-heart-empty",
      "client/assets/images/game/ui_heart_empty.png"
    );
    this.load.image(
      "ui-heart-full",
      "client/assets/images/game/ui_heart_full.png"
    );
    this.load.image("barco-aereo", "client/assets/images/game/barco-aereo.png");
    this.load.image("submarino", "client/assets/images/game/submarino.png");
    this.load.image(
      "submarino-lateral",
      "client/assets/images/game/submarino-lateral.png"
    );
    this.load.image(
      "submarino-nivel-2",
      "client/assets/images/game/submarino-nivel-2.png"
    );
    this.load.image(
      "submarino-nivel-3",
      "client/assets/images/game/submarino-nivel-3.png"
    );
    this.load.image("tiles", "client/assets/mapa/tiles_sheet.png");
    this.load.image("carguero", "client/assets/images/game/carguero.png");
    this.load.image("background", "client/assets/images/water.jpg");
    this.load.image("oceano", "client/assets/images/oceano.jpeg");
    this.load.image("water-lateral", "client/assets/images/water-lateral.webp");
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
    this.load.audio("explode-sound", "client/assets/audio/explosion.mp3");

    // ANIMACIONES
    this.load.atlas(
      "explotion",
      "client/assets/animaciones/explosion.png",
      "client/assets/animaciones/explosion_atlas.json",
      Phaser.Loader.TEXTURE_ATLAS_JSON_HASH
    );

    this.load.spritesheet(
      "explosion",
      "client/assets/animaciones/explosion2.png",
      { frameWidth: 64, frameHeight: 64, endFrame: 23 }
    );

    this.load.on("complete", () => {
      this.scene.start("MenuScene");
    });
  }

  create() {}
}

export default Bootloader;
