import { createFauneAnim } from "../avatars/faune/faune.anim";
import Faune from "../avatars/faune/faune.avatar";
import { createBallonAnims } from "../items/balloon/balloon.anim";
import BallonItem from "../items/balloon/balloon.item";
import AnaNPC from "../npcs/ana/ana.npc";
import { createWindAnims } from "../npcs/wind/wind.anim";
import WindNPC from "../npcs/wind/wind.npc";
import TextBoxUI from "../ui/text-box.ui";

export default class TempScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Faune
    private txtBox?:TextBoxUI
    private blowupSound: Phaser.Sound.BaseSound
    private winds: Phaser.Physics.Arcade.Group

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
            key: 'TempScene'
        })
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.blowupSound = this.sound.add('balloon-blowup', {
            volume: 100
        })
    }

    create() {
        this.scene.run('top-menu')
        createFauneAnim(this.anims)
        createBallonAnims(this.anims)
        createWindAnims(this.anims)

        this.faune = this.add.faune(50, 50, 'faune');
        const lines = this.getNextLines()

        if (!lines) {
            return
        }

        //this.txtBox = new TextBoxUI(this, lines, 'ana_avatar')
        
        const ballons = this.physics.add.staticGroup({
            classType: BallonItem
        })

        ballons.get(300, 300, 'balloon')
        
        this.physics.add.collider(this.faune, ballons, this.handleAvatarBallonCollision, undefined, this)
        
        const anas = this.physics.add.staticGroup({
            classType: AnaNPC,
            createCallback: (go) => {
                const anaNPC = go as AnaNPC
                anaNPC.scale = 1.2;
            }
        })

        anas.get(100, 250, 'ana')

        this.physics.add.collider(this.faune, anas, this.handleAvatarAnaCollision, undefined, this)

        this.winds = this.physics.add.group({
            classType: WindNPC,
            createCallback: (go) => {
                const wind = go as WindNPC
                wind.body.onCollide = true
            }         
        })

        this.winds.get(300, 50)
        this.physics.add.collider(this.faune, this.winds, this.handleAvatarWindCollision, undefined, this)
        

    }

    update() {
        if (this.faune && !this.txtBox) {
            if (this.faune.hasAnaNPC() && Phaser.Input.Keyboard.JustDown(this.cursors.space!)) {
                const lines = [
                    'Buki maria, tu precisa ir atrás de outro balão!!!'
                ]
                this.txtBox = new TextBoxUI(this, lines, 'ana_avatar')
                return
            }

            this.faune.update(this.cursors)
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
        
        ballon.setBlowupSound(this.blowupSound)
        ballon.setLetterNumber(10)
        this.faune.setActiveBalloon(ballon)
    }

    private handleAvatarAnaCollision(avatar: Phaser.GameObjects.GameObject, anaGameObject: Phaser.GameObjects.GameObject) {
        const ana = anaGameObject as AnaNPC
        this.faune.setAnaNPC(ana)
    }

    private handleAvatarWindCollision(avatar: Phaser.GameObjects.GameObject, windGameObject: Phaser.GameObjects.GameObject) {
        this.faune.setPosition(500, 300)
    }
}