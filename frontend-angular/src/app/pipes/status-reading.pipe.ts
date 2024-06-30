import { Pipe, PipeTransform } from '@angular/core';
import { StatusReading } from '../model/book.model';

@Pipe({
  name: 'statusReading'
})
export class StatusReadingPipe implements PipeTransform {
  
    private statusReadingMap: any = {
    [StatusReading.Read]: 'READ',
    [StatusReading.Reading]: 'READING',
    [StatusReading.WantToRead]: 'WANTTOREAD'
  };

  transform(value: string): string {
    return this.statusReadingMap[value] || value;
  }
}