import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaymentType } from 'src/app/models/enums';
import { PassengerShortInfo } from 'src/app/models/passenger';
import { RouteStopsInfo } from 'src/app/models/route';
import { BuyTicketRequest, GetTicketPriceRequest } from 'src/app/models/ticket';
import { SeatsForTripInfo } from 'src/app/models/trip';
import { PassengerService } from 'src/app/services/passenger.service';
import { TicketService } from 'src/app/services/ticket.service';
import { TripService } from 'src/app/services/trip.service';

@Component({
  selector: 'app-buy-ticket-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './buy-ticket-modal.component.html',
  styles: ``,
})
export class BuyTicketModalComponent implements OnInit {
  customForm: FormGroup = {} as FormGroup;
  paymentTypeEnum = PaymentType;

  // Property to store the selected payment type
  // Define options for mat-select
  paymentTypeOptions = [
    { value: PaymentType.Cash, viewValue: 'Cash' },
    { value: PaymentType.BankCard, viewValue: 'Bank Card' },
  ];

  seats: SeatsForTripInfo[] = [];
  passengersToChoose: PassengerShortInfo[] = [];
  startStops: RouteStopsInfo[] = [];
  endStops: RouteStopsInfo[] = [];

  choosenSeatId: number;
  choosenPassengerId: number;
  choosenStartStopId: number;
  choosenEndStopId: number;
  choosenPaymentType: PaymentType;
  ticketPrice: number = 0.0;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private passengerService: PassengerService,
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<BuyTicketModalComponent>,
    @Inject(MAT_DIALOG_DATA) public tripId: number
  ) {}

  ngOnInit(): void {
    this.tripService.getAllStops(this.tripId).subscribe((response) => {
      this.startStops = response;
    });

    this.tripService.getFreeSeats(this.tripId).subscribe((response) => {
      this.seats = response;
    });

    this.passengerService.getAllShortInfo(null).subscribe((response) => {
      this.passengersToChoose = response;
    });

    this.customForm = this.fb.group({
      seatId: ['', Validators.required],
      startStopId: ['', Validators.required],
      endStopId: ['', Validators.required],
      passengerId: ['', Validators.required],
      paymentType: ['', Validators.required],
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

  onStartStopSelectionChange(value: number) {
    this.endStops = this.startStops.filter((s) => s.stopId != value);
  }

  onEndStopSelectionChange() {
    if (this.choosenStartStopId !== 0 && this.choosenEndStopId !== 0) {
      this.ticketService
        .getPrice(
          new GetTicketPriceRequest(
            this.choosenStartStopId,
            this.choosenEndStopId
          )
        )
        .subscribe((response) => (this.ticketPrice = response.price));
    }
  }

  private readDataFromForm(): BuyTicketRequest {
    return new BuyTicketRequest(
      this.choosenSeatId,
      this.choosenStartStopId,
      this.choosenEndStopId,
      this.tripId,
      this.choosenPassengerId,
      this.choosenPaymentType
    );
  }
}
