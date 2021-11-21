import Phaser from 'phaser'

export const createBirdAnims = (anims: Phaser.Animations.AnimationManager) => {
	anims.create({
		key: 'bird-to-left',
		frames: anims.generateFrameNames('bird', {
      start: 1,
      end: 2,
      prefix: 'bird-left/bird-left-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 5
	})

  anims.create({
		key: 'bird-to-right',
		frames: anims.generateFrameNames('bird', {
      start: 1,
      end: 2,
      prefix: 'bird-right/bird-right-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 5
	})
}