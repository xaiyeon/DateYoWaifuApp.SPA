import { Component, OnInit } from '@angular/core';
import { Message } from '../../_models/Message';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { error } from 'util';

import * as _ from 'underscore';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';


  constructor(private userservice: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authservice: AuthService

  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });

  }

  // loads our messages
  loadMessages() {
    this.userservice
      .getUserMessages(this.authservice.decodedToken.nameid, this.pagination.currentPage,
        this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      },
        error => {
          this.alertify.error(error);
        }
      );
  }

  // delete
  deleteUserMessage(id: number) {
    this.alertify.confirm('Master... Really delete this lovely message?', () => {
      this.userservice.deleteUserMessage(id, this.authservice.decodedToken.nameid).subscribe(() => {
        this.messages.splice(_.findIndex(this.messages, {id: id}), 1);
        this.alertify.success('I deleted it, Master.');
      }, error => {
        this.alertify.error('I could not delete it master!');
      });
    });
  }

  pageChanged(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }



}
