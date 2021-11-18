import { createBukiAnim } from '../avatars/buki/buki.anim';
import Buki from '../avatars/buki/buki.avatar';
import { createBottleAnims } from '../items/bottle/bottle.anim';
import BottleItem from '../items/bottle/bottle.item';
import { AvatarStorage } from '../storage/avatar.storage';
import { LetterStorage } from '../storage/letter.storage';
import { StagesEnum } from './stages.enum';

export default class HallScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private avatar!: Buki
    private avatarStorage:AvatarStorage
    private letterStorage:LetterStorage
    private map:Phaser.Tilemaps.Tilemap

    constructor() {
        super({
            key: StagesEnum.HALL
        })
        this.avatarStorage = AvatarStorage.getInstance()
        this.letterStorage = LetterStorage.getInstance()
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        this.scene.run('top-menu')
        createBukiAnim(this.anims)
        createBottleAnims(this.anims)

        this.map = this.make.tilemap({ key: StagesEnum.HALL })
        const tileset = this.map.addTilesetImage('hall_32x', 'hall-tiles')

        const ground = this.map.createLayer('ground', tileset)
        const wallsLayer = this.map.createLayer('walls', tileset)
        wallsLayer.setCollisionByProperty({ collides: true })

        const doorsLayer = this.map.createLayer('doors', tileset)
        doorsLayer.setCollisionByProperty({ collides: true })

        const furnitureLayer = this.map.createLayer('furniture', tileset)
        furnitureLayer.setCollisionByProperty({ collides: true })

        const checkPoint = this.avatarStorage.getCheckPoint()
        if (!checkPoint) {
            throw new Error('Doesnt find the checkPoint')
        }
        const spawnPoint = this.map.findObject('spawn-point', (obj) => obj.name === checkPoint.key)
        this.avatar = this.add.buki(spawnPoint.x || 100, spawnPoint.y || 100, 'avatar');

        this.physics.add.collider(this.avatar, ground)
        this.physics.add.collider(this.avatar, wallsLayer)
        this.physics.add.collider(this.avatar, doorsLayer)
        this.physics.add.collider(this.avatar, furnitureLayer)
    
        const spawnPoints = this.map.filterObjects('spawn-point', (obj) => obj.type === 'go_to')
        const recPoints = spawnPoints.map( sp => {
            const rec =this.add.rectangle(sp.x, sp.y, sp.width, sp.height, 0x6666ff, 0)
            rec.name = sp.name
            return rec
        })
        const spawnGroup = this.physics.add.group()
        spawnGroup.addMultiple(recPoints)
        this.physics.add.overlap(this.avatar, spawnGroup, this.handleGoToCollision, undefined, this)

        const bottles = this.physics.add.staticGroup({
            classType: BottleItem
        })
        const lettersTotal = this.letterStorage.getLetters().length
        if ( lettersTotal > 2) {    
            bottles.get(210,360, 'bottle')
        }
        if ( lettersTotal > 3) {    
            bottles.get(305,180, 'bottle')
        }
        
        bottles.rotate(1)
        this.physics.add.collider(this.avatar, bottles)
    }

    update() {
        this.avatar.update(this.cursors)
    }

    private handleGoToCollision(avatar: Phaser.GameObjects.GameObject, gameObj: Phaser.GameObjects.GameObject ) {
        const spawnPoint = this.map.findObject('spawn-point', (obj) => obj.name === gameObj.name)
        if (spawnPoint && spawnPoint.type === 'go_to') {
            this.avatarStorage.putCheckPoint({
                key: spawnPoint.name,
                stage: spawnPoint.properties[0].value
            })
            this.scene.start(spawnPoint.properties[0].value);
        }
    }
}