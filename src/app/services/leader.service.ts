import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { Leaders } from '../shared/leaders';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
  //To get all of the leaders details
  getLeaders(): Leader[] 
  {
    return Leaders;
  }
  //To get a specific Leader's Details using value of id
  getLeader(id: string): Leader 
  {
    return Leaders.filter((leader) => (leader.id === id))[0];
  }
  //To get a featured Leader
  getFeaturedLeader(): Leader
  {
    return Leaders.filter((leader) => leader.featured)[0];
  }
}