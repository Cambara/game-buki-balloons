import Phaser from 'phaser'

export default class WindNPC extends Phaser.Physics.Arcade.Sprite
{
    private velocity!:number
	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
	{
		super(scene, x, y, texture, frame)
		this.play('wind-to-left', true)
	}

    preUpdate(t:number, dt:number) {
        super.preUpdate(t, dt)
        const v = this.velocity * (-1)
        this.setVelocityX(v)
        if (this.x < -this.width) {
            this.x = 300
        }
    }

    destroy(fromScene?: boolean)
	{
		super.destroy(fromScene)
	}

    setWindVelocity(velocity:number) {
        this.velocity = velocity
    }
}
