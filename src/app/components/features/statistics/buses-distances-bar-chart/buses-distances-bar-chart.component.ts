import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-buses-distances-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  template: `
    <ngx-charts-bar-vertical
      [view]="[1200, 400]"
      [results]="data"
      [xAxis]="true"
      [yAxis]="true"
      [legend]="true"
      xAxisLabel="Bus number"
      yAxisLabel="Total distance"
    >
    </ngx-charts-bar-vertical>
  `,
  styles: ``,
})
export class BusesDistancesBarChartComponent implements OnInit {
  data: any[] = [];
  constructor(private statisticService: StatisticsService) {}
  ngOnInit(): void {
    this.statisticService.getBusDistances().subscribe((response) =>{
      console.log(response);
      this.data = response.map(it => {
        return {
          name: it.busNumber,
          value: it.distanceTravelled
        }
      });
    });
  }
}
