import { Injectable } from '@angular/core';
import * as auth from '@angular/fire/auth';
import * as firestore from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public auth: auth.Auth, private firestore: firestore.Firestore) {}

  initAuthListener() {
    auth.authState(this.auth).subscribe((fuser) => {
      if (fuser?.email) {
        console.log('existe');
      } else {
        console.log('no existe papucho');
      }
    });
  }

  createUser(username: string, email: string, password: string) {
    return auth.createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new User(user.uid, username, email);
      return firestore.setDoc(firestore.doc(this.firestore, `${user.uid}/user`), {...newUser});
    });
  }

  loginUser(email: string, password: string) {
    return auth.signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser() {
    return auth.signOut(this.auth);
  }

  isAuth() {
    return auth.authState(this.auth).pipe(map((v) => !!v));
  }

  convertErrorCodeToMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'This e-mail address is already in use.';
      case 'auth/weak-password':
        return 'The password is too short or too weak.';
      case 'auth/user-not-found':
        return 'This e-mail is not registered.';
      case 'auth/invalid-email':
        return 'This e-mail is not valid.';
      default:
        return 'An error has occurred.';
    }
  }
}
