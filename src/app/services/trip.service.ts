import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllTripsRequest, Trip } from '../models/trip';
import { ListResponse } from '../models/list.response';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private path: string = `${environment.apiUrl}Trip`;
  constructor(private http: HttpClient) { }

  getAll(request: GetAllTripsRequest) {
    return this.http.get<ListResponse<Trip>>(`${this.path}/GetAll?SearchedRoute=${request.searchedRoute}&SearchedStatus=${request.searchedStatus}&Pagination.PageNumber=${request.pagination.pageNumber}&Pagination.PageSize=${request.pagination.pageSize}`);
  }
}
