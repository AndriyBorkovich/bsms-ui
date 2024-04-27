import { Pagination } from './pagination';

export class Driver {
  constructor(
    public driverId: number,
    public firstName: string,
    public lastName: string,
    public companyName: string,
    public license?: string
  ) {}
}

// requests
export class GetAllDriversRequest {
  constructor(
    public pagination: Pagination,
    public searchedFirstName?: string,
    public searchedLastName?: string,
    public searchedLicense?: string
  ) {}
}

export class CreateDriverRequest {
  constructor(
    public firstName: string,
    public lastName: string,
    public companyId: number,
    public driverLicense: string | null
  ) {}
}

export class EditDriverRequest extends CreateDriverRequest {
  public driverId: number;
  constructor(
    driverId: number,
    firstName: string,
    lastName: string,
    companyId: number,
    license: string | null
  ) {
    super(firstName, lastName, companyId, license);
    this.driverId = driverId;
  }
}

// responses
export class DriverShortInfo {
  constructor(public driverId: number, public name: string) {}
}
