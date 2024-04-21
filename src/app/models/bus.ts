import { DayOfWeek, Direction } from './enums';
import { Pagination } from './pagination';

export class Bus {
  constructor(
    public busId: number,
    public number: string,
    public brand: string,
    public capacity: number,
    public driverName: string,
    public companyName: string,
    public rating: number
  ) {}
}

// requests
export class GetAllBusesRequest {
  searchedBrand?: string;
  searchedBusNumber?: string;
  pagination: Pagination;

  constructor(
    pagination: Pagination,
    searchedBrand?: string,
    searchedBusNumber?: string
  ) {
    this.pagination = pagination;
    this.searchedBrand = searchedBrand;
    this.searchedBusNumber = searchedBusNumber;
  }
}

export class CreateBusRequest {
  constructor(
    public brand: string,
    public number: string,
    public capacity: number,
    public driverId: number,
    public busScheduleEntries: CreateBusScheduleRequest[]
  ) {}
}

export class CreateBusScheduleRequest {
  constructor(
    public routeId : number,
    public departureTime: string,
    public arrivalTime: string,
    public moveDirection: Direction,
    public dayOfWeek: DayOfWeek
  ) {}

  hasEmptyFields(): boolean {
    return (
      this.routeId === 0 ||
      this.departureTime === '' ||
      this.arrivalTime === ''
    );
  }
}