import Phaser from 'phaser'

export const sceneEvents = new Phaser.Events.EventEmitter()

export enum sceneEventsEnum {
   'ADD_OR_DESTROY_LETTER' = 'add-or-destroy-letter'
}

