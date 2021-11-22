import { LetterStorage } from "../storage/letter.storage"
import { StagesEnum } from "./stages.enum"

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    //Stages
    this.load.image('hall-tiles', 'assets/maps/hall/hall_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.HALL, 'assets/maps/hall/hall.json')
    this.load.image('living-room-tiles', 'assets/maps/living-room/living-room_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.LIVING_ROOM, 'assets/maps/living-room/living-room.json')
    this.load.image('back-garden-tiles', 'assets/maps/back-garden/back-garden_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.BACK_GARDEN, 'assets/maps/back-garden/back-garden.json')
    this.load.image('second-floor-tiles', 'assets/maps/second-floor/second-floor_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.SECOND_FLOOR, 'assets/maps/second-floor/second-floor.json')
    this.load.image('kitchen-tiles', 'assets/maps/kitchen/kitchen_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.KITCHEN, 'assets/maps/kitchen/kitchen.json')
    this.load.image('basement-tiles', 'assets/maps/basement/basement_32x.png')
    this.load.tilemapTiledJSON(StagesEnum.BASEMENT, 'assets/maps/basement/basement.json')
    
    //Avatars
    this.load.atlas('faune', 'assets/avatars/faune/texture.png', 'assets/avatars/faune/texture.json')
    this.load.atlas('buki', 'assets/avatars/buki/texture.png', 'assets/avatars/buki/texture.json')
    this.load.atlas('buki-side', 'assets/avatars/buki/texture-side/texture.png', 'assets/avatars/buki/texture-side/texture.json')
    this.load.image('buki_avatar', 'assets/avatars/buki/avatar.png')
    this.load.audio('buki-walk', 'assets/avatars/buki/walk_sound_5.mp3')
    
    //Items
    this.load.atlas('bottle', 'assets/items/bottle/texture.png', 'assets/items/bottle/texture.json')
    this.load.atlas('balloon', 'assets/items/balloon/texture.png', 'assets/items/balloon/texture.json')
    this.load.audio('balloon-blowup', 'assets/items/balloon/blowup.mp3')
    this.load.image('letter-icon', 'assets/items/letter/letter.jpeg')
    this.load.atlas('cages', 'assets/items/cages/texture.png', 'assets/items/cages/texture.json')
    
    //NPCs
    this.load.atlas('ana', 'assets/npcs/ana/texture.png', 'assets/npcs/ana/texture.json')
    this.load.image('ana_avatar', 'assets/npcs/ana/avatar.png')
    this.load.atlas('girl', 'assets/npcs/girl/texture.png', 'assets/npcs/girl/texture.json')
    this.load.atlas('bird', 'assets/npcs/bird/texture.png', 'assets/npcs/bird/texture.json')
    this.load.audio('bird-sound', 'assets/npcs/bird/bird-sound-2.mp3')
    this.load.atlas('wind', 'assets/npcs/wind/texture.png', 'assets/npcs/wind/texture.json')
    this.load.audio('wind-sound', 'assets/npcs/wind/wind_sound.mp3')
    this.load.audio('wood_walk-sound', 'assets/npcs/girl/wood_walk-sound.mp3')
    
    
    this.load.image('buki_background', 'assets/img/buki_background_1.jpg')
    this.load.audio('wall-clock-tick-tock-sound', 'assets/sound/wall-clock-tick-tock.mp3')
    this.load.audio('fire-place-sound', 'assets/sound/fire-place.mp3')
  }
  
  create() {
    this.scene.start(StagesEnum.START_MENU)
  }
}
