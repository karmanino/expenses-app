import { Injectable } from '@angular/core';
import * as auth from '@angular/fire/auth';
import * as firestore from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, take } from 'rxjs';
import * as authActions from '../auth/auth.actions';
import * as expensesActions from '../expenses/expenses.actions';
import { Movement } from '../models/movement.model';
import { User } from '../models/user.model';
import { MovementService } from './movement.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private activeUser: User | null = null;

  get user() {
    return { ...this.activeUser };
  }

  constructor(public auth: auth.Auth, private firestore: firestore.Firestore, private store: Store) {}

  initAuthListener() {
    auth.authState(this.auth).subscribe((fuser) => {
      if (fuser?.email) {
        const doc = firestore.doc(this.firestore, `${fuser?.uid}/user`);
        firestore
          .docData(doc)
          .pipe(take(1))
          .subscribe((res) => {
            this.activeUser = User.fromFirebase(fuser.uid, res['name'], res['email'], res['avatarId']);
            this.store.dispatch(authActions.setUser({ user: { ...this.activeUser! } }));
          });
      } else {
        this.activeUser = null;
        this.store.dispatch(authActions.unsetUser());
      }
    });
  }

  createUser(username: string, email: string, password: string, avatarId: number) {
    return auth.createUserWithEmailAndPassword(this.auth, email, password).then(({ user }) => {
      const newUser = new User(user.uid, username, email, avatarId);
      return firestore.setDoc(firestore.doc(this.firestore, `${user.uid}/user`), { ...newUser });
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
