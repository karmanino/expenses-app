import { Injectable } from '@angular/core';
import * as firestore from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, pipe, Subscription, take } from 'rxjs';
import { AppState } from '../app.reducer';
import { setMovements, unsetMovements } from '../expenses/expenses.actions';
import { Movement } from '../models/movement.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(
    private firestore: firestore.Firestore,
    private authService: AuthService,
    private store: Store<AppState>
  ) {}

  newMovement(movement: Movement) {
    const collection = firestore.collection(this.firestore, `${this.authService.user.uid}/movements/items`);
    return firestore.addDoc(collection, { ...movement });
  }

  getMovements(uid: string) {
    const collection = firestore.collection(this.firestore, `${uid}/movements/items`);
    return firestore.sortedChanges(collection).pipe(distinctUntilChanged());
  }

  deleteMovement(uid: string) {
    return firestore.deleteDoc(firestore.doc(this.firestore, `${this.authService.user.uid}/movements/items/${uid}`));
  }

  unsetMovements() {
    this.store.dispatch(unsetMovements());
  }
}
