import { createAction, props } from '@ngrx/store';
import { Movement } from '../models/movement.model';

export const saveMovement = createAction('[Expenses] Save new movement',
props<{movement: Movement}>());