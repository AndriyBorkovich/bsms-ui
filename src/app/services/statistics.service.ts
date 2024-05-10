import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TicketDistribution } from '../models/ticket';
import { CompanyRevenue } from '../models/company';
import { RouteRevenue, RouteWithBusRating } from '../models/route';
import { BusDistance } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private path: string = `${environment.apiUrl}Statistic`;
  constructor(private http: HttpClient) { }

  getTicketsByType() {
    return this.http.get<TicketDistribution[]>(`${this.path}/GetTicketDistributionByType`);
  }

  getCompaniesRevenue() {
    return this.http.get<CompanyRevenue[]>(`${this.path}/GetTopCompaniesByRevenue`);
  }

  getRoutesRevenue() {
    return this.http.get<RouteRevenue[]>(`${this.path}/GetTopRoutesByRevenue`);
  }

  getRoutesByBusRating() {
    return this.http.get<RouteWithBusRating[]>(`${this.path}/GetTopRoutesByBusRating`);
  }

  getBusDistances() {
    return this.http.get<BusDistance[]>(`${this.path}/GetTopBusesByTravelledDistance`);
  }
}
