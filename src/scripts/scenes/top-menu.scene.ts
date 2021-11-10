import { sceneEvents, sceneEventsEnum } from "../events/main.event"
import { AvatarStorage } from "../storage/avatar.storage"

export default class TopMenuScene extends Phaser.Scene {z
  private avatarStorage:AvatarStorage
  private letterIcon?:Phaser.GameObjects.Image
  
  constructor() {
    super({ key: 'top-menu' })
    this.avatarStorage = AvatarStorage.getInstance()
  }

  create() {
    this.add.text(10, 10, 'Buki Level 1', {
      color: '#FFF',
      fontSize: '48px',
      strokeThickness: 8
    })

    sceneEvents.on(sceneEventsEnum.ADD_OR_DESTROY_LETTER, this.addOrDestroyLetter, this)
  }

  private addOrDestroyLetter() {
    const isToDestroy = !this.avatarStorage.hasLetter()

    if (isToDestroy) {
      if (this.letterIcon) {
        this.letterIcon.destroy()
      }
      return;
    }

    this.letterIcon = this.add.image(100,100, 'letter-icon')
    this.letterIcon.scale = 0.2
  }
}
