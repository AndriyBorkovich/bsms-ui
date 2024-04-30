import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { FormsChecker } from '../../helpers/forms-checker';
import { RegexConstants } from '../../helpers/regex-constants';
import {
  CreateCompanyRequest,
  EditCompanyRequest,
} from 'src/app/models/company';

@Component({
  selector: 'app-add-edit-company-modal',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-edit-company-modal.component.html',
  styles: ``,
})
export class AddEditCompanyModalComponent implements OnInit {
  title: string = '';
  customForm: FormGroup = {} as FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditCompanyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public company: EditCompanyRequest
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
    this.title = this.company.companyId === 0 ? 'Add company' : 'Edit company';

    this.customForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.onlyLettersAndNumbers),
      ]),
      phone: new FormControl('', [
        Validators.maxLength(20),
        Validators.pattern(RegexConstants.phone),
      ]),
      email: new FormControl('', [
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.email),
      ]),
      street: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.street),
      ]),
      city: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.city),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.onlyLetters),
      ]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern(RegexConstants.zipCode),
      ]),
    });
  }

  private readDataFromForm(): CreateCompanyRequest {
    const name: string = this.customForm.controls['name'].value;
    const phone: string | null = this.customForm.controls['phone']?.value;
    const email: string | null = this.customForm.controls['email']?.value;
    const street: string = this.customForm.controls['street'].value;
    const city: string = this.customForm.controls['city'].value;
    const country: string = this.customForm.controls['country'].value;
    const zipCode: string = this.customForm.controls['zipCode'].value;

    return new CreateCompanyRequest(
      name,
      phone,
      email,
      street,
      city,
      country,
      zipCode
    );
  }

  protected readonly FormsChecker = FormsChecker;
}
