import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  theTime: Date;
  today = new Date();
  theyear: string;

  constructor() { }

  ngOnInit() {
    this.theyear = this.today.getFullYear().toString();
  }

}
