export default class TextBoxUI extends Phaser.GameObjects.Rectangle {
  private textObject: Phaser.GameObjects.Text
  private pressSpaceMsg?: Phaser.GameObjects.Text
  private pressSpaceMsgTween?: Phaser.Tweens.Tween
  private lines:string[]
  private lineDelay:number
  private wordDelay:number
  private lineIndex:number
  private wordIndex:number
  private words:string[]
  private avatar:Phaser.GameObjects.Image
  
  constructor(scene: Phaser.Scene, lines: string[], avatarKey:string) {
    const x = 0 + scene.cameras.main.width / 2
    const y = 535
    const paddingTop = 30
    const paddingLeft = 20
    super(scene, x, y, scene.cameras.main.width, 100)

    this.setFillStyle(0x6fa8dc)
    this.lines = lines
    this.lineDelay = 400
    this.wordDelay = 150
    this.lineIndex = 0
    scene.add.existing(this)

    this.textObject = scene.add.text(75 + paddingLeft, y - paddingTop, '', {
      fontSize: '18px',
      align: 'left',
      shadow: {
        color: '#395671',
        blur: 0.9,
        fill: true,
        offsetX: 2,
        offsetY: 2
      }
    })

    this.avatar = this.scene.add.image(paddingLeft + 30, (y + 30 ) - paddingTop, avatarKey)
    this.avatar.scale = 0.4

    this.nextLine()
  }

  public setText(lines: string[]) {
    this.destroyPressSpaceMsg()
    this.textObject.text = ''
    this.lines = lines
    this.lineIndex = 0
    this.nextLine()
  }
  
  public isToPressSpace() {
    return !!this.pressSpaceMsg
  }

  public destroy() {
    this.destroyPressSpaceMsg()
    this.avatar.destroy()
    this.textObject.destroy()
    super.destroy()
  }

  private nextLine() {
    if (this.lineIndex === this.lines.length) {
      this.createPressSpaceMsg()
      return
    }

    this.words = this.lines[this.lineIndex].split(' ')
    this.wordIndex = 0

    setTimeout(this.nextWord.bind(this), this.wordDelay)

    this.lineIndex ++
  }

  private nextWord() {
    this.textObject.text = this.textObject.text.concat(this.words[this.wordIndex] + ' ')

    this.wordIndex ++

    if (this.wordIndex === this.words.length) {
      this.textObject.text = this.textObject.text.concat('\n')
      setTimeout(this.nextLine.bind(this), this.lineDelay)
      return
    }

    setTimeout(this.nextWord.bind(this), this.wordDelay)
  }

  private createPressSpaceMsg() {
    if (this.pressSpaceMsg) {
      return
    }

    this.pressSpaceMsg = this.scene.add.text(this.scene.cameras.main.width - 120, this.scene.cameras.main.height - 50, 'PRESS SPACE')
    this.pressSpaceMsgTween = this.scene.tweens.add({
      targets: this.pressSpaceMsg,
      ease: 'Cubic.easeInOut',
      duration: 2000,
      repeat: -1,
      yoyo: true,
      props: {
        alpha: 0.5
      }

    })
  }

  private destroyPressSpaceMsg() {
    if (this.pressSpaceMsg && this.pressSpaceMsgTween) {
      this.scene.tweens.remove(this.pressSpaceMsgTween)
      this.pressSpaceMsg.destroy()
      this.pressSpaceMsg = undefined
      this.pressSpaceMsgTween = undefined
    }
  }
}
