import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CreateDriverRequest,
  Driver,
  DriverShortInfo,
  EditDriverRequest,
  GetAllDriversRequest,
} from '../models/driver';
import { CreatedEntityResponse, MessageResponse } from '../models/general';
import { ListResponse } from '../models/list.response';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  private path: string = `${environment.apiUrl}Driver`;

  constructor(private httpClient: HttpClient) {}

  getAll(request: GetAllDriversRequest) {
    return this.httpClient.get<ListResponse<Driver>>(
      `${this.path}/GetAll?SearchedFirstName=${request.searchedFirstName}&SearchedLastName=${request.searchedLastName}&SearchedLicense=${request.searchedLicense}&Pagination.PageNumber=${request.pagination.pageNumber}&Pagination.PageSize=${request.pagination.pageSize}`
    );
  }

  getAllFromCompany(companyId: number) {
    return this.httpClient.get<DriverShortInfo[]>(
      `${this.path}/GetAllFromCompany?companyId=${companyId}`
    );
  }

  create(request: CreateDriverRequest) {
    return this.httpClient.post<CreatedEntityResponse>(`${this.path}/Create`, request);
  }

  edit(request: EditDriverRequest) {
    return this.httpClient.post<MessageResponse>(`${this.path}/Edit`, request);
  }

  delete(id: number) {
    return this.httpClient.delete<MessageResponse>(`${this.path}/Delete/${id}`);
  }
}
