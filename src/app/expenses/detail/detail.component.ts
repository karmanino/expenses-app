import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Movement } from 'src/app/models/movement.model';
import { orderByCreation } from 'src/app/pipes/orderByCreation.pipe';
import { MovementService } from 'src/app/services/movement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  movements: Movement[] = [];
  updateMovementsSub = new Subscription();

  constructor(private store: Store<AppState>, private movementsSvc: MovementService) {}

  ngOnInit(): void {
    this.updateMovementsSub = this.store.select('expenses').subscribe(({ movements }) => (this.movements = movements));
  }
  ngOnDestroy(): void {
    this.updateMovementsSub.unsubscribe();
  }

  deleteMovement(uid: string){
    this.movementsSvc.deleteMovement(uid).then(() => {
      Swal.fire('The Internet?', 'That thing is still around?', 'question');
    })
  }

}
