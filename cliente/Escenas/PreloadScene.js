
import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {

  constructor() {
    super('PreloadScene');
  }

  preload()
    this.load.image('water', 'assets/water.png');
    this.load.spritesheet('ship', 'assets/shipSprite.png', {      frameWidth: 16, frameHeight:                                                      
    });

    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}

export default PreloadScene;
