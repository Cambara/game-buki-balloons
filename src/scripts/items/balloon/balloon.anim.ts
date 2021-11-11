import Phaser from 'phaser'

export const createBallonAnims = (anims: Phaser.Animations.AnimationManager) => {
	anims.create({
		key: 'ballon-flight',
		frames: [
            {
              key: 'faune',
              frame: 'walk-down/walk-down-3.png'
            }
        ]
	})

	anims.create({
		key: 'ballon-blowedup',
        frames: anims.generateFrameNames('faune', {
          start: 1,
          end: 8,
          prefix: 'run-down/run-down-',
          suffix: '.png'
        }),
        repeat: -1,
        frameRate: 15
	})
}