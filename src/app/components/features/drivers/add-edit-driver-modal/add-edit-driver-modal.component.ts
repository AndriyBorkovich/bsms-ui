import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormsChecker } from '../../helpers/forms-checker';
import { RegexConstants } from '../../helpers/regex-constants';
import { Driver, EditDriverRequest } from 'src/app/models/driver';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyShortInfo } from 'src/app/models/company';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-add-edit-driver-modal',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    NgIf,
  ],
  templateUrl: './add-edit-driver-modal.component.html',
  styles: ``,
})
export class AddEditDriverModalComponent implements OnInit {
  title: string = '';
  customForm: FormGroup = {} as FormGroup;
  companies: CompanyShortInfo[] = [];
  choosenCompany: number;

  constructor(
    public dialogRef: MatDialogRef<AddEditDriverModalComponent>,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA) public driver: Driver
  ) {}

  onExit() {
    this.dialogRef.close(undefined);
  }

  onSubmit() {
    if (this.customForm.valid) {
      this.dialogRef.close(this.readDataFromForm());
    }
  }

  ngOnInit(): void {
    this.title = this.driver.driverId === 0 ? 'Add driver' : 'Edit driver';
    
    this.customForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.onlyLetters),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.onlyLetters),
      ]),
      licenseNumber: new FormControl('', [
        Validators.maxLength(50)
      ])
    });

    this.companyService.getAllShortInfo().subscribe((response) => {
      this.companies = response;
      this.choosenCompany = this.companies.find(company => company.name === this.driver.companyName)?.companyId;
    });

    this.dialogRef.updateSize('30%', '80%');
  }

  private readDataFromForm(): EditDriverRequest {
    const id = this.driver.driverId;
    const firstName: string = this.customForm.controls['firstName'].value;
    const lastName: string = this.customForm.controls['lastName'].value;
    const licenseNumber: string =
      this.customForm.controls['licenseNumber'].value;
      console.log(this.choosenCompany);
    return new EditDriverRequest(id, firstName, lastName, this.choosenCompany, licenseNumber);
  }

  protected readonly FormsChecker = FormsChecker;
}
