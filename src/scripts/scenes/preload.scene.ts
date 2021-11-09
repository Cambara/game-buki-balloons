export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('buki_background', 'assets/img/buki_background_1.jpg')
  }

  create() {
    this.scene.start('StartMenuScene')
  }
}
