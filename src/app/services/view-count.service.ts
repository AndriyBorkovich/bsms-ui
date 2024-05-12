import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class ViewCountService {
  private hubConnection: signalR.HubConnection;

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.hubsUrl}/view`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connected to SignalR hub'))
      .catch((err) => console.error('Error connecting to SignalR hub:', err));
  }

  notifyWatching() {
    this.hubConnection.send('notifyWatching');
  }

  notifyUnwatching() {
    this.hubConnection.send('notifyUnwatching');
  }

  checkCurrent() {
    this.hubConnection.send('checkCurrent');
  }

  receive() {
    return new Observable<number>((observer) => {
      this.hubConnection.on('viewCountUpdate', (count: number) => {
        console.log("Count updated: ", count);
        observer.next(count);
      });
    });
  }
}