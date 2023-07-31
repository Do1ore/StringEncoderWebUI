import {Component, OnInit} from '@angular/core';
import {SignalRStringService} from "./services/signal-r-string.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public signalRService: SignalRStringService) {
  }

  title = 'StringEncoderWebUI';

  inputString: string = "";
  encodedString: string = "";

  async ngOnInit() {
    this.signalRService.getHubConnection();

    //start listener
    this.signalRService.signalRConnect$.subscribe(() => {
      console.log('listener started👍')
      this.signalRService.encodeStringRequestListener();

      this.signalRService.encodedStringSubject.asObservable().subscribe((symbol) => {
        this.encodedString += symbol;
      })
    })
  }

  async encodeString() {
    console.log('argument: ', this.inputString);
    this.encodedString = '';
    if (this.signalRService.hubConnection?.state != 'Connected') {
      console.log('Unconnected!!!')
      return;
    }
    await this.signalRService.encodeStringRequest(this.inputString)


  }
}



