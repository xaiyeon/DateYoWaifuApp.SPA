import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'shortenGlobal'
})
export class ShortenGlobalPipe implements PipeTransform {
    transform(value, any) {
        if (value.length < 32) {
            return value;
        } else {
            return value.substr(0, 32) + '...';
        }

    }
}
