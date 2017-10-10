import { Pipe, PipeTransform } from '@angular/core';

/**
 * Produce a string representation of time using minutes and seconds from a absolute seconds number.
 */
@Pipe({
    name: 'exmSec2Time',
})
export class Sec2TimePipe implements PipeTransform
{
    transform(value: number, args?: any): any
    {
        if (isNaN(value))
            throw new Error('Sec2TimePipe: input value is not a number: ' + String(value));
        const min = Math.floor(value / 60);
        const sec = value - min * 60;
        return min + 'm' + (sec > 0 ? ' ' + sec + 's' : '');
    }
}
