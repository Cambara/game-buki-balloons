import 'phaser'
import './avatars/avatars.factory'
import { scenes } from './scenes.factory'

const config = {
  type: Phaser.AUTO,
  scale: {
    width: 800,
    height: 608,
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
