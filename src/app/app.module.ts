import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

// Angular Material Bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavbarComponent } from './navbar/navbar.component';

// My custom services
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { GlobalDataService } from './_services/global-data.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { appRoutes } from './routes/routes';
import { WaifusComponent } from './waifus/waifus.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { WaifuListComponent } from './waifus/waifu-list/waifu-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { TabsModule } from 'ngx-bootstrap';
import { MemberDetailsResolver } from './_resolvers/member-details.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { ShortenPipe } from './pipes/shorten.pipe';
import { FooterComponent } from './footer/footer.component';
import { PreventUnsavedProfileChanges } from './_guards/prevent-unsaved-profile-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload/file-upload/file-upload.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker/bs-datepicker.module';

import {TimeAgoPipe} from 'time-ago-pipe';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons/buttons.module';
import { MemberLikeListResolver } from './_resolvers/member-like-list.resolver';
import { MemberLikeListComponent } from './members/member-like-list/member-like-list.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { MemberMessagesResolver } from './_resolvers/member-messages.resolver';
import { MemberSimpleChatComponent } from './members/member-simple-chat/member-simple-chat.component';
import { ShortenChatPipe } from './pipes/shorten-chatname.pipe';
import { ShortenGlobalPipe } from './pipes/shorten-global.pipe';

// jtw2
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
// import { AuthHttp, AuthConfig } from 'angular2-jwt';

// To fetch data with our API we need the HTTP Module!

@NgModule({
  declarations: [
    AppComponent,
    ValueComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberLikeListComponent,
    MemberMessagesComponent,
    WaifusComponent,
    WaifuListComponent,
    MemberCardComponent,
    CapitalizePipe,
    ShortenPipe,
    MemberDetailsComponent,
    MemberEditComponent,
    FooterComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberSimpleChatComponent,
    ShortenChatPipe,
    ShortenGlobalPipe
],
  imports: [
    BrowserModule, HttpModule, RouterModule.forRoot(appRoutes), FormsModule,
    MDBBootstrapModule.forRoot(),
    TabsModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        whitelistedDomains: ['localhost:5000']
      }
    })

  ],
  providers: [
    AuthService,
    AlertifyService,
    GlobalDataService,
    AuthGuard,
    UserService,
    MemberDetailsResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedProfileChanges,
    MemberLikeListResolver,
    MemberMessagesResolver,
    ErrorInterceptorProvider


  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
