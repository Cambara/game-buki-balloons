import Phaser from 'phaser'

export const createBallonAnims = (anims: Phaser.Animations.AnimationManager) => {
	anims.create({
		key: 'ballon-flight',
		frames: anims.generateFrameNames('balloon', {
      start: 1,
      end: 3,
      prefix: 'static/balloon-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 3
	})

	anims.create({
		key: 'ballon-blowedup',
    frames: anims.generateFrameNames('balloon', {
      start: 1,
      end: 4,
      prefix: 'blowup/balloon-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 15
	})
}