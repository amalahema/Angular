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
    return Promise.resolve(Leaders);
  }
  //To get a specific Leader's Details using value of id
  getLeader(id: string): Promise<Leader >
  {
    //return Leaders.filter((leader) => (leader.id === id))[0];
    return Promise.resolve(Leaders.filter((leader) => (leader.id==id))[0]);
  }
  //To get a featured Leader
  getFeaturedLeader(): Promise<Leader>
  {
   // return Leaders.filter((leader) => leader.featured)[0];
   return Promise.resolve(Leaders.filter((leader) => leader.featured)[0]);
  }
}