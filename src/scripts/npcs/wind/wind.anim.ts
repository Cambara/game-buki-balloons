import Phaser from 'phaser'

export const createWindAnims = (anims: Phaser.Animations.AnimationManager) => {
	anims.create({
		key: 'wind-to-left',
		frames: anims.generateFrameNames('wind', {
      start: 1,
      end: 4,
      prefix: 'wind-left/wind-',
      suffix: '.png'
    }),
    repeat: -1,
    frameRate: 5
	})
}