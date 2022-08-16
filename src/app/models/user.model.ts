export class User {
  constructor(public uid: string, public nombre: string, public email: string) {}

  static fromFirebase(uuid: string, name: string, email: string) {
    return new User(uuid, name, email);
  }

}
