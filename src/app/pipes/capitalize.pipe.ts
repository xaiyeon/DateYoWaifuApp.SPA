import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'capitalizeFirst'
})
export class CapitalizePipe implements PipeTransform {
    transform(value, any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }

}
