import { Component, OnInit, Input, Output } from '@angular/core';
import { Photo } from '../../_models/Photo';

import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';

import * as _ from 'underscore';
import { EventEmitter } from '@angular/core';
import { error } from 'selenium-webdriver';

// This is where we handle our user uploads for photos

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  // public hasAnotherDropZoneOver:boolean = false;

  currentMain: Photo;
  baseUrl = environment.apiUrl;

  @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(private authservice: AuthService, private alertify: AlertifyService,
    private userservice: UserService) { }

  ngOnInit() {
    this.initializeUploader();

  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authservice.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 3024 * 3024
    });

    // after we complete
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          title: res.title,
          description: res.description,
          dateUploaded: res.dateUploaded,
          lastEdited: res.lastEdited,
          isMain: res.isMain,
          isCover: res.isCover
        };
        this.photos.push(photo);
        // From database we get true
        if (photo.isMain) {
          this.authservice.changeMemberPhoto(photo.url);
          this.authservice.currentUser.profileImageURL = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authservice.currentUser));
        }
      }
    };

  }

  setMainPhoto(photo: Photo) {
    this.userservice.setMainPhoto(this.authservice.decodedToken.nameid, photo.id).subscribe(() => {
        this.alertify.success('Your new profile picture is set Master!');
        this.currentMain = _.findWhere(this.photos, {isMain: true});
        this.currentMain.isMain = false;
        photo.isMain = true;
        // this effect parent
        //this.getMemberPhotoChange.emit(photo.url);
        // New from lecture 116
        this.authservice.changeMemberPhoto(photo.url);
        this.authservice.currentUser.profileImageURL = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authservice.currentUser));
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  // Delete
  deletePhoto(id: number) {
    this.alertify.confirm('Why? Master you look great in this photo... Delete?', () => {
      this.userservice.deletePhoto(this.authservice.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(_.findIndex(this.photos, {id: id}), 1);
        this.alertify.success('Master, I deleted it.');
      }, error => {
        this.alertify.error('Master... It is too hard to delete!');
      });
    });
  }


}




