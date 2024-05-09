import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Bus,
  CreateBusReviewRequest,
  EditBusRequest,
  GetAllBusesRequest,
} from 'src/app/models/bus';
import { CommonModule, NgFor } from '@angular/common';
import { BusService } from 'src/app/services/bus.service';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditBusModalComponent } from '../edit-bus-modal/edit-bus-modal.component';
import { BusReviewModalComponent } from '../bus-review-modal/bus-review-modal.component';
import { BusReviewService } from 'src/app/services/bus-review.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, map, startWith } from 'rxjs';
import {
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-bus-view',
  templateUrl: './buses-view.component.html',
  styles: `
    mat-paginator {
      background-color: rgba(255, 255, 255, 0);
    }`,
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgFor,
    HasAnyAppRoleDirective,
    MatIconModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
})
export class BusesViewComponent implements OnInit {
  buses$: Observable<Bus[]>;
  totalItems$: Observable<number>;
  pageSize = 5;
  currentPage = 0;
  searchedBusNumber: string | null = '';
  searchedBusBrand: string | null = '';
  haveBoughtTickets: boolean = false;

  constructor(
    private busService: BusService,
    private busReviewService: BusReviewService,
    private toaster: ToastrService,
    public editDialog: MatDialog,
    public reviewDialog: MatDialog
  ) {}

  ngOnInit() {
    this.getAllBuses();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllBuses();
  }

  searchByNumber(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedBusNumber = element.value;
    if (
      this.searchedBusNumber.length > 2 ||
      this.searchedBusNumber.length === 0
    )
      this.getAllBuses();
    this.currentPage = 0;
  }

  searchByBrand(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedBusBrand = element.value;
    if (this.searchedBusBrand.length > 2 || this.searchedBusBrand.length === 0)
      this.getAllBuses();
  }

  edit(busToEdit: Bus) {
    const dialogRef = this.editDialog.open(EditBusModalComponent, {
      data: new EditBusRequest(
        busToEdit.busId,
        busToEdit.brand,
        busToEdit.number,
        busToEdit.capacity
      ),
    });

    dialogRef.afterClosed().subscribe((request: EditBusRequest) => {
      if (request) {
        this.busService.edit(request).subscribe((response) => {
          this.toaster.success(response.message, 'Success!');
          this.getAllBuses();
        });
      } else {
        this.toaster.warning('Edit request canceled', 'Attention!');
      }
    });
  }

  delete(id: number) {
    this.busService.delete(id).subscribe((response) => {
      this.toaster.success(response.message, 'Success!');
    });

    this.getAllBuses();
  }

  createReview(id: number) {
    const dialogRef = this.editDialog.open(BusReviewModalComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe((request: CreateBusReviewRequest) => {
      if (request) {
        this.busReviewService.create(request).subscribe((response) => {
          this.toaster.success(
            `Review #${response.id} was submited`,
            'Success!'
          );
          this.getAllBuses();
        });
      } else {
        this.toaster.warning('Review creation was canceled', 'Attention!');
      }
    });
  }

  onTicketsFlagChange() {
    this.haveBoughtTickets = !this.haveBoughtTickets;
    this.getAllBuses();
  }

  private getAllBuses() {
    const response$ = this.busService.getAll(
      new GetAllBusesRequest(
        new Pagination(this.currentPage + 1, this.pageSize),
        this.searchedBusBrand,
        this.searchedBusNumber,
        this.haveBoughtTickets
      )
    );

    this.buses$ = response$.pipe(map((response) => response.result));
    this.totalItems$ = response$.pipe(
      map((response) => response.total),
      startWith(0)
    );
  }
}
