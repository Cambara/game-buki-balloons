import { createFauneAnim } from "../avatars/faune/faune.anim";
import Faune from "../avatars/faune/faune.avatar";
import { AvatarStorage } from "../storage/avatar.storage";
import { StagesEnum } from "./stages.enum";

export default class HallScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Faune
    private avatarStorage:AvatarStorage

    constructor() {
        super({
            key: StagesEnum.HALL
        })
        this.avatarStorage = AvatarStorage.getInstance()
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        this.scene.run('top-menu')
        createFauneAnim(this.anims)

        const map = this.make.tilemap({ key: StagesEnum.HALL })
        const tileset = map.addTilesetImage('hall_32x', 'hall-tiles')

        const ground = map.createLayer('ground', tileset)
        const wallsLayer = map.createLayer('walls', tileset)
        wallsLayer.setCollisionByProperty({ collides: true })

        const doorsLayer = map.createLayer('doors', tileset)
        doorsLayer.setCollisionByProperty({ collides: true })

        const furnitureLayer = map.createLayer('furniture', tileset)
        furnitureLayer.setCollisionByProperty({ collides: true })

        const checkPoint = this.avatarStorage.getCheckPoint()
        if (!checkPoint) {
            throw new Error("Doesnt find the checkPoint")
        }
        const spawnPoint = map.findObject("spawn-point", (obj) => obj.name === checkPoint.key)
        this.faune = this.add.faune(spawnPoint.x || 100, spawnPoint.y || 100, 'faune');

        this.physics.add.collider(this.faune, ground)
        this.physics.add.collider(this.faune, wallsLayer)
        this.physics.add.collider(this.faune, doorsLayer)
        this.physics.add.collider(this.faune, furnitureLayer)
    
        const spawnPoints = map.createFromObjects("spawn-point", {})
        
        const spawnGroup = this.physics.add.group()
        spawnGroup.addMultiple(spawnPoints)
        this.physics.add.overlap(this.faune, spawnGroup, this.handleGoToCollision, undefined, this)
    }

    update() {
        this.faune.update(this.cursors)
    }

    private handleGoToCollision(avatar: Phaser.GameObjects.GameObject, spawnPoint: Phaser.GameObjects.GameObject ) {
        console.log(spawnPoint)
    }
}