import { Component } from '@angular/core';
import { PaymentTypesPieChartComponent } from '../payment-types-pie-chart/payment-types-pie-chart.component';
import { CompaniesRevenueBarChartComponent } from '../companies-revenue-bar-chart/companies-revenue-bar-chart.component';
import { RoutesRatingsBarChartComponent } from '../routes-ratings-bar-chart/routes-ratings-bar-chart.component';
import { RoutesRevenueBarChartComponent } from '../routes-revenue-bar-chart/routes-revenue-bar-chart.component';
import { BusesDistancesBarChartComponent } from '../buses-distances-bar-chart/buses-distances-bar-chart.component';

@Component({
  selector: 'app-stats-view',
  standalone: true,
  imports: [
    PaymentTypesPieChartComponent,
    CompaniesRevenueBarChartComponent,
    RoutesRatingsBarChartComponent,
    RoutesRevenueBarChartComponent,
    BusesDistancesBarChartComponent,
  ],
  templateUrl: './stats-view.component.html',
  styles: ``,
})
export class StatsViewComponent {}
