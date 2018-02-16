import { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';

@Pipe({
    name: 'shortenChat'
})
export class ShortenChatPipe implements PipeTransform {
    transform(value, any) {
        return value.substr(0, 10) + '...';
    }
}
