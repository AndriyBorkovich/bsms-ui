import { Component } from '@angular/core';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ToastrService } from 'ngx-toastr';
import {
  CreateDriverRequest,
  Driver,
  EditDriverRequest,
  GetAllDriversRequest,
} from 'src/app/models/driver';
import { DriverService } from 'src/app/services/driver.service';
import { AddEditDriverModalComponent } from '../add-edit-driver-modal/add-edit-driver-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-drivers-view',
  standalone: true,
  imports: [HasAnyAppRoleDirective, MatIconModule, MatPaginatorModule],
  templateUrl: './drivers-view.component.html',
  styles: `mat-paginator {
    background-color: rgba(255, 255, 255, 0);
  }`,
})
export class DriversViewComponent {
  drivers: Driver[] = [];
  totalItems = 1;
  pageSize = 5;
  currentPage = 0;
  searchedFirstName: string = '';
  searchedLastName: string = '';
  searchedLicence: string = '';

  constructor(
    private driverService: DriverService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllDrivers();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllDrivers();
  }

  searchByFirstName(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedFirstName = element.value;
    if (
      this.searchedFirstName.length > 2 ||
      this.searchedFirstName.length === 0
    )
      this.getAllDrivers();
  }

  searchByLastName(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedLastName = element.value;
    if (this.searchedLastName.length > 2 || this.searchedLastName.length === 0)
      this.getAllDrivers();
  }

  searchByLicense(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedLicence = element.value;
    if (this.searchedLicence.length > 2 || this.searchedLicence.length === 0)
      this.getAllDrivers();
  }

  add() {
    const dialogRef = this.dialog.open(AddEditDriverModalComponent, {
      data: new Driver(0, '', '', '', ''),
    });

    dialogRef.afterClosed().subscribe((request: EditDriverRequest) => {
      if (request) {
        this.driverService
          .create(
            new CreateDriverRequest(
              request.firstName,
              request.lastName,
              request.companyId,
              request.driverLicense
            )
          )
          .subscribe((response) => {
            this.toaster.success(
              `Driver with ID ${response.id} was created`,
              'Success!'
            );
            this.getAllDrivers();
          });
      } else {
        this.toaster.warning('Create request canceled', 'Attention!');
      }
    });
  }

  edit(editedDriver: Driver) {
    const dialogRef = this.dialog.open(AddEditDriverModalComponent, {
      data: editedDriver,
    });

    dialogRef.afterClosed().subscribe((request: EditDriverRequest) => {
      if (request) {
        this.driverService.edit(request).subscribe((response) => {
          this.toaster.success(response.message, 'Success!');
          this.getAllDrivers();
        });
      } else {
        this.toaster.warning('Edit request canceled', 'Attention!');
      }
    });
  }

  delete(id: number) {
    this.driverService.delete(id).subscribe((response) => {
      this.toaster.success(response.message, 'Success!');
      this.getAllDrivers();
    });
  }

  private getAllDrivers() {
    this.driverService
      .getAll(
        new GetAllDriversRequest(
          new Pagination(this.currentPage + 1, this.pageSize),
          this.searchedFirstName,
          this.searchedLastName,
          this.searchedLicence
        )
      )
      .subscribe((response) => {
        this.drivers = response.result;
        this.totalItems = response.total;
      });
  }
}
