import {Injectable} from '@angular/core';
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";
import {Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignalRStringService {

  hubConnection: HubConnection | null = null;
  private signalRConnectedSubject: Subject<void> = new Subject<void>();
  public signalRConnect$ = this.signalRConnectedSubject.asObservable();


  public encodedStringSubject: Subject<string> = new Subject<string>();

  constructor() {
  }

  public getHubConnection(): HubConnection {
    console.log('method started!')
    if (!this.hubConnection || this.hubConnection?.state != 'Connected') {
      this.hubConnection = new HubConnectionBuilder()
        .withUrl('https://localhost:7286/hub/encoder')
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

  public async encodeStringRequest(input: string) {
    console.log('invoked encodeStringRequest with argument: ', input)

    return await this.hubConnection!.invoke('ConvertToBase64String', input).catch((err) => {
      return console.error('Error while invoking ConvertToBase64String:', err);
    })
  }

  public encodeStringRequestListener(): void {
    if (this.hubConnection === null || this.hubConnection.state != 'Connected') {
      console.log('Unconnected!!!')
      return;
    }

    return this.hubConnection.on('ConvertToBase64StringResponse', (symbol) => {
      console.info(symbol);
      this.encodedStringSubject.next(symbol)
    });
  }

  public stopConnection() {
    this.hubConnection?.stop();
    console.log('hub state: ', this.hubConnection?.state);
  }

  public continueConnection() {
    this.hubConnection!.start()
      .then(() => {
        this.signalRConnectedSubject.next();
      })
      .catch(err => console.error('Error while starting SignalR connection:', err));
    console.log('hub state: ', this.hubConnection?.state);
  }

}
