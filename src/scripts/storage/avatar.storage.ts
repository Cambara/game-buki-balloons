import { CheckPointModal } from "../modal/check-point.modal"

export class AvatarStorage {
  private static instace: AvatarStorage

  private constructor() {}

  static getInstance(): AvatarStorage {
    if (!AvatarStorage.instace) {
      this.instace = new AvatarStorage()
    }

    return this.instace
  }

  putLetter(letter:string) {
    localStorage.setItem('letter', letter)
  }

  removeLetter() {
    localStorage.removeItem('letter')
  }

  getLetter():string | null {
    return localStorage.getItem('letter')
  }

  hasLetter():boolean {
    return !!this.getLetter()
  }

  putCheckPoint(checkPoint:CheckPointModal) {
    localStorage.setItem('checkPoint', JSON.stringify(checkPoint))
  }

  getCheckPoint():CheckPointModal | null {
    const cP = localStorage.getItem('checkPoint')
    return cP ? JSON.parse(cP): null
  }

  isStartGame():boolean {
    const isStartGame = localStorage.getItem('isStartGame')

    if (!isStartGame) {
      localStorage.setItem('isStartGame', '1')
    }
    return !!isStartGame
  }

  getTutorial():string[][]  {
    return [
      [
        'Buuuuuki',
        'Eu estou a precisar de uma ajudinha sua...',
      ],
      [
        'O damo espalhou balões pela casa com cartinhas dentro.',
        'E tu precisas estourar os balões e me trazer elas,',
        'pois só assim eu consigo receber as minhas prendas.'
      ],
      [
        'Eu sei que tem um balão aqui no porão, comece já por ele.',
        'Boa sorte minha princesa megalona e ',
        'cuidado pois a casa está cheia de desafios.'
      ]
    ]
  }
}
