import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { DashboardRouting } from '../dashboard/dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { orderByCreation } from '../pipes/orderByCreation.pipe';
import { SharedModule } from '../shared/shared.module';
import { DetailComponent } from './detail/detail.component';
import { ExpensesComponent } from './expenses.component';
import { StatsComponent } from './stats/stats.component';

import { StoreModule } from '@ngrx/store';
import { expensesReducer } from './expenses.reducer';

@NgModule({
  declarations: [DashboardComponent, DetailComponent, StatsComponent, ExpensesComponent, orderByCreation],
  imports: [CommonModule, StoreModule.forFeature('expenses',expensesReducer), RouterModule, ReactiveFormsModule, NgChartsModule, SharedModule, DashboardRouting],
  exports: [DashboardComponent],
})
export class ExpensesModule {}
