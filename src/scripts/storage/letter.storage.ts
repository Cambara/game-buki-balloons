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
              'Não estou tão longe de onde a Buki me achaste.',
              'Mas ande logo, pois quando menos se espera eu serei',
              'utilizada para viagens.'
          ],
          isToDisplay: true
      },
      {
          id: '2',
          lines: [
              'Sou bem grande e ocupo muito espaço, por isso acabei aqui.',
              'Mas não se esqueça que minha posição',
              'é de destaque e sou uma maravilha.'
          ],
          isToDisplay: true
      },
      {
        id: '3',
        lines: [
          'Sou uma aquisição antiga do OLX',
          'e tenho uma história bem engraçada a respeito.'
        ],
        isToDisplay: true
      },
      {
        id: '4',
        lines: [
          'Estou em um local de grande destaque,',
          'ao pé de uma coleção gigantesca.'
        ],
        isToDisplay: true
      },
      {
        id: '5',
        lines: [
            'Tu acabaste de passar por mim,',
            'não devo ter sido muito notado.',
            'Porém, sou muito utilizado no dia a dia.'
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
