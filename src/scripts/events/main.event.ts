import Phaser from 'phaser'

export const sceneEvents = new Phaser.Events.EventEmitter()

export enum sceneEventsEnum {
   'ADD_LETTER' = 'addletter',
   'DESTROY_LETTER' = 'destroy-letter'
}

