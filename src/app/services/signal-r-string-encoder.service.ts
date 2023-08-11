import {Injectable} from '@angular/core';
import {SignalRConnectionService} from "./signal-r-connection.service";
import {Guid} from "guid-typescript";
import {RequestCancellationHelperService} from "./request-cancellation-helper.service";
import {HttpClient} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class SignalRStringEncoderService {

  constructor(private mainSignalRService: SignalRConnectionService
  ) {
  }

  public currentSession: string = "";

  public async encodeStringRequest(input: string) {
    console.log('invoked encodeStringRequest with argument: ', input)
    this.currentSession = Guid.create().toString();
    return await this.mainSignalRService.hubConnection!.invoke('ConvertToBase64String', input, this.currentSession).catch((err) => {
      return console.error('Error while invoking ConvertToBase64String:', err);
    });
  }

  public encodeStringRequestListener(callback: (symbol: string) => void) {
    if (this.mainSignalRService === null || this.mainSignalRService.hubConnection?.state != 'Connected') {
      console.log('Unconnected!');
      return;
    }

    this.mainSignalRService.hubConnection.on('ConvertToBase64StringResponse', (symbol) => {
      console.info(symbol);
      callback(symbol);
    });
  }

  public stringEncodeProgressListener(callback: (percent: number) => void) {
    if (this.mainSignalRService === null || this.mainSignalRService.hubConnection?.state != 'Connected') {
      console.log('Unconnected!');
      return;
    }

    this.mainSignalRService.hubConnection.on("EncodingProgressResponse", (percent: number) => {
      callback(percent);
      console.log('Completed ', percent, 'from 100%');
    })
  }


}
