import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message: string = "";
  @Input() type?: 'success' | 'warning' | 'error' | undefined;

  getMessageClass() {
    console.log(this.type);
    console.log(typeof this.type);
    console.log(this.type === 'success');
    return {
      'message-success': this.type === 'success',
      'message-warning': this.type === 'warning',
      'message-error': this.type === 'error',
    };
  }
}