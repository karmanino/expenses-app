import { Injectable } from '@angular/core';
import * as firestore from '@angular/fire/firestore';
import { Movement } from '../models/movement.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private firestore: firestore.Firestore, private authService: AuthService) {}

  newMovement(movement: Movement) {
    const collection = firestore.collection(this.firestore, `${this.authService.user.uid}/movements/items`);
    return firestore.addDoc(collection, { ...movement });
  }
}
