import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Subject, takeUntil} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignalRConnectionService {

  hubConnection: HubConnection | null = null;
  private signalRConnectedSubject: Subject<void> = new Subject<void>();
  public signalRConnect$ = this.signalRConnectedSubject.asObservable();



  private baseApiUrl = environment.apiUrl;

  constructor() {
  }

  public startHubConnection(): HubConnection {
    console.log('method started!')
    if (!this.hubConnection || this.hubConnection?.state != 'Connected') {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.baseApiUrl + '/hub/encoder')
        .withAutomaticReconnect()
        .build();

      this.hubConnection.start()
        .then(() => {
          this.signalRConnectedSubject.next();
        })
        .catch(err => console.error('Error while starting SignalR connection:', err));
    }
    return this.hubConnection;
  }



}
