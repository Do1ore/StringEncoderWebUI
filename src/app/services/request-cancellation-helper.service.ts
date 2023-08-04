import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RequestCancellationHelperService {

  private readonly baseApiUrl: string = '';

  constructor(private httpClient: HttpClient) {
    this.baseApiUrl = environment.apiUrl;
  }

  public completeOperation(sessionId: string) {
    return this.httpClient.delete(this.baseApiUrl + '/api/v1/string-encode/' + sessionId);
  }
}
