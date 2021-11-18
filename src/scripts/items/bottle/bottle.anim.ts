import Phaser from 'phaser'

export const createBottleAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'bottle-idle',
        frames: [
          {
            key: 'bottle',
            frame: 'idle/idle-1.png'
          }
        ]
    })
}
