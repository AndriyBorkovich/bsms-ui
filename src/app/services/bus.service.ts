import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bus, GetAllBusesRequest } from '../models/bus';
import { ListResponse } from '../models/list.response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private path: string = `${environment.apiUrl}Bus`;
  constructor(private httpClient: HttpClient) {}

  getAll(request: GetAllBusesRequest): Observable<ListResponse<Bus>> {
    return this.httpClient.get<ListResponse<Bus>>(
      `${this.path}/GetAll?SearchedBrand=${request.searchedBrand}&SearchedBusNumber=${request.searchedBusNumber}&Pagination.PageNumber=${request.pagination.pageNumber}&Pagination.PageSize=${request.pagination.pageSize}`
    );
  }
}
