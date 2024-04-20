import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DriverShortInfo } from '../models/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private path: string = `${environment.apiUrl}Driver`;

  constructor(private httpClient: HttpClient) {}

  getAllFromCompany(companyId: number) {
    return this.httpClient.get<DriverShortInfo[]>(`${this.path}/GetAllFromCompany?companyId=${companyId}`);
  }
}
