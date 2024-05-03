import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { TripService } from 'src/app/services/trip.service';
import { GetAllTripsRequest, Trip } from 'src/app/models/trip';
import { Observable, Subscription, interval, map, startWith } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule }  from '@angular/material/progress-spinner'
@Component({
  selector: 'app-trips-view',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    HasAnyAppRoleDirective,
    MatIconModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './trips-view.component.html',
  styles:  `
  mat-paginator {
    background-color: rgba(255, 255, 255, 0);
  }`,
})
export class TripsViewComponent implements OnInit, OnDestroy {
  trips$: Observable<Trip[]>;
  total$: Observable<number>;
  totalItems = 1;
  pageSize = 5;
  currentPage = 0;
  searchedRoute: string | null = '';
  searchedStatus: string | null = '';
  statusOptions: string[] = ['Scheduled', 'InTransit', 'Delayed', 'Completed', 'Cancelled'];
  refreshTripsJob: Subscription;
  currentDate: Date = new Date();

  constructor(private tripService: TripService) {}
  
  ngOnInit() {
    this.getAllTrips();
    this.refreshTripsJob = interval(40000).subscribe(() => {
      this.getAllTrips();
    });
  }

  ngOnDestroy(): void {
   this.refreshTripsJob.unsubscribe();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllTrips();
  }

  searchByRoute(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedRoute = element.value;
    if (
      this.searchedRoute.length > 2 ||
      this.searchedRoute.length === 0
    ) { 
      this.getAllTrips();
      this.currentPage = 0;
    }
  }

  onStatusSelectionChange(value: string) {
    if (value) {
      this.getAllTrips();
    }
  }

  buyTicket() {

  }

  private getAllTrips() {
    const response$ = this.tripService
      .getAll(
        new GetAllTripsRequest(
          this.searchedRoute,
          this.searchedStatus,
          new Pagination(this.currentPage + 1, this.pageSize)
        )
      );
    this.trips$ = response$.pipe(map(response => response.result));
    this.total$ = response$.pipe(
      map(response => response.total),
      startWith(0)
    );
  }
}
