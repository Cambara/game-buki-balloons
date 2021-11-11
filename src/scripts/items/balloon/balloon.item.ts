import Phaser from 'phaser'
import { sceneEvents, sceneEventsEnum } from '../../events/main.event'
import { AvatarStorage } from '../../storage/avatar.storage'

export default class BallonItem extends Phaser.Physics.Arcade.Sprite
{
    private letterNumber: number
    private blowupSound: Phaser.Sound.BaseSound
    private avatarStorage:AvatarStorage

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
	{
		super(scene, x, y, texture, frame)
        this.avatarStorage = AvatarStorage.getInstance()
		this.play('ballon-flight')
	}

    setLetterNumber(letterNumber: number) {
        this.letterNumber = letterNumber
    }

    setBlowupSound(blowupSound: Phaser.Sound.BaseSound) {
        this.blowupSound = blowupSound
    }

	blowup() {
        this.avatarStorage.putLetter(this.letterNumber.toString())
        sceneEvents.emit(sceneEventsEnum.ADD_LETTER)
        this.play('ballon-blowedup')
        this.blowupSound.play()
	}
}