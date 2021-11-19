import { createBukiAnim } from '../avatars/buki/buki.anim';
import Buki from '../avatars/buki/buki.avatar';
import { createBallonAnims } from '../items/balloon/balloon.anim';
import BallonItem from '../items/balloon/balloon.item';
import { createBirdAnims } from '../npcs/bird/bird.anim';
import BirdNPC, { PositionEnum } from '../npcs/bird/bird.npc';
import { AvatarStorage } from '../storage/avatar.storage';
import { LetterStorage } from '../storage/letter.storage';
import { StagesEnum } from './stages.enum';

export default class KitchenScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private avatar!: Buki
    private avatarStorage:AvatarStorage
    private letterStorage:LetterStorage
    private map:Phaser.Tilemaps.Tilemap
    private blowupSound: Phaser.Sound.BaseSound

    constructor() {
        super({
            key: StagesEnum.KITCHEN
        })
        this.avatarStorage = AvatarStorage.getInstance()
        this.letterStorage = LetterStorage.getInstance()
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.blowupSound = this.sound.add('balloon-blowup', {
            volume: 100
        })
    }

    create() {
        this.scene.run('top-menu')
        createBukiAnim(this.anims)
        createBallonAnims(this.anims)
        createBirdAnims(this.anims)

        this.map = this.make.tilemap({ key: StagesEnum.KITCHEN })
        const tileset = this.map.addTilesetImage('kitchen_32x', 'kitchen-tiles')

        const ground = this.map.createLayer('ground', tileset)
        ground.setCollisionByProperty({ collides: true })
        const wallsLayer = this.map.createLayer('walls', tileset)
        wallsLayer.setCollisionByProperty({ collides: true })

        const doorsLayer = this.map.createLayer('doors', tileset)
        doorsLayer.setCollisionByProperty({ collides: true })

        const furnitureLayer = this.map.createLayer('furniture', tileset)
        furnitureLayer.setCollisionByProperty({ collides: true })

        const furniture2Layer = this.map.createLayer('furniture_2', tileset)
        furniture2Layer.setCollisionByProperty({ collides: true })

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
        this.physics.add.collider(this.avatar, furniture2Layer)
    
        const spawnPoints = this.map.filterObjects('spawn-point', (obj) => obj.type === 'go_to')
        const recPoints = spawnPoints.map( sp => {
            const rec =this.add.rectangle(sp.x, sp.y, sp.width, sp.height, 0x6666ff, 0)
            rec.name = sp.name
            return rec
        })
        const spawnGroup = this.physics.add.group()
        spawnGroup.addMultiple(recPoints)
        this.physics.add.overlap(this.avatar, spawnGroup, this.handleGoToCollision, undefined, this)

        //Bird logic

        const birds = this.physics.add.group({
            classType: BirdNPC,
            createCallback: (go) => {
                const bird = go as BirdNPC
                bird.setInit(415)
                bird.setFinish(300)
                bird.setPositionEnum(PositionEnum.LEFT)
            }
        })

        birds.get(425, 300)
        this.physics.add.collider(this.avatar, birds, this.handleAvatarBirdCollision, undefined, this)

        //Balloon logic
        const balloonPoint = this.map.findObject('spawn-point', (obj) => obj.type === 'balloon')
        const letterId = balloonPoint.properties[0].value
        const letter = this.letterStorage.searchById(`${letterId}`)

        if (!letter || !letter.isToDisplay) {
            return
        }

        const ballons = this.physics.add.staticGroup({
            classType: BallonItem,
            createCallback: (go) => {
                const ballon = go as BallonItem
                ballon.setBlowupSound(this.blowupSound)
                ballon.setLetterNumber(letterId)
            }
        })

        ballons.get(balloonPoint!.x, balloonPoint!.y, 'balloon')
        this.physics.add.collider(this.avatar, ballons, this.handleAvatarBallonCollision, undefined, this)
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

    private handleAvatarBallonCollision(avatar: Phaser.GameObjects.GameObject, ballonGameObject: Phaser.GameObjects.GameObject) {
        const ballon = ballonGameObject as BallonItem
        this.avatar.setActiveBalloon(ballon)
    }

    private handleAvatarBirdCollision(avatarObj: Phaser.GameObjects.GameObject, birdObject: Phaser.GameObjects.GameObject) {
        const checkPoint = this.avatarStorage.getCheckPoint()
        if (!checkPoint) {
            throw new Error('Doesnt find the checkPoint')
        }
        const spawnPoint = this.map.findObject('spawn-point', (obj) => obj.name === checkPoint.key)
        this.avatar.setX(spawnPoint.x!)
        this.avatar.setY(spawnPoint.y!)
    }
}