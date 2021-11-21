import { AvatarStorage } from "../storage/avatar.storage"
import { LetterStorage } from "../storage/letter.storage"
import { MenuButton } from "../ui/menu.button"
import { StagesEnum } from "./stages.enum"

export default class StartMenuScene extends Phaser.Scene {
  private letterStorage:LetterStorage
  private avatarStorage:AvatarStorage
  
  constructor() {
    super({
      key: 'StartMenuScene'
    })
    this.letterStorage = LetterStorage.getInstance()
    this.avatarStorage = AvatarStorage.getInstance()
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
      this.letterStorage.populate()
      this.scene.start(StagesEnum.BASEMENT)
    })

    startBtn.setX(middleX - (startBtn.width/2))
    startBtn.setY(middleY - ((startBtn.height/2) - 20))
    startBtn.setLabelSize(
      middleX - (startBtn.getLabelWidth()/2),
      middleY - ((startBtn.getLabelHeight()/2) - 20)
    )
    const checkPoint = this.avatarStorage.getCheckPoint()
    if (!checkPoint) {
      return;
    }

    const continueBtn = new MenuButton(this, middleX, middleY, 'Continue', () => {
      this.scene.start(checkPoint.stage);
    })

    continueBtn.setX(middleX - (continueBtn.width/2))
    continueBtn.setY(middleY - ((continueBtn.height/2) - 120))
    continueBtn.setLabelSize(
      middleX - (continueBtn.getLabelWidth()/2),
      middleY - ((continueBtn.getLabelHeight()/2) - 120)
    )
  }
}
