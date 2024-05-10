import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-payment-types-pie-chart',
  standalone: true,
  imports: [NgxChartsModule],
  template: `
    <ngx-charts-pie-chart
      [view]="[700, 400]"
      [results]="data"
      [doughnut]="false"
      [explodeSlices]="true"
      [legend]="true"
    >
    </ngx-charts-pie-chart>
  `,
  styles: ``,
})
export class PaymentTypesPieChartComponent implements OnInit {
  data: any[];
  constructor(private statisticService: StatisticsService) {}
  ngOnInit(): void {
    this.statisticService.getTicketsByType().subscribe((response) => {
      this.data = response.map((it) => {
        return {
          name: it.typeName,
          value: it.count,
        };
      });
    });
  }
}
