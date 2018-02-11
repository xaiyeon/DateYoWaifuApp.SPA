import { Injectable } from '@angular/core';

// This work instead of declare let as below
import * as alertify from 'alertifyjs';

// Available as a global variable
// declare let alertify: any;

@Injectable()
export class AlertifyService {

// Basically this is a wrapper for our alertify
constructor() {
    // Just make sure to execute this before initializing any dialog.
    alertify.defaults.glossary.title = 'Your DateYoWaifu servant says...';
 }


    confirm(message: string, okCallback: () => any ) {
        alertify.confirm(message, function(e) {
            if (e) {
                okCallback();
            } else {

            }
        } ) ;
    }

    success(message: string) {
        // alertify.alert('Master! YOU did it!', 'uMu!');
        alertify.success(message);
    }

    error(message: string) {
        alertify.error(message);
    }

    warning(message: string) {
        alertify.warning(message);
    }

    message(message: string) {
        alertify.message(message);
    }

}
