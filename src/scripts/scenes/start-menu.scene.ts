import { MenuButton } from "../ui/menu.button"

export default class StartMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'StartMenuScene'
    })
  }

  create() {
    const { width, height } = this.cameras.main
    const middleX = width / 2
    const middleY = height / 2

    const background = this.add.image(middleX, middleY, 'buki_background')
    const scaleX = width / background.width;
    const scaleY = height / background.height;
    const scale = Math.max(scaleX, scaleY)
    background.setScale(scale).setScrollFactor(0)

    const mainTitle = this.add
      .text(middleX, middleY, 'Buki VS Ballons', {
        color: '#000',
        fontSize: '48px',
        strokeThickness: 8,
      })
    
    mainTitle.setX(middleX - (mainTitle.width/2))
    mainTitle.setY(middleY - ((mainTitle.height/2) + 80))

    const startBtn = new MenuButton(this, middleX, middleY, 'Start game', () => {
      localStorage.clear()
      this.scene.start('TempScene');
    })

    startBtn.setX(middleX - (startBtn.width/2))
    startBtn.setY(middleY - ((startBtn.height/2) - 20))
    startBtn.setLabelSize(
      middleX - (startBtn.getLabelWidth()/2),
      middleY - ((startBtn.getLabelHeight()/2) - 20)
    )
  }
}
