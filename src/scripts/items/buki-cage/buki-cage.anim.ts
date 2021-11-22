import Phaser from 'phaser'

export const createBukiCageAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'buki-cage-idle',
        frames: [
          {
            key: 'cages',
            frame: 'buki_cage/buki_cage.png'
          }
        ]
    })
}
