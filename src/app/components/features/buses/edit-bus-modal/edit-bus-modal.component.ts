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
import { EditBusRequest } from 'src/app/models/bus';
import { FormsChecker } from '../../helpers/forms-checker';
import { NgIf } from '@angular/common';
import { RegexConstants } from '../../helpers/regex-constants';

@Component({
  selector: 'app-edit-bus-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './edit-bus-modal.component.html',
  styles: ``,
})
export class EditBusModalComponent implements OnInit {
  customForm: FormGroup = {} as FormGroup;
  constructor(
    public dialogRef: MatDialogRef<EditBusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public editedBus: EditBusRequest
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
    this.customForm = new FormGroup({
      busCapacity: new FormControl('', [
        Validators.required,
        Validators.max(30),
        Validators.min(0),
      ]),
      busBrand: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(RegexConstants.onlyLetters),
      ]),
      busNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(RegexConstants.onlyLettersAndNumbers),
      ]),
    });
  }

  private readDataFromForm(): EditBusRequest {
    const id = this.editedBus.busId;
    const capacity = parseInt(this.customForm.controls['busCapacity'].value);
    const brand: string = this.customForm.controls['busBrand'].value;
    const number: string = this.customForm.controls['busNumber'].value;

    return new EditBusRequest(id, brand, number, capacity);
  }

  protected readonly FormsChecker = FormsChecker;
}
