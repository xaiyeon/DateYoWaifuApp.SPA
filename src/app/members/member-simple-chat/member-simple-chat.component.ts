import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/Message';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { error } from 'util';

import * as _ from 'underscore';

@Component({
  selector: 'app-member-simple-chat',
  templateUrl: './member-simple-chat.component.html',
  styleUrls: ['./member-simple-chat.component.scss']
})

// Also known as the member messages to refer in lesson
export class MemberSimpleChatComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];

  // for sending new message
  newMessage: any = {};

  constructor(private userservice: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authservice: AuthService) { }

  ngOnInit() {
    this.loadMessages();
  }

  sendMessage() {
    const curuserId = +this.authservice.decodedToken.nameid;
    this.newMessage.recipientId = this.userId;
    this.userservice.sendUserMessage(this.authservice.decodedToken.nameid , this.newMessage)
    .subscribe( message => {
      // moves our message
      // an error in unshift traces back to our user service .ts
      this.messages.unshift(message);
      this.newMessage.content = '';

    }, error => {
      this.alertify.error(error);
    });
  }

  // loads our messages, we also mark as read in this method
  loadMessages() {
    const curuserId = +this.authservice.decodedToken.nameid; // as a string adding a + makes it a number
    this.userservice.getUserMessageThread(this.authservice.decodedToken.nameid, this.userId)
    .do(messages => {
      _.each(messages, (message: Message) => {
        // the iterator function
        if (message.isRead === false && message.recipientId === curuserId) {
          this.userservice.markReadUserMessage(curuserId, message.id); // mark it as read
        }
      });
    })
    .subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertify.error(error);
    });
  }

}
