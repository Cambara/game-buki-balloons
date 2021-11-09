import 'phaser'
import { scenes } from './scenes/scenes.factory'

const config = {
  type: Phaser.AUTO,
  scale: {
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
