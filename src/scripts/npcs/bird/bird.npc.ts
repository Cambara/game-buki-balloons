import Phaser from 'phaser'

export enum PositionEnum {
    LEFT = 'left',
    RIGHT = 'right'
}

export default class BirdNPC extends Phaser.Physics.Arcade.Sprite
{
    private velocity:number = 40;
    private xInit:number;
    private xFinish:number;
    private positionEnum:PositionEnum;

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
	{
		super(scene, x, y, texture, frame)
        this.play('bird-to-left', true)
	}

    preUpdate(t:number, dt:number) {
        super.preUpdate(t, dt)

        if (!this.positionEnum) return
        
        if (this.x < this.xFinish) {
            this.positionEnum = PositionEnum.RIGHT
        }

        if (this.x > this.xInit) {
            this.positionEnum = PositionEnum.LEFT
        }

        const v = this.positionEnum === PositionEnum.LEFT ? this.velocity * (-1) : this.velocity
        if (v < 0) {
            this.play('bird-to-left', true)
        } else {
            this.play('bird-to-right', true)
        }
        this.setVelocityX(v)
        this.setVelocityY(0)
    }

    destroy(fromScene?: boolean)
	{
		super.destroy(fromScene)
	}

    setInit(init:number) {
        this.xInit = init
    }

    setFinish(finish:number) {
        this.xFinish = finish
    }

    setPositionEnum(positionEnum:PositionEnum) {
        this.positionEnum = positionEnum
    }

}
