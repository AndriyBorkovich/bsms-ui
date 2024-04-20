import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bus, GetAllBusesRequest } from 'src/app/models/bus';
import { CommonModule, NgFor } from '@angular/common';
import { BusService } from 'src/app/services/bus.service';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-bus-view',
  templateUrl: './buses-view.component.html',
  styleUrls: ['./buses-view.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    HasAnyAppRoleDirective,
    MatIconModule,
    MatPaginatorModule,
  ],
})
export class BusesViewComponent implements OnInit {
  buses: Bus[] = [];
  totalItems = 1;
  pageSize = 10;
  currentPage = 0; // mat-paginator count from 0
  searchedBusNumber: string | null = "";
  searchedBusBrand: string | null = "";

  constructor(private busService: BusService) {}

  ngOnInit() {
    this.getAllBuses();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllBuses();
  }

  searchByNumber(target: EventTarget) {
    const element = target as HTMLInputElement
    this.searchedBusNumber = element.value;
    if(this.searchedBusNumber.length > 2 || this.searchedBusNumber.length === 0)
      this.getAllBuses();
  }

  searchByBrand(target: EventTarget) {
    const element = target as HTMLInputElement
    this.searchedBusBrand = element.value;
    if(this.searchedBusBrand.length > 2 || this.searchedBusBrand.length === 0)
      this.getAllBuses();
  }

  private getAllBuses() {
    this.busService
      .getAll(
        new GetAllBusesRequest(
          new Pagination(this.currentPage + 1, this.pageSize),
          this.searchedBusBrand,
          this.searchedBusNumber
        )
      )
      .subscribe((response) => {
        this.buses = response.result;
        this.totalItems = response.total;
      });
  }
}
