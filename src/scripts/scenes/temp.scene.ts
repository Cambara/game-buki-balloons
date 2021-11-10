import { createFauneAnim } from "../avatars/faune/faune.anim";
import Faune from "../avatars/faune/faune.avatar";

export default class TempScene extends Phaser.Scene {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private faune!: Faune
    constructor() {
        super({
            key: 'TempScene'
        })
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    create() {
        createFauneAnim(this.anims)
        this.faune = this.add.faune(50, 50, 'faune');
    }

    update() {
        if (this.faune) {
            this.faune.update(this.cursors)
        }
    }
}