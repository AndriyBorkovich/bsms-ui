import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company, CompanyShortInfo, CreateCompanyRequest, GetAllCompaniesRequest } from '../models/company';
import { ListResponse } from '../models/list.response';
import { CreatedEntityResponse, MessageResponse } from '../models/general';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private path: string = `${environment.apiUrl}Company`;

  constructor(private httpClient: HttpClient) {}

  getAll(request: GetAllCompaniesRequest) {
    return this.httpClient.get<ListResponse<Company>>(`${this.path}/GetAll?SearchedName=${request.searchedName}&SearchedCity=${request.searchedCity}&SearchedCountry=${request.searchedCountry}&SearchedZipCode=${request.searchedZipCode}&Pagination.PageNumber=${request.pagination.pageNumber}&Pagination.PageSize=${request.pagination.pageSize}`)
  }

  getAllShortInfo() {
    return this.httpClient.get<CompanyShortInfo[]>(`${this.path}/GetAllShortInfo`);
  }

  create(request: CreateCompanyRequest) {
    return this.httpClient.post<CreatedEntityResponse>(`${this.path}/Create`, request);
  }

  delete(id: number) {
    return this.httpClient.delete<MessageResponse>(`${this.path}/Delete/${id}`);
  }
}
