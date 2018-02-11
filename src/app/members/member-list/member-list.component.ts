import { Component, OnInit } from "@angular/core";
import { UserService } from "../../_services/user.service";
import { AlertifyService } from "../../_services/alertify.service";
import { error } from "selenium-webdriver";
import { User } from "../../_models/User";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginatedResult } from "../../_models/pagination";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  // For filtering
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'male', display: 'Males'}, { value: 'female', display: 'Females'}];
  userParams: any = {};


  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  // Changed for pagination now
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      // pagination
      this.pagination = data['users'].pagination;
    });

    //this.loadUsers();
    // pagination
    // Edit this, same as API
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 999999;
    this.userParams.orderBy = 'lastActive';

  }
  
  // This will be used for our API
  pageChanged(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  // Might need to fix...
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe((
      res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      }
    );
  }
  
  // resets to default
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 999999;
    this.loadUsers();
  }




}
