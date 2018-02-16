import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/User';

@Component({
  selector: 'app-waifu-list',
  templateUrl: './waifu-list.component.html',
  styleUrls: ['./waifu-list.component.scss']
})
export class WaifuListComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
   // this.loadUsers();
  }

  // Might need to fix...
  // loadUsers() {
  //   this.userService.getUsers().subscribe((users: User[] ) => {
  //     this.users = users;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
  
}
