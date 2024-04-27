import { Pagination } from './pagination';

export class Passenger {
  constructor(
    public passengerId: number,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public email: string
  ) {}
}

export class GetAllPassengersRequest {
  constructor(
    public pagination: Pagination,
    public searchedFirstName?: string,
    public searchedLastName?: string
  ) {}
}

export class CreatePassengerRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public email: string
  ) {}
}
