import Phaser from 'phaser'

export default class AnaNPC extends Phaser.Physics.Arcade.Sprite
{

	constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string | number)
	{
		super(scene, x, y, texture, frame)
		this.play('ana-idle-down')
	}
}
