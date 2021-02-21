import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //To get all of the leaders details
  getLeaders(): Promise<Leader[]> 
  {
    //return Leaders;
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(Leaders), 2000);  
    });
  }

  //To get a specific Leader's Details using value of id
  getLeader(id: string): Promise<Leader>
  {
  return new Promise(resolve=> {
    // Simulate server latency with 2 second delay
      setTimeout(() => resolve(Leaders.filter((leader) => (leader.id === id))[0]), 2000);
    });
  }
  

  //To get a featured Leader
  getFeaturedLeader(): Promise<Leader>
  {
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(Leaders.filter((Leader) => Leader.featured)[0]), 2000);
      });
  }
}
