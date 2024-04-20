import { Component, OnInit } from '@angular/core';
import { CompanyShortInfo } from 'src/app/models/company';
import { DriverShortInfo } from 'src/app/models/driver';
import { CompanyService } from 'src/app/services/company.service';
import { DriverService } from 'src/app/services/driver.service';
import { MatSelectModule } from '@angular/material/select';
import { NgIf } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-create-bus',
  standalone: true,
  imports: [MatSelectModule, NgIf, NgxMaterialTimepickerModule],
  templateUrl: './create-bus.component.html',
  styleUrl: './create-bus.component.scss',
})
export class CreateBusComponent implements OnInit {
  drivers: DriverShortInfo[] = [];
  companies: CompanyShortInfo[] = [];

  choosedDriverId: number = 0;
  enteredBrand: string = '';
  enteredBusNumber: string = '';
  enteredSeatsCount: number = 0;

  constructor(
    private companyService: CompanyService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.companyService.getAllShortInfo().subscribe((response) => {
      this.companies = response;
    });
  }

  onCompanySelectionChange(value: number) {
    if (value) {
      this.driverService.getAllFromCompany(value).subscribe((response) => {
        this.drivers = response;
      });
    }
  }
}
