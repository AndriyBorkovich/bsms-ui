import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreatedEntityResponse } from '../models/general';
import { BuyTicketRequest, GetTicketPriceRequest, GetTicketPriceResponse } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private path: string = `${environment.apiUrl}Ticket`;
  constructor(private http: HttpClient) { }

  buy(request: BuyTicketRequest) {
    return this.http.post<CreatedEntityResponse>(`${this.path}/Create`, request);
  }

  getPrice(request: GetTicketPriceRequest) {
    return this.http.get<GetTicketPriceResponse>(`${this.path}/GetPrice?StartStopId=${request.startStopId}&EndStopId=${request.endStopId}`);
  }
}
