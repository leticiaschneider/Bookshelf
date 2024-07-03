import { Pipe, PipeTransform } from '@angular/core';
import { StatusReading } from '../model/book.model';

@Pipe({
  name: 'statusReading'
})
export class StatusReadingPipe implements PipeTransform {

  private statusReadingMap: any = {
    [StatusReading.Read]: 'Read',
    [StatusReading.Reading]: 'Reading',
    [StatusReading.WantToRead]: 'Want to Read'
  };

  transform(value: string): string {
    return this.statusReadingMap[value] || value;
  }
}