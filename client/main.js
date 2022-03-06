import MenuScene from "./Scenes/MenuScene.js";
import GameScene from "./Scenes/GameScene.js";
import LoginScene from "./Scenes/LoginScene.js";
import Bootloader from "./Scenes/BootLoader.js";
import GameoverScene from "./Scenes/GameoverScene.js";
import CongratulationsScene from "./Scenes/CongratulationsScene.js";
import VistaLateralScene from "./Scenes/VistaLateralScene.js";

var config = {
  type: Phaser.CANVAS,
  parent: "the_silent_war_of_the_atlantic",
  width: 1600,
  height: 850,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [
    Bootloader,
    MenuScene,
    GameScene,
    GameoverScene,
    CongratulationsScene,
    VistaLateralScene,
  ],
  plugins: {
    global: [
      {
        key: "rexInputTextPlugin",
        plugin: "./index.html",
        start: true,
      },
      {
        key: "rexUI",
        plugin: "./index.html",
        mapping: "rexUI",
      },
    ],
  },
};

var game = new Phaser.Game(config);
//Habilitamos el sistema de física Arcade de Phaser (velocidad, movimientos, colisiones, etc)
game.physics.startSystem(Phaser.Physics.ARCADE);

export { game, config };
