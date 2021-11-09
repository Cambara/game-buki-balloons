export default class StartMenuScene extends Phaser.Scene {
    constructor() {
      super({
          key: 'StartMenuScene'
        })
    }
  
    create() {
      this.add.text(100, 50, 'Isso é um test', {
        color: '#FFFFFF'
      }).setFontSize(24);
    }
  }
  