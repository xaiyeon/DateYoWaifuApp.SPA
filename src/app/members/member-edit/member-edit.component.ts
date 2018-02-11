import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user: User;
  // To get form
  @ViewChild('editForm') editForm: NgForm;
  photoUrl: string;


  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userservice: UserService,
              private authservice: AuthService ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    // Photo url in edit defualt
    this.authservice.curPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }


  updateUserProfile() {
    // console.log(this.user);
    this.userservice.updateUser(this.authservice.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Master! I have updated your profile :)');
      this.editForm.reset(this.user);
    }, error => {
        this.alertify.error(error);
    }  );

  }

  updateMainPhoto(photoUrl) {
    this.user.profileImageURL = photoUrl;
  }

  ResetForm() {
    this.alertify.message('It is reset Master!');
    this.editForm.resetForm();
  }


}
