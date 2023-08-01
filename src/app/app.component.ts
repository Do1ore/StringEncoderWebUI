import {Component, OnDestroy, OnInit} from '@angular/core';
import {SignalRStringService} from "./services/signal-r-string.service";
import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        animate('500ms', keyframes([
          style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1})
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(public signalRService: SignalRStringService) {
  }


  title = 'StringEncoderWebUI';
  inputString: string = "";
  encodedString: string = "";
  encodedStringSubscription = new Subscription();

  isCancelled: boolean = false;

  stringListenerSubscription = new Subscription();

  async ngOnInit() {
    this.signalRService.getHubConnection();
    //start listener
    this.stringListenerSubscription = this.signalRService.signalRConnect$.subscribe(() => {
      console.log('listener started👍')
      this.signalRService.encodeStringRequestListener();

      this.encodedStringSubscription = this.signalRService.encodedStringSubject.asObservable().subscribe((symbol) => {
        this.encodedString += symbol;
        this.appendContent(symbol);
      })
    })
  }

  ngOnDestroy(): void {
    this.encodedStringSubscription.unsubscribe();
  }

  async encodeString() {
    if (this.signalRService.hubConnection?.state == 'Disconnected' || this.signalRService.hubConnection?.state == 'Disconnecting') {
      this.signalRService.continueConnection();
    }
    console.log('argument: ', this.inputString);
    this.cleanFromSpans();
    this.encodedString = '';
    await this.waitForConnection();
    this.isCancelled = false;

    await this.signalRService.encodeStringRequest(this.inputString)

  }

  endSubscription() {
    this.signalRService.stopConnection();
    this.stringListenerSubscription.unsubscribe();
    this.isCancelled = true;
  }

  public async waitForConnection(): Promise<void> {
    if (this.signalRService.hubConnection && this.signalRService.hubConnection.state === 'Connected') {
      return Promise.resolve();
    } else {
      console.log('State is not Connected. Waiting');
      return new Promise<void>((resolve, reject) => {

        this.signalRService.signalRConnect$.subscribe(() => {
          resolve();
        });

      });
    }
  }

  appendContent(text: string) {
    const divElement = document.getElementById('encode-output');

    if (divElement) {

      for (let i = 0; i < text.length; i++) {
        const spanElement = document.createElement('span');
        spanElement.textContent = text[i];


        spanElement.classList.add("fade-in");
        divElement.appendChild(spanElement);
      }
    }
  }

  cleanFromSpans() {
    const divElement = document.getElementById('encode-output');

    if (divElement) {
      while (divElement.firstChild) {
        divElement.removeChild(divElement.firstChild);
      }
    }
  }
}



