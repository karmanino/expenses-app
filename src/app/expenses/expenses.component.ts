import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovementService } from '../services/movement.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { saveMovement } from './expenses.actions';
import { Movement } from '../models/movement.model';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styles: [],
})
export class ExpensesComponent implements OnDestroy {
  loading = false;
  uiSubscrption: Subscription = this.store.select('ui').subscribe((ui) => (this.loading = ui.isLoading));
  movementForm: FormGroup;
  type = 'income';

  constructor(
    private fb: FormBuilder,
    private movementSvc: MovementService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.movementForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.uiSubscrption.unsubscribe();
  }

  save(): void {
    if (this.movementForm.invalid) return;
    this.store.dispatch(isLoading());
    this.movementSvc
      .newMovement({ ...this.movementForm.value, type: this.type })
      .then(({id}) => {
        Swal.fire('Success!', `Movement registered: ${this.movementForm.get('description')?.value}`, 'success');
        let newMovement = new Movement(
          this.movementForm.get('description')?.value,
          this.movementForm.get('amount')?.value,
          this.type,
          id
        );
        this.movementForm.reset();
        this.store.dispatch(saveMovement({ movement: newMovement }));
      })
      .catch((error) => Swal.fire('Error', this.authService.convertErrorCodeToMessage(error.code), 'error'))
      .finally(() => this.store.dispatch(stopLoading()));
  }
}
