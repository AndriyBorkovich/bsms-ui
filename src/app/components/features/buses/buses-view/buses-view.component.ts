import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus';
import { CommonModule, NgFor } from '@angular/common';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-bus-view',
  templateUrl: './buses-view.component.html',
  styleUrls: ['./buses-view.component.css'],
  standalone: true,
  imports: [CommonModule, NgFor]
})
export class BusesViewComponent implements OnInit {

  buses: Bus[] = [];
  constructor(private busService: BusService) { }

  ngOnInit() {
    this.busService.getAll().subscribe((result) => {
      this.buses = result;
    });
  }

}
