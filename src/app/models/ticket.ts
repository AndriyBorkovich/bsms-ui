import { PaymentType } from './enums';

export class BuyTicketRequest {
  constructor(
    public seatId: number,
    public startStopId: number,
    public endStopId: number,
    public tripId: number,
    public passengerId: number,
    public paymentType: PaymentType
  ) {}
}

export class GetTicketPriceRequest {
  constructor(public startStopId: number, public endStopId: number) {}
}

export interface GetTicketPriceResponse {
    price: number;
}

export interface TicketDistribution {
    typeName: string;
    count: number;
}
