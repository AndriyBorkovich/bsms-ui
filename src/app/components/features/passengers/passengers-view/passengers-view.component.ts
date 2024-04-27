import { Component, OnInit } from '@angular/core';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ToastrService } from 'ngx-toastr';
import {
  CreatePassengerRequest,
  GetAllPassengersRequest,
  Passenger,
} from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { AddEditPassengerModalComponent } from '../add-edit-passenger-modal/add-edit-passenger-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-passengers-view',
  standalone: true,
  imports: [MatIconModule, MatPaginatorModule, HasAnyAppRoleDirective],
  templateUrl: './passengers-view.component.html',
  styles: `
    mat-paginator {
      background-color: rgba(255, 255, 255, 0);
    }`,
})
export class PassengersViewComponent implements OnInit {
  passengers: Passenger[] = [];
  totalItems = 1;
  pageSize = 10;
  currentPage = 0;
  searchedFirstName: string = '';
  searchedLastName: string = '';

  constructor(
    private passengerService: PassengerService,
    public dialog: MatDialog,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPassengers();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllPassengers();
  }

  searchByFirstName(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedFirstName = element.value;
    if (
      this.searchedFirstName.length > 2 ||
      this.searchedFirstName.length === 0
    )
      this.getAllPassengers();
  }

  searchByLastName(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedLastName = element.value;
    if (this.searchedLastName.length > 2 || this.searchedLastName.length === 0)
      this.getAllPassengers();
  }

  add() {
    const dialogRef = this.dialog.open(AddEditPassengerModalComponent, {
      data: new Passenger(0, '', '', '', ''),
    });

    dialogRef.afterClosed().subscribe((request: Passenger) => {
      if (request) {
        this.passengerService
          .create(
            new CreatePassengerRequest(
              request.firstName,
              request.lastName,
              request.phoneNumber,
              request.email
            )
          )
          .subscribe((response) => {
            this.toaster.success(
              `Passenger with ID ${response.id} was created`,
              'Success!'
            );
            this.getAllPassengers();
          });
      } else {
        this.toaster.warning('Create request canceled', 'Attention!');
      }
    });
  }

  edit(editedPassenger: Passenger) {
    console.log(editedPassenger);
    const dialogRef = this.dialog.open(AddEditPassengerModalComponent, {
      data: editedPassenger
    });

    dialogRef.afterClosed().subscribe((request: Passenger) => {
      if (request) {
        console.log(request);
        this.passengerService.edit(request).subscribe((response) => {
          this.toaster.success(response.message, 'Success!');
          this.getAllPassengers();
        });
      } else {
        this.toaster.warning('Edit request canceled', 'Attention!');
      }
    });
  }

  delete(id: number) {
    this.passengerService.delete(id).subscribe((response) => {
      this.toaster.success(response.message, 'Success!');
    });
  }

  private getAllPassengers() {
    this.passengerService
      .getAll(
        new GetAllPassengersRequest(
          new Pagination(this.currentPage + 1, this.pageSize),
          this.searchedFirstName,
          this.searchedLastName
        )
      )
      .subscribe((response) => {
        this.passengers = response.result;
        console.log(this.passengers);
        this.totalItems = response.total;
      });
  }
}
