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
}
