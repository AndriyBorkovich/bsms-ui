import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouteShortInfo } from '../models/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private path: string = `${environment.apiUrl}Route`;

  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<RouteShortInfo[]>(`${this.path}/GetAll`);
  }
}
