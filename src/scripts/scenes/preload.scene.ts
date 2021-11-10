export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('buki_background', 'assets/img/buki_background_1.jpg')
    this.load.image('letter-icon', 'assets/items/letter/letter.jpeg')
    this.load.atlas('faune', 'assets/avatars/faune/texture.png', 'assets/avatars/faune/texture.json')
    this.load.image('buki_avatar', 'assets/avatars/buki/avatar.png')
    this.load.audio('key', 'path')
  }

  create() {
    this.scene.start('StartMenuScene')
  }
}
