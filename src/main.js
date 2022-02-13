

import MenuScene from './Scenes/MenuScene.js';

import GameScene from './Scenes/GameScene.js';

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
    scene: [MenuScene, GameScene]
    /*{
      preload: preloadScene,
      create: createScene,
      update: updateScene
    }*/
  }


var menuScene = new MenuScene();

var game = new Phaser.Game(config);


game.scene.add("MenuScene", menuScene);
game.scene.start('MenuScene');