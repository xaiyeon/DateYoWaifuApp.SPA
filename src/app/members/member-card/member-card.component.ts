import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';

// Declaring Jquery var
//  declare var $: any;

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  // These are each one user
  @Input() user: User;


  constructor() { }

  ngOnInit() {
    // $('#wikiButton').click(function() {
    //   alert('Hello there');
    // });

  }

}
