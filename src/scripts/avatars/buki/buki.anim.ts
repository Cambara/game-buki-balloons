export const createBukiAnim = (anims: Phaser.Animations.AnimationManager): void => {
    anims.create({
      key: 'buki-idle-down',
      frames: [
        {
          key: 'buki',
          frame: 'walk-down/walk-down-1.png'
        }
      ]
    })

    anims.create({
        key: 'buki-idle-left',
        frames: [
          {
            key: 'buki-side',
            frame: 'walk-left/walk-left-1.png'
          }
        ]
    })

    anims.create({
        key: 'buki-idle-right',
        frames: [
          {
            key: 'buki-side',
            frame: 'walk-right/walk-right-1.png'
          }
        ]
    })

    anims.create({
        key: 'buki-idle-up',
        frames: [
          {
            key: 'buki',
            frame: 'walk-up/walk-up-1.png'
          }
        ]
    })
  
    anims.create({
      key: 'buki-run-down',
      frames: anims.generateFrameNames('buki', {
        start: 1,
        end: 4,
        prefix: 'walk-down/walk-down-',
        suffix: '.png'
      }),
      repeat: -1,
      frameRate: 15
    })

    anims.create({
        key: 'buki-run-left',
        frames: anims.generateFrameNames('buki-side', {
          start: 1,
          end: 3,
          prefix: 'walk-left/walk-left-',
          suffix: '.png'
        }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'buki-run-right',
        frames: anims.generateFrameNames('buki-side', {
          start: 1,
          end: 3,
          prefix: 'walk-right/walk-right-',
          suffix: '.png'
        }),
        repeat: -1,
        frameRate: 15
    })

    anims.create({
        key: 'buki-run-up',
        frames: anims.generateFrameNames('buki', {
          start: 1,
          end: 4,
          prefix: 'walk-up/walk-up-',
          suffix: '.png'
        }),
        repeat: -1,
        frameRate: 15
    })
  
  }
  