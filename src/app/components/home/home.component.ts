import {Component, OnInit} from '@angular/core';
import {SignalRConnectionService} from "../../services/signal-r-connection.service";
import {SignalRStringEncoderService} from "../../services/signal-r-string-encoder.service";
import {RequestCancellationHelperService} from "../../services/request-cancellation-helper.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private signalRConnectionService: SignalRConnectionService,
              public encodeStringService: SignalRStringEncoderService,
              public requestHelper: RequestCancellationHelperService
  ) {
  }

  public inputString: string = '';
  public encodedString: string = '';
  public isCancelled: boolean = false;
  public completedPercentage: number = 0;
  public isButtonDisabled: boolean = false;

  async ngOnInit() {
    this.signalRConnectionService.startHubConnection();
    await this.waitForConnection();
    await this.encodeStringListener();
    this.startPercentageListener();
  }

  async encodeString() {
    this.isCancelled = false;
    this.completedPercentage = 0;
    console.log('argument: ', this.inputString);
    this.encodedString = '';
    this.isButtonDisabled = true;
    await this.encodeStringService.encodeStringRequest(this.inputString);
  }

  async encodeStringListener() {

    this.encodeStringService.encodeStringRequestListener((callback) => {
      this.encodedString += callback;
    });
  }

  async cancelRequest() {
    this.requestHelper.completeOperation(this.encodeStringService.currentSession).subscribe(() => {
      console.log('Cancelled⚙️')
      this.isButtonDisabled = false;
      this.completedPercentage = 0;
      this.isCancelled = true;
    });
  }

  public async waitForConnection(): Promise<void> {
    if (this.signalRConnectionService.hubConnection && this.signalRConnectionService.hubConnection.state === 'Connected'
    ) {
      return Promise.resolve();
    } else {
      console.log('State is not Connected. Waiting');
      return new Promise<void>((resolve) => {

        this.signalRConnectionService.signalRConnect$.subscribe(() => {
          resolve();
        });

      });
    }
  }

  public startPercentageListener() {
    this.encodeStringService.stringEncodeProgressListener((percent) => {
      this.completedPercentage = percent;
      if (percent >= 100) {
        this.isButtonDisabled = false;
      }
      console.log(percent);
    })
  }
}
