import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {
  // Meaning it's ANYTHING
  values: any;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getValues();
  }

  // observables are better because they give data over time
  getValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
      this.values = response.json();
    } );
  }

}
