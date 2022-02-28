import MenuScene from "./Scenes/MenuScene.js";
import GameScene from "./Scenes/GameScene.js";
import LoginScene from "./Scenes/LoginScene.js";
import Bootloader from "./Scenes/BootLoader.js";
import GameoverScene from "./Scenes/GameoverScene.js";
import CongratulationsScene from "./Scenes/CongratulationsScene.js";

var config = {
  type: Phaser.AUTO,
  parent: "the_silent_war_of_the_atlantic",
  width: 1600,
  height: 850,
  backgroundColor: "black",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 },
    },
  },
  dom: {
    createContainer: true,
  },
  scene: [
    Bootloader,
    LoginScene,
    MenuScene,
    GameScene,
    GameoverScene,
    CongratulationsScene,
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

export { game, config };
