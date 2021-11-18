import Phaser from 'phaser'

export const createBottleAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'bottle-idle-down',
        frames: [
          {
            key: 'bottle',
            frame: 'idle-down/idle-down-1.png'
          }
        ]
    })
}
