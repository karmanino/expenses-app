export class User {
  constructor(public uid: string, public name: string, public email: string, public avatarId: number) {}

  static fromFirebase(uuid: string, name: string, email: string, avatarId: number) {
    return new User(uuid, name, email, avatarId);
  }

}
