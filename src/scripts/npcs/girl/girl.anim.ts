import Phaser from 'phaser'

export const createGirlAnims = (anims: Phaser.Animations.AnimationManager) => {
	anims.create({
		key: 'girl-to-left',
		frames: anims.generateFrameNames('girl', {
      start: 1,
      end: 3,
      prefix: 'walk-left/walk-left-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 5
	})

  anims.create({
		key: 'girl-to-right',
		frames: anims.generateFrameNames('girl', {
      start: 1,
      end: 2,
      prefix: 'walk-right/walk-right-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 5
	})
}