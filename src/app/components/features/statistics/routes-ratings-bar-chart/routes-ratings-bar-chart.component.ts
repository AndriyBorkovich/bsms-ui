import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-routes-ratings-bar-chart',
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
      yAxisLabel="Average bus rating"
    >
    </ngx-charts-bar-vertical>
  `,
  styles: ``,
})
export class RoutesRatingsBarChartComponent implements OnInit {
  data: any[];
  constructor(private statisticService: StatisticsService) {}
  ngOnInit(): void {
    this.statisticService.getRoutesByBusRating().subscribe((response) => {
      this.data = response.map((it) => {
        return {
          name: it.routeName,
          value: it.averageBusRating,
        };
      });
    });
  }
}
