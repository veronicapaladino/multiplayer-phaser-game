import MenuScene from "./Scenes/MenuScene.js";
import GameScene from "./Scenes/GameScene.js";
import LoginScene from "./Scenes/LoginScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "the_silent_war_of_the_atlantic",
  width: 1280,
  height: 600,
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
  scene: [LoginScene, MenuScene, GameScene],
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: "./index.html",
        mapping: "rexUI",
      },
    ],
    global: [
      {
        key: "rexInputTextPlugin",
        plugin: "./index.html",
        start: true,
      },
    ],
  },
};

var game = new Phaser.Game(config);

console.log("--game", game);
var loginScene = new LoginScene(game);

// Aca seteamos la scene inicial con la que empieza al levantar el servidor
console.log("llega 1");
game.scene.add("LoginScene", loginScene);
console.log("llega 2");
