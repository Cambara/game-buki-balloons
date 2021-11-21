import { createBukiAnim } from '../avatars/buki/buki.anim';
import Buki from '../avatars/buki/buki.avatar';
import { createBallonAnims } from '../items/balloon/balloon.anim';
import BallonItem from '../items/balloon/balloon.item';
import { createWindAnims } from '../npcs/wind/wind.anim';
import WindNPC from '../npcs/wind/wind.npc';
import { AvatarStorage } from '../storage/avatar.storage';
import { LetterStorage } from '../storage/letter.storage';
import { StagesEnum } from './stages.enum';

export default class BackGardenScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private avatar!: Buki
    private avatarStorage:AvatarStorage
    private letterStorage:LetterStorage
    private map:Phaser.Tilemaps.Tilemap
    private blowupSound: Phaser.Sound.BaseSound
    private windSound: Phaser.Sound.BaseSound
    private bukiWalkSound: Phaser.Sound.BaseSound
    
    constructor() {
        super({
            key: StagesEnum.BACK_GARDEN
        })
        this.avatarStorage = AvatarStorage.getInstance()
        this.letterStorage = LetterStorage.getInstance()
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.blowupSound = this.sound.add('balloon-blowup', {
            volume: 100
        })
        this.windSound = this.sound.add('wind-sound', {
            volume: 5,
            loop: true
        })
        this.bukiWalkSound = this.sound.add('buki-walk')
    }

    create() {
        this.scene.run('top-menu')
        createBukiAnim(this.anims)
        createWindAnims(this.anims)
        createBallonAnims(this.anims)

        this.windSound.play()

        this.map = this.make.tilemap({ key: StagesEnum.BACK_GARDEN })
        const tileset = this.map.addTilesetImage('back-garden_32x', 'back-garden-tiles')

        const ground = this.map.createLayer('ground', tileset)
        ground.setCollisionByProperty({ collides: true })
        const wallsLayer = this.map.createLayer('walls', tileset)
        wallsLayer.setCollisionByProperty({ collides: true })

        const furnitureLayer = this.map.createLayer('furniture', tileset)
        furnitureLayer.setCollisionByProperty({ collides: true })

        const furniture2Layer = this.map.createLayer('furniture_2', tileset)
        furniture2Layer.setCollisionByProperty({ collides: true })

        const checkPoint = this.avatarStorage.getCheckPoint()
        if (!checkPoint) {
            throw new Error('Doesnt find the checkPoint')
        }
        const spawnPoint = this.map.findObject('spawn-point', (obj) => obj.name === checkPoint.key)
        this.avatar = this.add.buki(spawnPoint.x || 100, spawnPoint.y || 100, 'avatar')
        this.avatar.setBukiWalkSound(this.bukiWalkSound)

        this.physics.add.collider(this.avatar, ground)
        this.physics.add.collider(this.avatar, wallsLayer)
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

        //Wind Logic
        const winds = this.physics.add.group({
            classType: WindNPC,
            createCallback: (go) => {
                const wind = go as WindNPC
                wind.body.onCollide = true
            }
        })
        
        this.map.filterObjects('spawn-point', (obj) => obj.type === 'wind').forEach( obj => {
            const windObj = winds.get(obj.x, obj.y)
            const windNPC = windObj as WindNPC
            windNPC.setWindVelocity(obj.properties[0].value);
        })

        this.physics.add.collider(furnitureLayer, winds, this.handleWindFunitureCollision, undefined, this)
        this.physics.add.collider(furniture2Layer, winds, this.handleWindFunitureCollision, undefined, this)
        this.physics.add.collider(this.avatar, winds, this.handleAvatarWindCollision, undefined, this)

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
            this.windSound.stop()
            this.scene.start(spawnPoint.properties[0].value)
        }
    }

    private handleAvatarBallonCollision(avatarObj: Phaser.GameObjects.GameObject, ballonGameObject: Phaser.GameObjects.GameObject) {
        const ballon = ballonGameObject as BallonItem
        this.avatar.setActiveBalloon(ballon)
    }

    private handleWindFunitureCollision(windObject: Phaser.GameObjects.GameObject, funitureObject: Phaser.GameObjects.GameObject) {
        const wind = windObject as WindNPC
        wind.restartXValue()
    }

    private handleAvatarWindCollision(avatarObj: Phaser.GameObjects.GameObject, windObject: Phaser.GameObjects.GameObject) {
        const checkPoint = this.avatarStorage.getCheckPoint()
        if (!checkPoint) {
            throw new Error('Doesnt find the checkPoint')
        }
        const spawnPoint = this.map.findObject('spawn-point', (obj) => obj.name === checkPoint.key)
        this.avatar.setX(spawnPoint.x!)
        this.avatar.setY(spawnPoint.y!)
    }
}