import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay }from 'rxjs/operators';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //To get all of the leaders details
  getLeaders(): Observable<Leader[]> 
  {
    return of(Leaders).pipe(delay(2000));
  }

  //To get a specific Leader's Details using value of id
  getDish(id:string): Observable<Leader> 
  {
  return of(Leaders.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    
  }
  
  //To get a featured Leader
  getFeaturedLeader(): Observable<Leader>
  {
    return of(Leaders.filter((Leader) => Leader.featured)[0]).pipe(delay(2000));
  }
}
