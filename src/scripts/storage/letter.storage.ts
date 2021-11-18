import { LetterModal } from "../modal/letter.modal"

export class LetterStorage {
  private static instace: LetterStorage

  private constructor() {}

  static getInstance(): LetterStorage {
    if (!LetterStorage.instace) {
      this.instace = new LetterStorage()
    }

    return this.instace
  }

  getLetters():LetterModal[] {
    const strLetters = localStorage.getItem('letters')
    if(!strLetters) {
        return []
    }
    const obj = JSON.parse(strLetters)
    return obj.letters
  }

  
  removeById(id:string) {
    const letters = this.getLetters()
    const index = letters.findIndex( letter => letter.id === id)
    if (index < 0) {
        return
    }

    letters.splice(index, 1)

    this.putLetters(letters)
  }

  letterTotal():number {
    return this.getLetters().length
  }

  hasLetter():boolean {
    const strLetters = localStorage.getItem('letters')
    return !!strLetters
  }

  searchById(id:string):LetterModal | undefined {
    return this.getLetters().filter( letter => letter.id === id)[0]
  }

  disableById(id:string) {
    const letters = this.getLetters().map( letter => {
        if(letter.id === id) {
            letter.isToDisplay = false
        }
        return letter
    })
    this.putLetters(letters)
  }

  populate() {
    if(this.hasLetter()) {
        return
    }

    const letters:LetterModal[] = [
      {
          id: '1',
          lines: [
              'more',
              'eu te amo muito'
          ],
          isToDisplay: true
      },
      {
          id: '2',
          lines: [
              'more',
              'está é a segunda carta'
          ],
          isToDisplay: true
      },
      {
        id: '4',
        lines: [
            'more',
            'está é a quarta carta'
        ],
        isToDisplay: true
      },
      {
        id: '5',
        lines: [
            'more',
            'está é a quinta carta'
        ],
        isToDisplay: true
      },
    ]
    this.putLetters(letters)
  }

  private putLetters(letters:LetterModal[]) {
    localStorage.setItem('letters', JSON.stringify({letters}))
  }
}
