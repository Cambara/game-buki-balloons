export const createFauneAnim = (anims: Phaser.Animations.AnimationManager): void => {
    anims.create({
      key: 'faune-idle-down',
      frames: [
        {
          key: 'faune',
          frame: 'walk-down/walk-down-3.png'
        }
      ]
    })
  
    anims.create({
      key: 'faune-run-down',
      frames: anims.generateFrameNames('faune', {
        start: 1,
        end: 8,
        prefix: 'run-down/run-down-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })
  
    anims.create({
      key: 'faune-run-up',
      frames: anims.generateFrameNames('faune', {
        start: 1,
        end: 8,
        prefix: 'run-up/run-up-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })
  
    anims.create({
      key: 'faune-run-side',
      frames: anims.generateFrameNames('faune', {
        start: 1,
        end: 8,
        prefix: 'run-side/run-side-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })
  }
  