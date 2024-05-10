import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-companies-revenue-bar-chart',
  standalone: true,
  imports: [NgxChartsModule],
  template: `
    <ngx-charts-bar-vertical
      [view]="[900, 400]"
      [results]="data"
      [xAxis]="true"
      [yAxis]="true"
      [legend]="true"
      xAxisLabel="Company name"
      yAxisLabel="Revenue"
    >
    </ngx-charts-bar-vertical>
  `,
  styles: ``,
})
export class CompaniesRevenueBarChartComponent implements OnInit {
  data: any[] = [];

  constructor(private statisticService: StatisticsService) {}

  ngOnInit(): void {
    // this.data = [
    //   {
    //     name: 'Schuppe - Block',
    //     value: 960.6,
    //   },
    //   {
    //     name: 'Willms, Deckow and Dietrich',
    //     value: 510,
    //   },
    //   {
    //     name: 'Hagenes - Fadel',
    //     value: 505.2,
    //   },
    //   {
    //     name: 'Crona - Walsh',
    //     value: 459.6,
    //   },
    //   {
    //     name: 'Wehner Inc',
    //     value: 436.8,
    //   },
    // ];
    this.statisticService.getCompaniesRevenue().subscribe((response) =>{
      this.data = response.map(it => {
        return {
          name: it.companyName,
          value: it.revenue
        }
      });
    });
  }
}
