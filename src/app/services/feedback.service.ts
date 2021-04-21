import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay }from 'rxjs/operators';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  submitfeedback(feedback:Feedback): Observable<Feedback> 
   {
    const httpOptions = {
      headers: new HttpHeaders
      ({
        'Content-Type': 'application/json'                                           //specifying the server the incoming request in json-format 
      })
    };
  
      return this.http.post<Feedback>(baseURL + 'feedback/', feedback, httpOptions)    //feedback is the parameter from the upated one(feedback)
      .pipe(catchError(this.processHTTPMsgService.handleError));
                                                                                      
  }
}