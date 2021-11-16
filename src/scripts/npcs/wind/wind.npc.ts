import Phaser from 'phaser'

export default class WindNPC extends Phaser.Physics.Arcade.Sprite
{

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
	{
		super(scene, x, y, texture, frame)
		this.play('wind-to-left', true)
	}

    preUpdate(t:number, dt:number) {
        super.preUpdate(t, dt)
        
        this.setVelocityX(-100)
        if (this.x < -this.width) {
            //this.destroy();
            this.x = 300
        }
    }

    destroy(fromScene?: boolean)
	{
		super.destroy(fromScene)
	}
}
