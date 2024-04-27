import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Bus, EditBusRequest, GetAllBusesRequest } from 'src/app/models/bus';
import { CommonModule, NgFor } from '@angular/common';
import { BusService } from 'src/app/services/bus.service';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { EditBusModalComponent } from '../edit-bus-modal/edit-bus-modal.component';

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
  ],
})
export class BusesViewComponent implements OnInit {
  buses: Bus[] = [];
  totalItems = 1;
  pageSize = 10;
  currentPage = 0; // mat-paginator count from 0
  searchedBusNumber: string | null = '';
  searchedBusBrand: string | null = '';

  constructor(
    private busService: BusService,
    private toaster: ToastrService,
    public dialog: MatDialog
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
  }

  searchByBrand(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedBusBrand = element.value;
    if (this.searchedBusBrand.length > 2 || this.searchedBusBrand.length === 0)
      this.getAllBuses();
  }

  edit(busToEdit: Bus) {
    const dialogRef = this.dialog.open(EditBusModalComponent, {
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
