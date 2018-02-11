import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalDataService } from '../_services/global-data.service';

// import wikipedia from 'node-wikipedia';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Our service is used to monitor the toggling of the register component
  registerToggle: boolean = false;


  constructor(private http: Http, private globalDataService: GlobalDataService) { }

  ngOnInit() {
    // For our register toggle
    this.globalDataService.currentRegisterMode.subscribe(registerToggle => this.registerToggle = registerToggle);


    // wikipedia.page.data('Clifford_Brown', { content: true }, function(response) {
    //   // structured information on the page for Clifford Brown (wikilinks, references, categories, etc.)
    // });

  }

  // This also changes with navbar and global-data service, so if false, then true, and vice-versa
  ToggleFromNavbarToHomeCheck() {
    this.registerToggle = !this.registerToggle;
    this.globalDataService.changeRegisterMode(this.registerToggle);
  }


}
