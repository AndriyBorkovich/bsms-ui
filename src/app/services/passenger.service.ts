import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreatePassengerRequest, GetAllPassengersRequest, Passenger, PassengerShortInfo } from '../models/passenger';
import { ListResponse } from '../models/list.response';
import { Observable } from 'rxjs';
import { CreatedEntityResponse, MessageResponse } from '../models/general';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private path: string = `${environment.apiUrl}Passenger`;
  constructor(private httpClient: HttpClient) {}

  getAll(request: GetAllPassengersRequest): Observable<ListResponse<Passenger>> {
    return this.httpClient.get<ListResponse<Passenger>>(
      `${this.path}/GetAll?SearchedFirstName=${request.searchedFirstName}&SearchedLastName=${request.searchedLastName}&Pagination.PageNumber=${request.pagination.pageNumber}&Pagination.PageSize=${request.pagination.pageSize}`
    );
  }

  getAllShortInfo(busId: number | null) {
    return this.httpClient.get<PassengerShortInfo[]>(`${this.path}/GetAllShortInfo${busId != null ? `?BusId=${busId}` : ''}`);
  }

  create(request: CreatePassengerRequest) {
    return this.httpClient.post<CreatedEntityResponse>(`${this.path}/Create`, request);
  }

  edit(request: Passenger) {
    return this.httpClient.post<MessageResponse>(`${this.path}/Edit`, request);
  }

  delete(id: number) {
    return this.httpClient.delete<MessageResponse>(`${this.path}/Delete/${id}`);
  }
}
