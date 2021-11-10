export class AvatarStorage {
  private static instace: AvatarStorage

  private constructor() {}

  static getInstance(): AvatarStorage {
    if (!AvatarStorage.instace) {
      this.instace = new AvatarStorage()
    }

    return this.instace
  }


  hasLetter():boolean {
    return !!localStorage.getItem('hasLetter')
  }

  addOrRemoveLetter() {
    if (!this.hasLetter()) {
        this.addLetter()
        return
    }

    this.removeLetter()
  }

  private addLetter() {
    localStorage.setItem('hasLetter', '1')
  }

  private removeLetter() {
    localStorage.removeItem('hasLetter')
  }
}
