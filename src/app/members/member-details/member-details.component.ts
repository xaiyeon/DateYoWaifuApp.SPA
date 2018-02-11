import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import * as alertify from 'alertifyjs';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
import { NgxGalleryAnimation } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';
import { NgxGalleryOptions } from 'ngx-gallery';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  user: User;
  router;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private _router: Router ) {
                this.router = _router;
              }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    });

    this.galleryOptions = [ {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Fade,
      preview: true

    } ];

    this.galleryImages = this.getUserImages();

  }

  // This gets images for user
  getUserImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
        description: this.user.photos[i].description
      });
    }
    return imageUrls;
  }

  // members/3 etc.
  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe((user: User) =>  {
        this.user = user;
      }, error => {
        this.alertify.error(error);
      }
      );
  }

  alertMe(): void {
    setTimeout(function(): void {
      alert("You've selected the alert tab!");
    });
  }

}
