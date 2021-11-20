import { createBukiAnim } from '../avatars/buki/buki.anim';
import Buki from '../avatars/buki/buki.avatar';
import { sceneEvents, sceneEventsEnum } from '../events/main.event';
import { createBallonAnims } from '../items/balloon/balloon.anim';
import BallonItem from '../items/balloon/balloon.item';
import { createAnaAnims } from '../npcs/ana/ana.anim';
import AnaNPC from '../npcs/ana/ana.npc';
import { AvatarStorage } from '../storage/avatar.storage';
import { LetterStorage } from '../storage/letter.storage';
import TextBoxUI from '../ui/text-box.ui';
import { StagesEnum } from './stages.enum';

export default class BasementScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private avatar!: Buki
    private avatarStorage:AvatarStorage
    private letterStorage:LetterStorage
    private map:Phaser.Tilemaps.Tilemap
    private blowupSound: Phaser.Sound.BaseSound
    private bukiWalkSound: Phaser.Sound.BaseSound
    private txtBox?:TextBoxUI
    private scriptTexts:string[][] = []

    constructor() {
        super({
            key: StagesEnum.BASEMENT
        })
        this.avatarStorage = AvatarStorage.getInstance()
        this.letterStorage = LetterStorage.getInstance()
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.blowupSound = this.sound.add('balloon-blowup', {
            volume: 100
        })
        this.bukiWalkSound = this.sound.add('buki-walk')
    }

    create() {
        this.scene.run('top-menu')
        createBukiAnim(this.anims)
        createBallonAnims(this.anims)
        createAnaAnims(this.anims)

        this.map = this.make.tilemap({ key: StagesEnum.BASEMENT })
        const tileset = this.map.addTilesetImage('basement_32x', 'basement-tiles')

        const ground = this.map.createLayer('ground', tileset)
        ground.setCollisionByProperty({ collides: true })
        const wallsLayer = this.map.createLayer('walls', tileset)
        wallsLayer.setCollisionByProperty({ collides: true })

        const doorsLayer = this.map.createLayer('doors', tileset)
        doorsLayer.setCollisionByProperty({ collides: true })

        const furnitureLayer = this.map.createLayer('furniture', tileset)
        furnitureLayer.setCollisionByProperty({ collides: true })

        const checkPoint = this.avatarStorage.getCheckPoint()
        const spawnPoint = checkPoint ? this.map.findObject('spawn-point', (obj) => obj.name === checkPoint.key) : undefined

        this.avatar = this.add.buki(spawnPoint?.x || 300, spawnPoint?.y || 120, 'avatar');
        this.avatar.setBukiWalkSound(this.bukiWalkSound)

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

        //Ana
        const anas = this.physics.add.staticGroup({
            classType: AnaNPC,
            createCallback: (go) => {
                const anaNPC = go as AnaNPC
                anaNPC.scale = 1.2;
            }
        })

        anas.get(340, 100, 'ana')

        this.physics.add.collider(this.avatar, anas, this.handleAvatarAnaCollision, undefined, this)

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

        if (!this.avatarStorage.isStartGame()) {
            this.scriptTexts = this.avatarStorage.getTutorial()
            const lines = this.getNextLines()
            
            if(!lines) {
                return
            }

            this.txtBox = new TextBoxUI(this, lines, 'ana_avatar')
        }
    }

    update() {

        if (
            this.txtBox && 
            this.txtBox.isToPressSpace() && 
            Phaser.Input.Keyboard.JustDown(this.cursors.space!)
        ) {
            const lines = this.getNextLines()

            if (!lines) {
                this.txtBox.destroy()
                this.txtBox = undefined
                return
            }
            this.txtBox.setText(lines)
        }

        const toTalk = this.avatar.hasAnaNPC() && Phaser.Input.Keyboard.JustDown(this.cursors.space!)
        if (toTalk) {
            let lines = [
                'Buki maria, tu precisa ir atrás de outro balão!!!'
            ]
            if (this.avatarStorage.hasLetter()) {
                const letterId = this.avatarStorage.getLetter();
                const letter = this.letterStorage.searchById(letterId!)
                lines = letter!.lines
                this.avatarStorage.removeLetter()
                this.letterStorage.removeById(letterId!)
                sceneEvents.emit(sceneEventsEnum.DESTROY_LETTER)
            }
            
            this.txtBox = new TextBoxUI(this, lines, 'ana_avatar')
            return
        }


        if (!this.txtBox && !toTalk) {
            this.avatar.update(this.cursors)
        }

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

    private handleAvatarAnaCollision(avatar: Phaser.GameObjects.GameObject, anaGameObject: Phaser.GameObjects.GameObject) {
        const ana = anaGameObject as AnaNPC
        this.avatar.setAnaNPC(ana)
    }

    private getNextLines():string[] | undefined {
        const scriptTexts = this.scriptTexts.splice(0,1)
        return scriptTexts.length === 1 ? scriptTexts[0] : undefined 
    }
}