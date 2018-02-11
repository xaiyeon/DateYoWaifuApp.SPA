import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// This is used for variables we will be using globablly to easily pass to all components.

// Basic concenpt https://www.youtube.com/watch?v=I317BhehZKM&t=46s&list=PL1UG0wO5-1gRQ_-ZAd1gwJdYuRkejWODF&index=150

@Injectable()
export class GlobalDataService {

// registerToggleMode = false;
// It starts as false;
private registerToggleSource = new BehaviorSubject<boolean>(false);
currentRegisterMode = this.registerToggleSource.asObservable();

constructor() { }

changeRegisterMode(registerToggle: boolean) {
    this.registerToggleSource.next(registerToggle);
}

}
