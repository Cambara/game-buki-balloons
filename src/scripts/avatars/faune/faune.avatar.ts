import Phaser from 'phaser'
import BallonItem from '../../items/balloon/balloon.item'
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
  private activeBalloon?:BallonItem

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
      const hasLetter = this.avatarStorage.hasLetter()
      if (!hasLetter && this.activeBalloon) {
        this.activeBalloon.blowup()
        setTimeout(this.destroyActiveBalloon.bind(this),800)
      }
    }

    const speed = 100

    const leftDown = cursors.left?.isDown
		const rightDown = cursors.right?.isDown
		const upDown = cursors.up?.isDown
		const downDown = cursors.down?.isDown

    if (leftDown) {
      this.anims.play('faune-run-side', true)
      this.setVelocity(-speed, 0)
      this.scaleX = -1
      this.body.offset.x = 32
    } else if (rightDown) {
      this.anims.play('faune-run-side', true)
      this.setVelocity(speed, 0)
      this.scaleX = 1
      this.body.offset.x = 10
    } else if (upDown) {
      this.anims.play('faune-run-up', true)
      this.setVelocity(0, -speed)
    } else if (downDown) {
      this.anims.play('faune-run-down', true)
      this.setVelocity(0, speed)
    } else {
      const parts = this.anims.currentAnim.key.split('-')
      parts[1] = 'idle'
      this.anims.play(parts.join('-'))
      this.setVelocity(0, 0)
    }

    if (leftDown || rightDown || upDown || downDown) {
      this.activeBalloon = undefined
    }
  }

  setActiveBalloon(ballon:BallonItem) {
    this.activeBalloon = ballon
  }

  private destroyActiveBalloon() {
    if (!this.activeBalloon) return

    this.activeBalloon.destroy()
    this.activeBalloon = undefined
  }
}
