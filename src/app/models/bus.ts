import { Pagination } from "./pagination";

export class Bus {
    constructor(
        public busId: number,
        public number: string,
        public brand: string,
        public capacity: number,
        public driverName: string,
        public companyName: string,
        public rating: number
    ) { }    
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