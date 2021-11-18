import { createBukiAnim } from "../avatars/buki/buki.anim";
import Buki from "../avatars/buki/buki.avatar";
import { sceneEvents, sceneEventsEnum } from "../events/main.event";
import { createBallonAnims } from "../items/balloon/balloon.anim";
import BallonItem from "../items/balloon/balloon.item";
import AnaNPC from "../npcs/ana/ana.npc";
import { createWindAnims } from "../npcs/wind/wind.anim";
import WindNPC from "../npcs/wind/wind.npc";
import { AvatarStorage } from "../storage/avatar.storage";
import { LetterStorage } from "../storage/letter.storage";
import TextBoxUI from "../ui/text-box.ui";
import { StagesEnum } from "./stages.enum";

export default class TempScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private avatar!: Buki
    private txtBox?:TextBoxUI
    private blowupSound: Phaser.Sound.BaseSound
    private winds: Phaser.Physics.Arcade.Group
    private avatarStorage:AvatarStorage
    private letterStorage:LetterStorage

    private scriptTexts = [
        ['oi'],
        [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 
            'Quisque vitae dapibus odio. Sed sit amet justo eu velit tincidunt',
            'pretium. Duis blandit erat id lectus viverra congue. Suspendisse',
            'cursus vel est at gravida.'
        ],
        [
            'Olha que agora eu quero andar',
            'adeus!!!'
        ]
    ]

    constructor() {
        super({
            key: 'BasementScene'
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
        createWindAnims(this.anims)

        this.avatar = this.add.buki(50, 50, 'buki');
        const lines = this.getNextLines()

        if (!lines) {
            return
        }

        //this.txtBox = new TextBoxUI(this, lines, 'ana_avatar')
        
        const ballons = this.physics.add.staticGroup({
            classType: BallonItem,
            createCallback: (go) => {
                const ballon = go as BallonItem
                ballon.setBlowupSound(this.blowupSound)
                ballon.setLetterNumber(10)
            }
        })

        ballons.get(300, 300, 'balloon')
        
        this.physics.add.collider(this.avatar, ballons, this.handleAvatarBallonCollision, undefined, this)
        
        const anas = this.physics.add.staticGroup({
            classType: AnaNPC,
            createCallback: (go) => {
                const anaNPC = go as AnaNPC
                anaNPC.scale = 1.2;
            }
        })

        anas.get(100, 250, 'ana')

        this.physics.add.collider(this.avatar, anas, this.handleAvatarAnaCollision, undefined, this)

        this.winds = this.physics.add.group({
            classType: WindNPC,
            createCallback: (go) => {
                const wind = go as WindNPC
                wind.setWindVelocity(300)
                wind.body.onCollide = true
            }         
        })

        this.winds.get(300, 50)
        this.physics.add.collider(this.avatar, this.winds, this.handleAvatarWindCollision, undefined, this)
        
        const rec = this.add.rectangle(250, 250, 32, 32, 0x6666ff)
        rec.alpha = 0;
        const spawnGroup = this.physics.add.group()
        spawnGroup.add(rec)
        this.physics.add.overlap(this.avatar, spawnGroup, this.handleSpawnEvent, undefined, this)

    }

    update() {
        if (this.avatar && !this.txtBox) {
            if (this.avatar.hasAnaNPC() && Phaser.Input.Keyboard.JustDown(this.cursors.space!)) {
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

            this.avatar.update(this.cursors)
        }

        if (this.txtBox && this.txtBox.isToPressSpace() && Phaser.Input.Keyboard.JustDown(this.cursors.space!)) {
            const lines = this.getNextLines()

            if (!lines) {
                this.txtBox.destroy()
                this.txtBox = undefined
                return
            }
            this.txtBox.setText(lines)
        }
        
    }

    private getNextLines():string[] | undefined {
        const scriptTexts = this.scriptTexts.splice(0,1)
        return scriptTexts.length === 1 ? scriptTexts[0] : undefined 
    }

    private handleAvatarBallonCollision(avatar: Phaser.GameObjects.GameObject, ballonGameObject: Phaser.GameObjects.GameObject) {
        const ballon = ballonGameObject as BallonItem
        this.avatar.setActiveBalloon(ballon)
    }

    private handleAvatarAnaCollision(avatar: Phaser.GameObjects.GameObject, anaGameObject: Phaser.GameObjects.GameObject) {
        const ana = anaGameObject as AnaNPC
        this.avatar.setAnaNPC(ana)
    }

    private handleAvatarWindCollision(avatar: Phaser.GameObjects.GameObject, windGameObject: Phaser.GameObjects.GameObject) {
        this.avatar.setPosition(500, 300)
    }

    private handleSpawnEvent(avatar: Phaser.GameObjects.GameObject, windGameObject: Phaser.GameObjects.GameObject) {
        this.avatarStorage.putCheckPoint({
            key: 'hall_door_2',
            stage: StagesEnum.HALL
        })
        this.scene.start(StagesEnum.HALL);
    }
}