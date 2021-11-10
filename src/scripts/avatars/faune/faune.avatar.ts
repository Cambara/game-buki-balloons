import Phaser from 'phaser'
import { sceneEvents, sceneEventsEnum } from '../../events/main.event'
import { AvatarStorage } from '../../storage/avatar.storage'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      faune(x: number, y: number, texture: string, frame?: string | number): Faune
    }
  }
}

export default class Faune extends Phaser.Physics.Arcade.Sprite {
  private avatarStorage:AvatarStorage

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.avatarStorage = AvatarStorage.getInstance();
    this.anims.play('faune-idle-down')
  }

  preUpdate(t: number, dt: number) {
    super.preUpdate(t, dt)
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    if (!cursors) {
      return
    }

    if (Phaser.Input.Keyboard.JustDown(cursors.space!)) {
      this.avatarStorage.addOrRemoveLetter()
      sceneEvents.emit(sceneEventsEnum.ADD_OR_DESTROY_LETTER)
    }

    const speed = 100

    if (cursors.left?.isDown) {
      this.anims.play('faune-run-side', true)
      this.setVelocity(-speed, 0)
      this.scaleX = -1
      this.body.offset.x = 32
    } else if (cursors.right?.isDown) {
      this.anims.play('faune-run-side', true)
      this.setVelocity(speed, 0)
      this.scaleX = 1
      this.body.offset.x = 10
    } else if (cursors.up?.isDown) {
      this.anims.play('faune-run-up', true)
      this.setVelocity(0, -speed)
    } else if (cursors.down?.isDown) {
      this.anims.play('faune-run-down', true)
      this.setVelocity(0, speed)
    } else {
      const parts = this.anims.currentAnim.key.split('-')
      parts[1] = 'idle'
      this.anims.play(parts.join('-'))
      this.setVelocity(0, 0)
    }
  }
}
