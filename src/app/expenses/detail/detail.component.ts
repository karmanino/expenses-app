import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Movement } from 'src/app/models/movement.model';
import { MovementService } from 'src/app/services/movement.service';
import Swal from 'sweetalert2';
import { StateLazyLoaded } from '../expenses.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  movements: Movement[] = [];
  updateMovementsSub = new Subscription();

  constructor(private store: Store<StateLazyLoaded>, private movementsSvc: MovementService) {}

  ngOnInit(): void {
    this.updateMovementsSub = this.store.select('expenses').subscribe(({ movements }) => (this.movements = movements));
  }
  ngOnDestroy(): void {
    this.updateMovementsSub.unsubscribe();
  }

  deleteMovement(uid: string) {
    Swal.fire({
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });
    this.movementsSvc.deleteMovement(uid).then(() => {
      Swal.fire('Success', 'Movement deleted', 'success');
    });
  }
}
