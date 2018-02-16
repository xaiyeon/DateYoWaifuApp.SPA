import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/User';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

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


  constructor(private authservice: AuthService, private userservice: UserService,
    private alertify: AlertifyService ) { }

  ngOnInit() {
    // $('#wikiButton').click(function() {
    //   alert('Hello there');
    // });

  }

  // Then this is our sendLike
  sendLike(id: number) {
    this.userservice.sendLike(this.authservice.decodedToken.nameid, id).subscribe ( data => {
      this.alertify.success('Master you loved...' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }



}
