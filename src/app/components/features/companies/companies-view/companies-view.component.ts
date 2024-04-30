import { Component, OnInit } from '@angular/core';
import { HasAnyAppRoleDirective } from 'src/app/directives/has-any-role.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from 'src/app/models/pagination';
import { ToastrService } from 'ngx-toastr';

import { MatDialog } from '@angular/material/dialog';
import {
  Company,
  CreateCompanyRequest,
  EditCompanyRequest,
  GetAllCompaniesRequest,
} from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { AddEditCompanyModalComponent } from '../add-edit-company-modal/add-edit-company-modal.component';
@Component({
  selector: 'app-companies-view',
  standalone: true,
  imports: [HasAnyAppRoleDirective, MatIconModule, MatPaginatorModule],
  templateUrl: './companies-view.component.html',
  styles: `mat-paginator {
    background-color: rgba(255, 255, 255, 0);
  }`,
})
export class CompaniesViewComponent implements OnInit {
  companies: Company[];
  totalItems = 1;
  pageSize = 5;
  currentPage = 0;

  searchedName: string = '';
  searchedCity: string = '';
  searchedCountry: string = '';
  searchedZipCode: string = '';

  constructor(
    private companyService: CompanyService,
    private toaster: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAllCompanies();
  }

  searchByName(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedName = element.value;
    if (this.searchedName.length > 2 || this.searchedName.length === 0) {
      this.currentPage = 0;
      this.getAllCompanies();
    }
  }

  searchByCity(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedCity = element.value;
    if (this.searchedCity.length > 2 || this.searchedCity.length === 0) {
      this.currentPage = 0;
      this.getAllCompanies();
    }
  }

  searchByCountry(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedCountry = element.value;
    if (this.searchedCountry.length > 2 || this.searchedCountry.length === 0) {
      this.currentPage = 0;
      this.getAllCompanies();
    }
  }

  searchByZipCode(target: EventTarget) {
    const element = target as HTMLInputElement;
    this.searchedZipCode = element.value;
    if (this.searchedZipCode.length > 2 || this.searchedZipCode.length === 0) {
      this.currentPage = 0;
      this.getAllCompanies();
    }
  }

  add() {
    const dialogRef = this.dialog.open(AddEditCompanyModalComponent, {
      data: new EditCompanyRequest(0, '', '', '', '', '', '', ''),
    });

    dialogRef.afterClosed().subscribe((request: CreateCompanyRequest) => {
      if (request) {
        this.companyService.create(request).subscribe((response) => {
          this.toaster.success(
            `Company with ID ${response.id} was created`,
            'Success!'
          );
          this.getAllCompanies();
        });
      } else {
        this.toaster.warning('Create request canceled', 'Attention!');
      }
    });
  }

  delete(id: number) {
    this.companyService.delete(id).subscribe((response) => {
      this.toaster.success(response.message, 'Success!');
      this.getAllCompanies();
    });
  }

  private getAllCompanies() {
    this.companyService
      .getAll(
        new GetAllCompaniesRequest(
          this.searchedName,
          this.searchedCity,
          this.searchedCountry,
          this.searchedZipCode,
          new Pagination(this.currentPage + 1, this.pageSize)
        )
      )
      .subscribe((response) => {
        this.companies = response.result;
        this.totalItems = response.total;
      });
  }
}
