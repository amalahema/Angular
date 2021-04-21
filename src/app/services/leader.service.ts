import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay }from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {
//Task-2:Update all the methods in leader service to use HTTP client to fetch the leader data from the server
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> 
  {
    return this.http.get<Leader[]>(baseURL + 'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }


  getLeader(id:string): Observable<Leader> 
  {
    return this.http.get<Leader>(baseURL + 'leadership/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
  
  //To get a featured Leader
  getFeaturedLeader(): Observable<Leader>
  {
    return this.http.get<Leader[]>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
