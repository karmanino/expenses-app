import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as expenses from './expenses/expenses.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  expenses: expenses.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  expenses: expenses.expensesReducer,
};
