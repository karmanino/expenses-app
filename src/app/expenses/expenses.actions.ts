import { createAction, props } from '@ngrx/store';
import { Movement } from '../models/movement.model';

export const saveMovement = createAction('[Expenses] Save new movement',
props<{movement: Movement}>());

export const setMovements = createAction('[Expenses] Get movements',
props<{movements: Movement[]}>());

export const unsetMovements = createAction('[Expenses] Unset movements');