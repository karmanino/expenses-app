import { createReducer, on } from '@ngrx/store';
import { Movement } from '../models/movement.model';
import * as actions from './expenses.actions';

export interface State {
  movements: Movement[];
}

export const initialState: State = {
  movements: [],
};

const _expensesReducer = createReducer(
  initialState,

  on(actions.saveMovement, (state, movement) => {
    console.log('movement', movement)
    let newMovements = [...state.movements];
    newMovements.push(movement.movement);
    return { movements: newMovements };
  })
);

export function expensesReducer(state: any, action: any) {
  return _expensesReducer(state, action);
}
