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

  on(actions.saveMovement, (state, { movement }) => {
    let newMovements = [...state.movements];
    newMovements.push(movement);
    return { ...state, movements: newMovements };
  }),

  on(actions.setMovements, (state, { movements }) => ({ ...state, movements: [...movements] })),
  on(actions.unsetMovements, (state) => ({ ...state, movements: [] }))
);

export function expensesReducer(state: any, action: any) {
  return _expensesReducer(state, action);
}
