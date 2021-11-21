import Phaser from 'phaser'

export const createAnaAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'ana-idle-down',
        frames: [
          {
            key: 'ana',
            frame: 'idle-down/idle-down-1.png'
          }
        ]
    })
}
