import { Routes } from '@angular/router';
import { DetailComponent } from '../expenses/detail/detail.component';
import { ExpensesComponent } from '../expenses/expenses.component';
import { StatsComponent } from '../expenses/stats/stats.component';

export const dashboardRoutes: Routes = [
  { path: 'movement', component: ExpensesComponent },
  { path: 'detail', component: DetailComponent },
  { path: '**', component: StatsComponent },  
];
