import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData } from 'chart.js';
import { Movement } from 'src/app/models/movement.model';
import { StateLazyLoaded } from '../expenses.reducer';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styles: [],
})
export class StatsComponent implements OnInit {
  
  totalExpense = 0;
  totalIncome = 0;
  
  public doughnutChartLabels: string[] = ['Income', 'Expense'];
  public doughnutChartData: ChartData<'doughnut'> = {datasets: []}
  constructor(private store: Store<StateLazyLoaded>) {}

  ngOnInit(): void {
    this.store.select('expenses').subscribe(({ movements }) => this.getStats(movements));
  }

  getStats(movements: Movement[]) {
    movements.forEach((movement) => {
      if (movement.type === 'income') {
        this.totalIncome += movement.amount;
      } else if (movement.type === 'expense') {
        this.totalExpense += movement.amount;
      }
    });
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: [this.totalExpense, this.totalIncome] }],
    };
  }
}
