import { Pagination } from './pagination';

export class Trip {
    constructor(
        public tripId: number,
        public departureTime: Date,
        public arrivalTime: Date,
        public routeName: string,
        public busBrand: string,
        public companyName: string,
        public busRating: number,
        public tripStatus: string,
        public freeSeatsCount: number,
        public capacity: number
    ) { }
}

// requests
export class GetAllTripsRequest {
  constructor(
    public searchedRoute: string,
    public searchedStatus: string,
    public isLive: boolean,
    public pagination: Pagination) {}
}

// responses
export interface SeatsForTripInfo {
    seatId: number,
    seatNumber: number
}
