import Phaser from 'phaser'
import BallonItem from '../../items/balloon/balloon.item'
import AnaNPC from '../../npcs/ana/ana.npc'
import { AvatarStorage } from '../../storage/avatar.storage'

declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      buki(x: number, y: number, texture: string, frame?: string | number): Buki
    }
  }
}

export default class Buki extends Phaser.Physics.Arcade.Sprite {
  private avatarStorage:AvatarStorage
  private activeBalloon?:BallonItem
  private anaNPC?:AnaNPC

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number) {
    super(scene, x, y, texture, frame)
    this.avatarStorage = AvatarStorage.getInstance();
    this.anims.play('buki-idle-down')
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
      this.anims.play('buki-run-left', true)
      this.setVelocity(-speed, 0)
      this.body.setSize(this.width, this.height * 0.5)
      this.body.offset.y = 20
    } else if (rightDown) {
      this.anims.play('buki-run-right', true)
      this.setVelocity(speed, 0)
      this.body.setSize(this.width, this.height * 0.5)
      this.body.offset.y = 20
    } else if (upDown) {
      this.anims.play('buki-run-up', true)
      this.setVelocity(0, -speed)
      this.body.setSize(this.width * 0.5, this.height)
      this.body.offset.y = 0
    } else if (downDown) {
      this.anims.play('buki-run-down', true)
      this.setVelocity(0, speed)
      this.body.setSize(this.width * 0.5, this.height)
      this.body.offset.y = 0
    } else {
      const parts = this.anims.currentAnim.key.split('-')
      parts[1] = 'idle'
      this.anims.play(parts.join('-'))
      this.setVelocity(0, 0)
    }

    if (leftDown || rightDown || upDown || downDown) {
      this.activeBalloon = undefined
      this.anaNPC = undefined
    }
  }

  setActiveBalloon(ballon:BallonItem) {
    this.activeBalloon = ballon
  }

  setAnaNPC(anaNPC:AnaNPC) {
    this.anaNPC = anaNPC
  }

  hasAnaNPC(): boolean {
    return !!this.anaNPC
  }

  private destroyActiveBalloon() {
    if (!this.activeBalloon) return

    this.activeBalloon.destroy()
    this.activeBalloon = undefined
  }
}
