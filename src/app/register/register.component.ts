import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { GlobalDataService } from '../_services/global-data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/bs-datepicker.config';

import * as _ from 'underscore';
import * as moment from 'moment';
import { User } from '../_models/User';
import { error } from 'selenium-webdriver';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  user: User;
  // Our service is used to monitor the toggling of the register component
  registerToggle: boolean;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  now: any;

  constructor(private globalDataService: GlobalDataService, private authservice: AuthService, private alertify: AlertifyService,
    private fB: FormBuilder, private router: Router
  ) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createRegistrationForm();
    // This is the current time and such.
    this.now = moment().format('L');
    console.log(this.now);
  }

  createRegistrationForm() {
    this.registerForm = this.fB.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(64)
      ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(5), Validators.maxLength(64)
      ]],
      confirmPassword: ['', Validators.required]
    }, { validator: [this.passwordMatchValidation, this.checkAgeValidation]} );
  }

  // 02/14/2018, month day year
  checkAgeValidation(fG: FormGroup) {
    // What we do is convert each number into days and divide by 365 to get years.
    if ( fG.get('dateOfBirth').value != null ) {
      const userDob = fG.get('dateOfBirth').value.toString(); // ex: Wed Feb 07 2018 15:42:06 GMT-0800 (Pacific Standard Time)
      // console.log(userDob);
      const curDate = moment().format('L');
      const userDobSplt = userDob.split(' ', 4);
      // console.log(userDobSplt);
      // Just took the year out and compare...
      const curDateSplt = curDate.split('/', 3);
      const arrayOfcurDate = _.map(curDateSplt, Number);
      const arrayOfUserDob = _.map(userDobSplt, Number);
      const curTotalDays = (arrayOfcurDate[0] * 30) + (arrayOfcurDate[1]) + (arrayOfcurDate[2] * 365 );
      const userTotalDays = (arrayOfUserDob[0] * 30) + (arrayOfUserDob[1]) + (arrayOfUserDob[2] * 365 );
      const curAge = curTotalDays / 365;
      const userAge = userTotalDays / 365;
      // JUST THE YEAR
      const simpleUserAgeYear = userDobSplt[3];
      // console.log(curAge);
      // console.log(userAge);
      if ( (curAge - simpleUserAgeYear) < 15 ) {
        return {'tooyoung' : true};
      } else {
        return null;
      }
    } else {
      return null;
    }


  }

  passwordMatchValidation(fG: FormGroup) {
    return fG.get('password').value === fG.get('confirmPassword').value ? null : {'mismatch' : true};
  }


  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      //console.log(this.user);
      this.authservice.register(this.user).subscribe( () => {
        this.alertify.success('Master! I am in your care!');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authservice.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

    // this.authservice.register(this.model).subscribe(() => {
    //   this.alertify.success('M-ma-Master! Welcome, please be kind to me...');
    // }, error => {
    //   this.alertify.error(error);
    // });
  }

  cancel() {
    this.registerToggle = false;
    this.globalDataService.changeRegisterMode(this.registerToggle);
    // this.cancelRegister.emit(false);
    this.alertify.message('Ah... Master... Did you register?');
  }

}
