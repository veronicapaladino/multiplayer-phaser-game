

import MenuScene from './Scenes/MenuScene.js';
import GameScene from './Scenes/GameScene.js';
import LoginScene from './Scenes/LoginScene.js';

var config = {
    type: Phaser.AUTO,
    parent: 'the_silent_war_of_the_atlantic',
    width: 1280,
    height: 600,
    backgroundColor:'black',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 0 }
      }
    },
    scene: [LoginScene, MenuScene, GameScene]
    /*{
      preload: preloadScene,
      create: createScene,
      update: updateScene
    }*/
  }


var loginScene = new LoginScene();

var game = new Phaser.Game(config);

// Aca seteamos la scene inicial con la que empieza al levantar el servidor
game.scene.add("LoginScene", loginScene);
game.scene.start('LoginScene');