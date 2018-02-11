import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-waifus',
  templateUrl: './waifus.component.html',
  styleUrls: ['./waifus.component.scss']
})
export class WaifusComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadUsers();
  }

  // Might need to fix...
  loadUsers() {
    this.userService.getUsers().subscribe((users: User[] ) => {
      this.users = users;
    }, error => {
      this.alertify.error(error);
    });
  }
}
