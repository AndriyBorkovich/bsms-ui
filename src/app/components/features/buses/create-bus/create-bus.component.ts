import { Component, OnInit } from '@angular/core';
import { CompanyShortInfo } from 'src/app/models/company';
import { DriverShortInfo } from 'src/app/models/driver';
import { CompanyService } from 'src/app/services/company.service';
import { DriverService } from 'src/app/services/driver.service';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { BusScheduleViewComponent } from '../bus-schedule-view/bus-schedule-view.component';
import { RouteShortInfo } from 'src/app/models/route';
import { CreateBusRequest, CreateBusScheduleRequest } from 'src/app/models/bus';
import { RouteService } from 'src/app/services/route.service';
import { DayOfWeek, Direction } from 'src/app/models/enums';
import { BusService } from 'src/app/services/bus.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-bus',
  standalone: true,
  imports: [MatSelectModule, NgIf, BusScheduleViewComponent, FormsModule],
  templateUrl: './create-bus.component.html',
  styleUrl: './create-bus.component.scss',
})
export class CreateBusComponent implements OnInit {
  drivers: DriverShortInfo[] = [];
  companies: CompanyShortInfo[] = [];
  routes: RouteShortInfo[] = [];
  busScheduleEntries: CreateBusScheduleRequest[] = [];

  choosedDriverId: number = 0;
  enteredBrand: string = '';
  enteredBusNumber: string = '';
  enteredSeatsCount: number = 5;
  choosedRouteId: number = 0;

  constructor(
    private companyService: CompanyService,
    private driverService: DriverService,
    private routeService: RouteService,
    private busService: BusService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyService.getAllShortInfo().subscribe((response) => {
      this.companies = response;
    });

    this.routeService.getAll().subscribe((response) => {
      this.routes = response;
    });
  }

  onCompanySelectionChange(value: number) {
    if (value) {
      this.driverService.getAllFromCompany(value).subscribe((response) => {
        this.drivers = response;
      });
    }
  }

  addNewScheduleEntry() {
    this.busScheduleEntries.push(
      new CreateBusScheduleRequest(
        this.choosedRouteId,
        '00:00',
        '00:00',
        Direction.ToDestination,
        DayOfWeek.Monday
      )
    );
  }

  handleScheduleEntryDeletion(index: number) {
    this.busScheduleEntries.splice(index, 1);
  }

  createNewBus() {
    if (this.isFormValid()) {
      let entries = this.busScheduleEntries.map((entry) => {
        entry.departureTime += ':00';
        entry.arrivalTime += ':00';
        return entry;
      });

      this.busService
        .create(
          new CreateBusRequest(
            this.enteredBrand,
            this.enteredBusNumber,
            this.enteredSeatsCount,
            this.choosedDriverId,
            entries
          )
        )
        .subscribe((response) => {
          this.toaster.success(
            `Bus with ID ${response.id} was created`,
            'Success!',
            {
              positionClass: 'toast-bottom-right',
              timeOut: 5000,
            }
          );

          this.router
            .navigateByUrl('/buses')
            .then(() => console.log('Navigated to buses page'));
        });
    } else {
      this.toaster.warning('Please, fill all required fields', 'Warning!', {
        positionClass: 'toast-bottom-right',
        timeOut: 5000,
      });
    }
  }

  private isFormValid() {
    return (
      this.choosedDriverId !== 0 &&
      this.choosedRouteId !== 0 &&
      this.enteredBrand !== '' &&
      this.enteredBusNumber != '' &&
      this.enteredSeatsCount !== 0 &&
      !this.busScheduleEntries.some((entry) => entry.hasEmptyFields())
    );
  }
}
