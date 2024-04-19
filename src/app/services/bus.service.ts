import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Bus } from '../models/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private path: string = `${environment.apiUrl}Bus`;
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<Bus[]>(`${this.path}/GetAll`);
  }

}
