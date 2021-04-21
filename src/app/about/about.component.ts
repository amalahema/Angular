import { Component, OnInit,Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { expand, flyInOut }from '../animation/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {
   errMess: string;
   leaders: Leader[];
  constructor(private leaderService:LeaderService,
    @Inject('baseURL') public baseURL) { }                  

  ngOnInit() {
  
     this.leaderService.getLeaders()
    .subscribe(leaders => this.leaders = leaders),
     errmess => this.errMess = <any>errmess;
  }

}
