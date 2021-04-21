import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
//import { PROMOTIONS } from '../shared/promotions';
import {Observable,of } from 'rxjs';
import {map,catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';
import { baseURL }from '../shared/baseurl';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  //Task-1:Update all the methods in promotion service to use HTTP client to fetch the promotion data from the server.
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getPromotions(): Observable<Promotion[]> 
  {
    return this.http.get<Promotion[]>(baseURL + 'promotions')
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getPromotion(id: string): Observable<Promotion> 
  {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getFeaturedPromotion(): Observable<Promotion> 
  {
   
    return  this.http.get<Promotion[]>(baseURL + 'promotions?featured=true').pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }
}