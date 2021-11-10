export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('buki_background', 'assets/img/buki_background_1.jpg')
    this.load.atlas('faune', 'assets/avatars/faune/texture.png', 'assets/avatars/faune/texture.json')
  }

  create() {
    this.scene.start('StartMenuScene')
  }
}
