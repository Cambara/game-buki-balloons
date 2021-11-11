export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('buki_background', 'assets/img/buki_background_1.jpg')
    this.load.image('letter-icon', 'assets/items/letter/letter.jpeg')
    this.load.atlas('faune', 'assets/avatars/faune/texture.png', 'assets/avatars/faune/texture.json')
    this.load.atlas('balloon', 'assets/items/balloon/texture.png', 'assets/items/balloon/texture.json')
    this.load.atlas('ana', 'assets/npcs/ana/texture.png', 'assets/npcs/ana/texture.json')
    this.load.atlas('wind', 'assets/npcs/wind/texture.png', 'assets/npcs/wind/texture.json')
    this.load.audio('balloon-blowup', 'assets/items/balloon/blowup.mp3')
    this.load.image('buki_avatar', 'assets/avatars/buki/avatar.png')
    this.load.image('ana_avatar', 'assets/npcs/ana/avatar.png')
  }
  
  create() {
    this.scene.start('TempScene')
    //this.scene.start('StartMenuScene')
  }
}
