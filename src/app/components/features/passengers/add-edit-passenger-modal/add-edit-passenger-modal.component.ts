import { Component, Inject } from '@angular/core';
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
import { Passenger } from 'src/app/models/passenger';
import { RegexConstants } from '../../helpers/regex-constants';
@Component({
  selector: 'app-add-edit-passenger-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './add-edit-passenger-modal.component.html',
  styles: ``,
})
export class AddEditPassengerModalComponent {
  title: string = '';
  customForm: FormGroup = {} as FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddEditPassengerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public passenger: Passenger
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
    this.title =
      this.passenger.passengerId === 0 ? 'Add passenger' : 'Edit passenger';
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
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(RegexConstants.phone),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(RegexConstants.email),
      ]),
    });
  }

  private readDataFromForm(): Passenger {
    const id = this.passenger.passengerId;
    const firstName: string = this.customForm.controls['firstName'].value;
    const lastName: string = this.customForm.controls['lastName'].value;
    const phoneNumber: string = this.customForm.controls['phoneNumber'].value;
    const email: string = this.customForm.controls['email'].value;

    return new Passenger(id, firstName, lastName, phoneNumber, email);
  }

  protected readonly FormsChecker = FormsChecker;
}
