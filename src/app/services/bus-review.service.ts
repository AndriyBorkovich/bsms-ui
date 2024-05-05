import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateBusReviewRequest } from '../models/bus';
import { CreatedEntityResponse } from '../models/general';

@Injectable({
  providedIn: 'root'
})
export class BusReviewService {
  private path: string = `${environment.apiUrl}BusReview`;
  constructor(private httpClient: HttpClient) {}

  create(request: CreateBusReviewRequest) {
    return this.httpClient.post<CreatedEntityResponse>(`${this.path}/Create`, request);
  }
}
