import Phaser from 'phaser'

export const createBirdCageAnims = (anims: Phaser.Animations.AnimationManager) => {
    anims.create({
        key: 'bird-cage-idle',
        frames: [
          {
            key: 'cages',
            frame: 'bird_cage/bird_cage.png'
          }
        ]
    })
}
