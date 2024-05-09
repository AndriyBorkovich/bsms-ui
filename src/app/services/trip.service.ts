import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetAllTripsRequest, SeatsForTripInfo, Trip } from '../models/trip';
import { ListResponse } from '../models/list.response';
import { RouteStopsInfo } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private path: string = `${environment.apiUrl}Trip`;
  constructor(private http: HttpClient) { }

  getAll(request: GetAllTripsRequest) {
    return this.http.get<ListResponse<Trip>>(`${this.path}/GetAll?SearchedRoute=${request.searchedRoute}&SearchedStatus=${request.searchedStatus}&IsLive=${request.isLive}&Pagination.PageNumber=${request.pagination.pageNumber}&Pagination.PageSize=${request.pagination.pageSize}`);
  }

  getAllStops(tripId: number) {
    return this.http.get<RouteStopsInfo[]>(`${this.path}/GetAllStops?TripId=${tripId}`);
  }

  getFreeSeats(tripId: number) {
    return this.http.get<SeatsForTripInfo[]>(`${this.path}/GetFreeSeats?TripId=${tripId}`);
  }
}
