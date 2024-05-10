import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-routes-revenue-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  template: `
     <ngx-charts-bar-vertical
      [view]="[1200, 400]"
      [results]="data"
      [xAxis]="true"
      [yAxis]="true"
      [legend]="true"
      xAxisLabel="Route"
      yAxisLabel="Revenue">
    </ngx-charts-bar-vertical>
  `,
  styles: ``
})
export class RoutesRevenueBarChartComponent implements OnInit {
  data: any[];
  constructor(private statisticService: StatisticsService) {}
  ngOnInit(): void {
    this.statisticService.getRoutesRevenue().subscribe((response) => {
      this.data = response.map((it) => {
        return {
          name: it.routeName,
          value: it.totalRevenue,
        };
      });
    });
  }
}
