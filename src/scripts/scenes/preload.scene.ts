import { LetterStorage } from "../storage/letter.storage"
import { StagesEnum } from "./stages.enum"

export default class PreloadScene extends Phaser.Scene {
  private letterStorage:LetterStorage
  constructor() {
    super({ key: 'PreloadScene' })
    this.letterStorage = LetterStorage.getInstance()
  }

  preload() {
    //Stages
    this.load.image('hall-tiles', 'assets/maps/hall/hall_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.HALL, 'assets/maps/hall/hall.json')
    this.load.image('living-room-tiles', 'assets/maps/living-room/living-room_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.LIVING_ROOM, 'assets/maps/living-room/living-room.json')
    this.load.image('back-garden-tiles', 'assets/maps/back-garden/back-garden_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.BACK_GARDEN, 'assets/maps/back-garden/back-garden.json')
    
    //Avatars
    this.load.atlas('faune', 'assets/avatars/faune/texture.png', 'assets/avatars/faune/texture.json')
    this.load.atlas('buki', 'assets/avatars/buki/texture.png', 'assets/avatars/buki/texture.json')
    this.load.atlas('buki-side', 'assets/avatars/buki/texture-side/texture.png', 'assets/avatars/buki/texture-side/texture.json')
    this.load.image('buki_avatar', 'assets/avatars/buki/avatar.png')

    this.load.image('buki_background', 'assets/img/buki_background_1.jpg')
    this.load.image('letter-icon', 'assets/items/letter/letter.jpeg')
    this.load.atlas('balloon', 'assets/items/balloon/texture.png', 'assets/items/balloon/texture.json')
    this.load.atlas('ana', 'assets/npcs/ana/texture.png', 'assets/npcs/ana/texture.json')
    this.load.atlas('wind', 'assets/npcs/wind/texture.png', 'assets/npcs/wind/texture.json')
    this.load.audio('balloon-blowup', 'assets/items/balloon/blowup.mp3')
    this.load.image('ana_avatar', 'assets/npcs/ana/avatar.png')
  }
  
  create() {
    this.letterStorage.populate()
    //this.scene.start('BackGardenScene')
    this.scene.start('BasementScene')
    //this.scene.start('StartMenuScene')
  }
}
