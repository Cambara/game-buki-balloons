import { sceneEvents, sceneEventsEnum } from "../events/main.event"
import { AvatarStorage } from "../storage/avatar.storage"

export default class TopMenuScene extends Phaser.Scene {
  private avatarStorage:AvatarStorage
  private letterIcon?:Phaser.GameObjects.Image
  
  constructor() {
    super({ key: 'top-menu' })
    this.avatarStorage = AvatarStorage.getInstance()
  }

  create() {
    const avatar = this.add.image(750, 50, 'buki_avatar')
    avatar.scale = 0.4
    sceneEvents.on(sceneEventsEnum.ADD_LETTER, this.addOrDestroyLetter, this)
    sceneEvents.on(sceneEventsEnum.DESTROY_LETTER, this.addOrDestroyLetter, this)

    if (this.avatarStorage.hasLetter()) {
      this.addOrDestroyLetter();
    }
  }

  private addOrDestroyLetter() {
    const isToDestroy = !this.avatarStorage.hasLetter()

    if (isToDestroy) {
      if (this.letterIcon) {
        this.letterIcon.destroy()
      }
      return;
    }

    this.letterIcon = this.add.image(685, 30, 'letter-icon')
    this.letterIcon.scale = 0.2
  }
}
