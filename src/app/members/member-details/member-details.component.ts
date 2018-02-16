import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import * as alertify from 'alertifyjs';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'util';
import { NgxGalleryAnimation } from 'ngx-gallery';
import { NgxGalleryImage } from 'ngx-gallery';
import { NgxGalleryOptions } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  user: User;


  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];



  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private _router: Router, private authService: AuthService ) {}

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
    });

    // for the message tabs from Messages navlink
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;

    });

    this.galleryOptions = [ {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Fade,
      preview: false

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

  // Then this is our sendLike
  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe ( data => {
      this.alertify.success('Master you loved...' + this.user.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }


}
