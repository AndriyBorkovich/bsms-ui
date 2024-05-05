import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormsChecker } from '../../helpers/forms-checker';
import { NgIf } from '@angular/common';
import { CreateBusReviewRequest } from 'src/app/models/bus';
import { PassengerShortInfo } from 'src/app/models/passenger';
import { PassengerService } from 'src/app/services/passenger.service';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bus-review-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './bus-review-modal.component.html',
  styles: ``
})
export class BusReviewModalComponent implements OnInit {
  customForm: FormGroup = {} as FormGroup;
  relatedPassengers: PassengerShortInfo[] = [];
  choosedPassenger: number;

  constructor(
    private fb: FormBuilder,
    private passengerService: PassengerService,
    private toaster: ToastrService,
    public dialogRef: MatDialogRef<BusReviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) public busId: number
  ) {}

  ngOnInit(): void {
    this.customForm = this.fb.group({
      comfortRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      punctualityRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      priceQualityRatioRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      internetConnectionRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      sanitaryConditionsRating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['', [Validators.maxLength(200)]]
    });

    this.passengerService.getAllShortInfo(this.busId).subscribe((response) => {
      if(response.length == 0) {
        this.toaster.warning("No related passengers found for this bus", "Warning!");
        this.dialogRef.close(undefined);
      } else {
        this.relatedPassengers = response;
      }
    });
  }

  onExit() {
    this.dialogRef.close(undefined);
  }

  onSubmit() {
    if (this.customForm.valid) {
      this.dialogRef.close(this.readDataFromForm());
    }
  }

  private readDataFromForm(): CreateBusReviewRequest {
    return {
      busId: this.busId,
      passengerId: this.choosedPassenger,
      comfortRating: this.customForm.get('comfortRating').value,
      punctualityRating: this.customForm.get('punctualityRating').value,
      priceQualityRatioRating: this.customForm.get('priceQualityRatioRating').value,
      internetConnectionRating: this.customForm.get('internetConnectionRating').value,
      sanitaryConditionsRating: this.customForm.get('sanitaryConditionsRating').value,
      comments: this.customForm.get('comments')?.value
    };
  }

  protected FormsChecker = FormsChecker;
}
