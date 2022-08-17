import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, skipWhile, Subscription, switchMap, take, tap } from 'rxjs';
import { AppState } from '../app.reducer';
import { setMovements } from '../expenses/expenses.actions';
import { Movement } from '../models/movement.model';
import { MovementService } from '../services/movement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userLoggedSub = new Subscription();
  nameToDisplay = '';

  constructor(private movementSvc: MovementService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userLoggedSub = this.store
      .select('auth')
      .pipe(
        filter(({ user }) => !!user?.uid),
        tap(({ user }) => this.nameToDisplay = user?.nombre!),
        switchMap(({ user }) => this.movementSvc.getMovements(user!.uid)),
        map((resp) => resp.map(({ doc }) => ({ uid: doc.id, ...(doc.data() as Movement) })))
      )
      .subscribe((res) => {
        if (res.length > 0) this.store.dispatch(setMovements({ movements: [...res] }));
      });
  }
  ngOnDestroy(): void {
    this.userLoggedSub.unsubscribe();
    this.movementSvc.unsetMovements();
  }
}
