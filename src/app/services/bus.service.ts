import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bus, CreateBusRequest, EditBusRequest, GetAllBusesRequest } from '../models/bus';
import { ListResponse } from '../models/list.response';
import { Observable } from 'rxjs';
import { CreatedEntityResponse, MessageResponse } from '../models/general';

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

  create(request: CreateBusRequest) {
    return this.httpClient.post<CreatedEntityResponse>(`${this.path}/Create`, request);
  }

  edit(request: EditBusRequest) {
    return this.httpClient.post<MessageResponse>(`${this.path}/Edit`, request);
  }

  delete(id: number) {
    return this.httpClient.delete<MessageResponse>(`${this.path}/Delete/${id}`);
  }
}
