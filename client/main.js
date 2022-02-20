import MenuScene from "./Scenes/MenuScene.js";
import GameScene from "./Scenes/GameScene.js";
import LoginScene from "./Scenes/LoginScene.js";

var config = {
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

export { game, config };

var game = new Phaser.Game(config);

var loginScene = new LoginScene(game);

// Aca seteamos la scene inicial con la que empieza al levantar el servidor
game.scene.add("LoginScene", loginScene);
