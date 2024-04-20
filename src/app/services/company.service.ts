import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyShortInfo } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private path: string = `${environment.apiUrl}Company`;

  constructor(private httpClient: HttpClient) {}

  getAllShortInfo() {
    return this.httpClient.get<CompanyShortInfo[]>(`${this.path}/GetAllShortInfo`);
  }
}
